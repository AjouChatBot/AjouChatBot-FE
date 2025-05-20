import React, { useEffect, useRef } from 'react';
import ChatInput from '../components/chat/ChatInput';
import { useChat } from '../contexts/ChatContext';
import Layout from '../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { fetchConversation } from '../services/chatService';
import { ChatMessageAPIResponse } from '../types/chat';
import ChatHistory from '../components/chat/ChatHistory';

const ChatPage: React.FC = () => {
  const { conversation_id } = useParams();
  const { accessToken } = useUser();
  const { chatLogs, setChatLogs, isBotTyping, handleSend, botMessage } =
    useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadChat = async () => {
      if (!conversation_id || !accessToken) return;

      try {
        const res = await fetchConversation(conversation_id, accessToken);
        const messages = res.data.messages as ChatMessageAPIResponse[];

        const fetchedLogs = messages.map((msg) => ({
          sender: msg.sender,
          message: msg.message,
          isUser: msg.sender === 'user',
          status: 'inputted' as const,
        }));
        setChatLogs(fetchedLogs);
      } catch (err) {
        console.log('대화 불러오기 실패:', err);
      }
    };
    loadChat();
  }, [conversation_id, accessToken, setChatLogs]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, isBotTyping]);

  return (
    <Layout>
      <div className='flex flex-col w-full min-h-[calc(100vh-80px)]'>
        <div className='absolute top-0 bottom-[400px] left-0 right-0 overflow-y-auto px-8 pt-6 scrollbar-hide'>
          <div className='max-w-[1030px] mx-auto flex flex-col gap-4'>
            <ChatHistory
              chatLogs={chatLogs.map(({ sender, message }) => ({
                sender,
                message,
              }))}
              isTyping={isBotTyping}
              botMessage={botMessage}
            />

            <div ref={bottomRef} className='h-[30px]' />
          </div>
        </div>
        <div className='absolute bottom-20 left-0 right-0 px-8 py-4 justify-center'>
          <div className='max-w-[1030px] mx-auto justify-center'>
            <ChatInput mode='chat' onSend={handleSend} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
