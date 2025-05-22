import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { ChatMessage } from '../types/chat';
import { sendMessageStreamAndUpdate } from '../services/chatService';
import { useUser } from '../contexts/UserContext';

export const useChat = () => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { user } = useUser();

  const botMessageBuffer = useRef('');

  const handleSend = async (message: string) => {
    const token = localStorage.getItem('access_token');
    if (!token || !user?.id || !message.trim()) return;

    botMessageBuffer.current = '';

    setChatLogs(prev => [
      ...prev,
      { sender: 'user', message, isUser: true },
      { sender: 'bot', message: '', isUser: false },
    ]);
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
              setChatLogs(prev => {
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
      setChatLogs(prev => [
        ...prev,
        { sender: 'bot', message: 'Error occurred', isUser: false },
      ]);
      setIsBotTyping(false);
    }
  };

  return {
    chatLogs,
    isBotTyping,
    handleSend,
  };
};
