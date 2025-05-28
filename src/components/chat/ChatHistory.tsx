import React, { useEffect, useRef } from 'react';
import {useLocation} from "react-router-dom";
import TalkArea from './TalkArea';
import BotTypingDots from './BotTypingDots.tsx';
import Icon from '../Icons/Icon';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  isUser?: boolean;
  status?: 'inputted' | 'pending' | 'error';
}

interface ChatHistoryProps {
  chatLogs: ChatMessage[];
  isTyping: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLogs, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const isMobileChat = location.pathname === '/m/chat';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, isTyping]);

  return (
    <div className='overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide'>
      {chatLogs.map((chat) => {
        const isLastBotMessage =
          chat.sender === 'bot' &&
          chat.id === chatLogs[chatLogs.length - 1]?.id;
        const showTypingDots = isTyping && isLastBotMessage && !chat.message;

        return (
          <div key={chat.id} className='flex flex-col gap-1'>
            {chat.sender === 'bot' && (
              <div className='flex items-center gap-2 mb-1'>
                <Icon name='mainlogo' size={24} />
                <p
                    className={
                      isMobileChat
                        ? 'text-sm font-bold text-blue_a'
                          : 'text-lg text-blue_a'
                    }>A.mate</p>
              </div>
            )}
            <TalkArea
              direction={chat.sender === 'user' ? 'right' : 'left'}
              status={isTyping && isLastBotMessage ? 'pending' : 'inputted'}
              message={chat.message}
            >
              {showTypingDots ? <BotTypingDots /> : null}
            </TalkArea>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;
