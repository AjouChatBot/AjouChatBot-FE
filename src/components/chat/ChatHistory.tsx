import React, { useEffect, useRef } from 'react';
import TalkArea from '../../components/Chat/TalkArea';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

interface ChatHistoryProps {
  chatLogs: ChatMessage[];
  isTyping: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLogs, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, isTyping]);

  return (
    <div className='flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide'>
      {chatLogs.map((chat, index) => (
        <TalkArea
          key={index}
          direction={chat.sender === 'user' ? 'right' : 'left'}
          status='inputted'
          message={chat.message}
        />
      ))}

      {isTyping && <TalkArea direction='left' status='pending' message='' />}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;
