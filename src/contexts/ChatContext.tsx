import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
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
  }) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const currentLogsRef = useRef<ChatMessage[]>([]);

  const { user, accessToken } = useUser();

  const flushLogs = (logs: ChatMessage[]) => {
    currentLogsRef.current = logs;
    setChatLogs(logs);
  };

  const handleSend = async ({
    sender,
    message,
  }: {
    sender: 'user' | 'bot';
    message: string;
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

      try {
        await sendMessageStreamAndUpdate(
          { user_id: user.id, message },
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
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{ chatLogs, setChatLogs, isBotTyping, handleSend }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
