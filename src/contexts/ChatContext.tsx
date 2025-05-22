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

export interface ChatContextType {
  chatLogs: ChatMessage[];
  setChatLogs: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isBotTyping: boolean;
  handleSend: (message: ChatMessage) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const currentLogsRef = useRef<ChatMessage[]>([]);
  const messageBufferRef = useRef('');

  const { user, accessToken } = useUser();

  const flushLogs = (logs: ChatMessage[]) => {
    currentLogsRef.current = logs;
    setChatLogs(logs);
  };

  const handleSend = async ({ sender, message }: ChatMessage) => {
    if (!message.trim()) return;
    if (!accessToken || !user?.id) return;

    if (sender === 'user') {
      messageBufferRef.current = '';
      const newLogs: ChatMessage[] = [
        ...currentLogsRef.current,
        { sender: 'user', message, isUser: true },
        { sender: 'bot', message: '', isUser: false },
      ];

      flushLogs(newLogs);
      setIsBotTyping(true);

      try {
        await sendMessageStreamAndUpdate(
          { user_id: user.id, message },
          accessToken,
          (updatedBotMessage) => {
            messageBufferRef.current += updatedBotMessage;
            const logs = [...currentLogsRef.current];
            const lastIdx = logs.length - 1;
            if (logs[lastIdx]?.sender === 'bot') {
              logs[lastIdx] = {
                ...logs[lastIdx],
                message: messageBufferRef.current,
              };
              flushLogs(logs);
            }
          },
          () => {
            setIsBotTyping(false);
          }
        );
      } catch (err) {
        console.error('Stream error:', err);
        flushLogs([
          ...currentLogsRef.current,
          { sender: 'user', message, isUser: true },
          { sender: 'bot', message: '', isUser: false },
        ]);
        setIsBotTyping(false);
      }
    } else {
      flushLogs([...currentLogsRef.current, { sender: 'bot', message }]);
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
