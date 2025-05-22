import { useRef, useState } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessageStreamWithAuth } from '../services/chatService';
import { useUser } from '../contexts/UserContext';

export const useChat = () => {
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const { user } = useUser();

  const currentLogsRef = useRef<ChatMessage[]>([]);

  const flushLogs = (logs: ChatMessage[]) => {
    currentLogsRef.current = logs;
    setChatLogs(logs);
  };

  const onMessageStreamReceived = ({
                                     chunk,
                                     done,
                                   }: {
    chunk: string;
    done: boolean;
  }) => {
    try {
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const content = line.slice(5).trim();
          if (!content) continue;

          const logs = [...currentLogsRef.current];
          const lastIdx = logs.length - 1;

          if (lastIdx >= 0 && logs[lastIdx].sender === 'bot') {
            logs[lastIdx] = {
              ...logs[lastIdx],
              message: logs[lastIdx].message + content,
            };
            flushLogs(logs);
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse response chunk:', e);
    }
    if (done) {
      setIsBotTyping(false);
    }
  };

  const handleSend = async (message: string) => {
    const token = localStorage.getItem('access_token');
    if (!token || !user?.id || !message.trim()) return;

    const newLogs: ChatMessage[] = [
      ...currentLogsRef.current,
      { sender: 'user', message, isUser: true },
      { sender: 'bot', message: '', isUser: false },
    ];

    flushLogs(newLogs);
    setIsBotTyping(true);

    try {
      await sendMessageStreamWithAuth(
          {
            user_id: user.id,
            message,
          },
          onMessageStreamReceived,
          token
      );
    } catch (err) {
      console.error('Stream error:', err);
      flushLogs([
        ...currentLogsRef.current,
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
