import React from 'react';
import ChatInput from '../components/Chat/ChatInput';
import { useChat } from '../contexts/ChatContext';
import Layout from '../components/layout/Layout';
import TalkArea from '../components/Chat/TalkArea';

const ChatPage: React.FC = () => {
  const { chatLogs, isBotTyping, handleSend, botMessage } = useChat();

  return (
    <Layout>
      {/* 전체 영역을 정확히 분할 */}
      <div className='flex flex-col w-screen h-screen'>
        {/* 메시지 영역 (스크롤 가능) */}
        <div className='flex-1 overflow-y-auto px-8 pt-6 pb-2'>
          <div className='w-full max-w-[1200px] mx-auto flex flex-col gap-4'>
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
          </div>
        </div>

        {/* 입력창 (시각적으로 띄우기 + 높이 차지) */}
        <div className='w-full px-8 pb-60 pt-4'>
          <div className='max-w-[1200px] mx-auto'>
            <ChatInput mode='chat' onSend={handleSend} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
