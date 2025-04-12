import { useState, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessageToChatbotStream } from '../services/chatService';

export const useChat = () => {
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
    const cleaned = partial
      .replace(/data:/g, '')
      .split('\n\n')
      .filter((v) => v.length > 0);

    setBotMessage((p) => p + cleaned);

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

  return {
    chatLogs,
    isBotTyping,
    handleSend,
  };
};
