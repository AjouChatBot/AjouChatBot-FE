import React from 'react';
import ChatInput from '../components/Chat/ChatInput';
import { useChat } from '../contexts/ChatContext';
import Layout from '../components/layout/Layout';
import TalkArea from '../components/Chat/TalkArea';

const ChatPage: React.FC = () => {
  const { chatLogs, isBotTyping, handleSend, botMessage } = useChat();

  return (
    <Layout>
      <div className='relative w-full h-screen flex flex-col'>
        <div className='flex-1 overflow-y-auto pb-[180px] px-4 pt-4'>
          <div className='w-full flex flex-col justify-between gap-4 px-[450px]'>
            {chatLogs.map((log, index) => (
              <div
                key={index}
                className={`flex ${
                  log.isUser ? 'justify-end' : 'justify-start'
                }`}
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
          </div>
        </div>
        <div className='w-full flex justify-center items-center fixed bottom-10 z-50'>
          <ChatInput mode='chat' onSend={handleSend} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
