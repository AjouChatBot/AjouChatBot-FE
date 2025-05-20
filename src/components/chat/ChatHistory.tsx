import React, { useEffect, useRef } from 'react';
import TalkArea from './TalkArea';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

interface ChatHistoryProps {
  chatLogs: ChatMessage[];
  isTyping: boolean;
  botMessage: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chatLogs,
  isTyping,
  botMessage,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, isTyping]);

  return (
    <div className='overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide'>
      {chatLogs.map((chat, index) => (
        <TalkArea
          key={index}
          direction={chat.sender === 'user' ? 'right' : 'left'}
          status='inputted'
          message={chat.message}
        />
      ))}

      {isTyping && (
        <TalkArea direction='left' status='pending' message={botMessage} />
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;
