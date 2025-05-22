import React, { useEffect, useRef } from 'react';
import TalkArea from './TalkArea';
import BotTypingDots from './BotTypingDots.tsx';

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
    <div className='overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide'>
      {chatLogs.map((chat, index) => {
        const isLastBotMessage =
          chat.sender === 'bot' && index === chatLogs.length - 1;
        const showTypingDots = isTyping && isLastBotMessage && !chat.message;

        return (
          <TalkArea
            key={index}
            direction={chat.sender === 'user' ? 'right' : 'left'}
            status={isTyping && isLastBotMessage ? 'pending' : 'inputted'}
            message={chat.message}
          >
            {showTypingDots ? <BotTypingDots /> : null}
          </TalkArea>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;
