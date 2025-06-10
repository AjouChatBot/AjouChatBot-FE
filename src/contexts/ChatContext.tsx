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
  startKeywordCollection: (message: string) => void;
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
  const keywordIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const keywordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { user, accessToken } = useUser();

  const flushLogs = (logs: ChatMessage[]) => {
    currentLogsRef.current = logs;
    setChatLogs(logs);
  };

  const fetchKeywords = async (msg: string) => {
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
          body: JSON.stringify({ message: msg }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch keywords');
      }

      const data = await response.json();
      setKeywords(data.keywords);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const startKeywordCollection = (message: string) => {
    if (keywordIntervalRef.current) {
      clearInterval(keywordIntervalRef.current);
    }
    if (keywordTimeoutRef.current) {
      clearTimeout(keywordTimeoutRef.current);
    }

    fetchKeywords(message);

    keywordIntervalRef.current = setInterval(() => {
      fetchKeywords(message);
    }, 1500);

    keywordTimeoutRef.current = setTimeout(() => {
      stopKeywordCollection();
    }, 10000);
  };

  const stopKeywordCollection = () => {
    if (keywordIntervalRef.current) {
      clearInterval(keywordIntervalRef.current);
      keywordIntervalRef.current = null;
    }
    if (keywordTimeoutRef.current) {
      clearTimeout(keywordTimeoutRef.current);
      keywordTimeoutRef.current = null;
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

      // If it's a new topic, clear previous logs
      if (newTopic) {
        currentLogsRef.current = [];
      }

      // Stop collecting keywords before sending message
      stopKeywordCollection();
      const finalKeywords = [...keywords];

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

      try {
        await sendMessageStreamAndUpdate(
          {
            user_id: user.id,
            message,
            is_new_topic: newTopic,
            keywords: finalKeywords,
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
      stopKeywordCollection();
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
        startKeywordCollection,
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
