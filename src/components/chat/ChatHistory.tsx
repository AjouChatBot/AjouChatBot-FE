import React, { useEffect, useRef } from 'react';
import TalkArea from './TalkArea';
import TypingDots from "./TypingDots.tsx";

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

interface ChatHistoryProps {
  chatLogs: ChatMessage[];
  isTyping: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chatLogs,
  isTyping,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chatLogs, isTyping]);

  useEffect(() => {
    console.log('[ChatHistory] chatLogs =', chatLogs);
  }, [chatLogs]);


  return (
      <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide">
        {chatLogs.map((chat, index) => (
            <TalkArea
                key={index}
                direction={chat.sender === 'user' ? 'right' : 'left'}
                status="inputted"
            >
              {isTyping && chat.sender === 'bot' && index === chatLogs.length - 1 && !chat.message
                  ? <TypingDots />
                  : chat.message}
            </TalkArea>
        ))}


        <div ref={bottomRef}/>
      </div>

  );

}
  export default ChatHistory;
