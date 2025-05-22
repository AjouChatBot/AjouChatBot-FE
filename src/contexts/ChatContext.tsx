import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessageStreamWithAuth } from '../services/chatService';
import { useUser } from './UserContext';

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

  const { user, accessToken } = useUser();

  const onMessageStreamReceived = ({
                                     chunk,
                                     done,
                                   }: {
    chunk: string;
    done: boolean;
  }) => {
    try {
      console.log('[STREAM CHUNK]', chunk, '| done:', done);

      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const content = line.slice(5);

            setChatLogs((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;

              if (updated[lastIdx]?.sender === 'bot') {
                updated[lastIdx] = {
                  ...updated[lastIdx],
                  message: updated[lastIdx].message + content,
                };
              }

              return updated;
            });

        }
      }
    } catch (e) {
      console.error('Failed to parse response chunk:', e);
    }

    if (done) {
      setIsBotTyping(false);
    }
  };

  const handleSend = async ({ sender, message }: ChatMessage) => {
    if (!message.trim()) return;

    if (sender === 'user') {
      setChatLogs((prev) => [
        ...prev,
        { sender: 'user', message },
        { sender: 'bot', message: '' },
      ]);
      setIsBotTyping(true);

      try {
        if (!accessToken || !user?.id) {
          throw new Error('Missing authentication info');
        }

        await sendMessageStreamWithAuth(
            {
              user_id: user.id,
              message,
            },
            onMessageStreamReceived,
            accessToken
        );
      } catch (err) {
        console.error('Error sending message:', err);
        setChatLogs((prev) => [
          ...prev,
          { sender: 'bot', message: '오류가 발생했습니다.' },
        ]);
        setIsBotTyping(false);
      }
    } else {
      setChatLogs((prev) => [...prev, { sender: 'bot', message }]);
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
