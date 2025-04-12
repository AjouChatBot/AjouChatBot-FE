import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessageToChatbotStream } from '../services/chatService';

export interface ChatContextType {
  chatLogs: ChatMessage[];
  isBotTyping: boolean;
  handleSend: (message: string) => Promise<void>;
  botMessage: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botMessage, setBotMessage] = useState<string>('');

  const onMessageStreamReceived = ({
    chunk: partial,
    done,
  }: {
    chunk: string;
    done: boolean;
  }) => {
    try {
      if (partial.trim()) {
        const response = JSON.parse(partial);
        if (response.data && response.data.bot_response) {
          setBotMessage((p) => p + response.data.bot_response);
        }
      }
    } catch (e) {
      console.error('Failed to parse response:', e);
    }

    if (done) {
      setIsBotTyping(false);
      setBotMessage('');
      return;
    }
  };

  useEffect(() => {
    if (!isBotTyping) return;

    setChatLogs((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;

      if (updated[lastIdx]?.sender === 'bot') {
        updated[lastIdx] = {
          sender: 'bot',
          message: botMessage,
          isUser: false,
        };
      }

      return updated;
    });
  }, [isBotTyping, botMessage]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setChatLogs((prev) => [
      ...prev,
      { sender: 'user', message, isUser: true },
      { sender: 'bot', message: '', isUser: false },
    ]);

    setIsBotTyping(true);

    try {
      await sendMessageToChatbotStream(
        {
          user_id: 1234,
          message,
        },
        onMessageStreamReceived
      );
    } catch (err) {
      console.error('Stream error:', err);
      setChatLogs((prev) => [
        ...prev,
        { sender: 'bot', message: 'Error occurred', isUser: false },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ chatLogs, isBotTyping, handleSend, botMessage }}
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
