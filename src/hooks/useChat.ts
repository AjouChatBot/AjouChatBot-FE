import { useState, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { ChatMessage } from '../types/chat';
import { sendMessageStreamAndUpdate } from '../services/chatService';
import { useUser } from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';

export const useChat = () => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { user } = useUser();

  const botMessageBuffer = useRef('');

  const handleSend = useCallback(
    async (message: string) => {
      const token = localStorage.getItem('access_token');
      if (!token || !user?.id || !message.trim()) return;

      botMessageBuffer.current = '';

      const newMessage: ChatMessage = {
        id: uuidv4(),
        sender: 'user',
        message,
        isUser: true,
        status: 'inputted',
      };

      setChatLogs((prev) => [...prev, newMessage]);
      setIsBotTyping(true);

      try {
        await sendMessageStreamAndUpdate(
          {
            user_id: user.id,
            message,
          },
          token,
          (chunk: string) => {
            botMessageBuffer.current += chunk;

            flushSync(() => {
              setChatLogs((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (lastIdx >= 0 && updated[lastIdx].sender === 'bot') {
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    message: botMessageBuffer.current,
                  };
                }
                return updated;
              });
            });
          },
          () => {
            setIsBotTyping(false);
          }
        );
      } catch (err) {
        console.error('Stream error:', err);
        const errorMessage: ChatMessage = {
          id: uuidv4(),
          sender: 'bot',
          message: 'Error occurred',
          isUser: false,
          status: 'inputted',
        };
        setChatLogs((prev) => [...prev, errorMessage]);
        setIsBotTyping(false);
      }
    },
    [user?.id]
  );

  return {
    chatLogs,
    isBotTyping,
    handleSend,
  };
};
