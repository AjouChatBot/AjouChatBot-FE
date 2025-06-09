import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import { ChatMessage } from '../types/chat';
import { useUser } from './UserContext';
import { sendMessageStreamAndUpdate } from '../services/chatService';
import { v4 as uuidv4 } from 'uuid';

export interface ChatContextType {
  chatLogs: ChatMessage[];
  setChatLogs: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isBotTyping: boolean;
  handleSend: (message: {
    sender: 'user' | 'bot';
    message: string;
    isNewTopic?: boolean;
  }) => Promise<void>;
  clearChat: () => void;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  isNewTopic: boolean;
  setIsNewTopic: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isNewTopic, setIsNewTopic] = useState(false);
  const currentLogsRef = useRef<ChatMessage[]>([]);
  const keywordsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { user, accessToken } = useUser();

  const flushLogs = (logs: ChatMessage[]) => {
    currentLogsRef.current = logs;
    setChatLogs(logs);
  };

  const fetchKeywords = async (message: string) => {
    if (!accessToken) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/chatbot/keyword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (data.keywords) {
        setKeywords((prev) => [...new Set([...prev, ...data.keywords])]);
      }
    } catch (err) {
      console.error('Failed to fetch keywords:', err);
    }
  };

  const startKeywordCollection = (message: string) => {
    // Clear any existing interval
    if (keywordsIntervalRef.current) {
      clearInterval(keywordsIntervalRef.current);
    }

    // Clear existing keywords
    setKeywords([]);

    // Start new interval
    keywordsIntervalRef.current = setInterval(() => {
      fetchKeywords(message);
    }, 3000); // Fetch keywords every 3 seconds
  };

  const stopKeywordCollection = () => {
    if (keywordsIntervalRef.current) {
      clearInterval(keywordsIntervalRef.current);
      keywordsIntervalRef.current = null;
    }
  };

  const handleSend = async ({
    sender,
    message,
    isNewTopic: newTopic = false,
  }: {
    sender: 'user' | 'bot';
    message: string;
    isNewTopic?: boolean;
  }) => {
    if (!message.trim()) return;
    if (!accessToken || !user?.id) return;

    if (sender === 'user') {
      const userMessageId = uuidv4();
      const botMessageId = uuidv4();

      const newLogs: ChatMessage[] = [
        ...currentLogsRef.current,
        {
          id: userMessageId,
          sender: 'user',
          message,
          isUser: true,
          status: 'inputted',
        },
        {
          id: botMessageId,
          sender: 'bot',
          message: '',
          isUser: false,
          status: 'pending',
        },
      ];

      flushLogs(newLogs);
      setIsBotTyping(true);

      // Start collecting keywords
      startKeywordCollection(message);

      try {
        await sendMessageStreamAndUpdate(
          {
            user_id: user.id,
            message,
            is_new_topic: newTopic || isNewTopic,
            keywords: keywords,
          },
          accessToken,
          (updatedBotMessage) => {
            const logs = [...currentLogsRef.current];
            const botMessageIndex = logs.findIndex(
              (log) => log.id === botMessageId
            );

            if (botMessageIndex !== -1) {
              logs[botMessageIndex] = {
                ...logs[botMessageIndex],
                message: updatedBotMessage,
              };
              flushLogs(logs);
            }
          },
          () => {
            flushLogs(
              currentLogsRef.current.map((log) =>
                log.id === botMessageId && log.status === 'pending'
                  ? { ...log, status: 'inputted' }
                  : log
              )
            );
            setIsBotTyping(false);
            // Stop collecting keywords after response
            stopKeywordCollection();
            // Clear keywords for next message
            setKeywords([]);
          }
        );
      } catch (err) {
        console.error('Stream error:', err);
        flushLogs(
          currentLogsRef.current.map((log) =>
            log.id === botMessageId && log.status === 'pending'
              ? { ...log, message: '오류가 발생했습니다.', status: 'error' }
              : log
          )
        );
        setIsBotTyping(false);
        stopKeywordCollection();
        setKeywords([]);
      }
    }
  };

  const clearChat = () => {
    setChatLogs([]);
    currentLogsRef.current = [];
    setKeywords([]);
    stopKeywordCollection();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (keywordsIntervalRef.current) {
        clearInterval(keywordsIntervalRef.current);
      }
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chatLogs,
        setChatLogs,
        isBotTyping,
        handleSend,
        clearChat,
        keywords,
        setKeywords,
        isNewTopic,
        setIsNewTopic,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
