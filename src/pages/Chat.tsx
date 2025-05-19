import React, { useEffect, useRef } from 'react';
import ChatInput from '../components/chat/ChatInput';
import { useChat } from '../contexts/ChatContext';
import Layout from '../components/layout/Layout';
import TalkArea from '../components/chat/TalkArea';

const ChatPage: React.FC = () => {
  const { chatLogs, isBotTyping, handleSend, botMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, isBotTyping]);

  return (
    <Layout>
      <div className='flex flex-col w-full min-h-[calc(100vh-80px)]'>
        <div className='absolute top-0 bottom-[400px] left-0 right-0 overflow-y-auto px-8 pt-6 pb-4 scrollbar-hide'>
          <div className='w-full max-w-[800px] mx-auto flex flex-col gap-4'>
            {chatLogs.map((log, index) => (
              <div
                key={index}
                className={`flex ${log.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <TalkArea
                  message={log.message}
                  direction={log.isUser ? 'right' : 'left'}
                  status={log.status}
                />
              </div>
            ))}
            {isBotTyping && (
              <div className='flex justify-start'>
                <TalkArea
                  message={botMessage}
                  direction='left'
                  status='pending'
                />
              </div>
            )}
            <div ref={bottomRef} className='h-[30px]' />
          </div>
        </div>
        <div className='absolute bottom-20 left-0 right-0 px-8 py-4 justify-center'>
          <div className='max-w-[800px] mx-auto justify-center'>
            <ChatInput mode='chat' onSend={handleSend} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
