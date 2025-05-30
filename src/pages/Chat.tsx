import React, { useEffect, useRef } from 'react';
import ChatInput from '../components/chat/ChatInput';
import { useChat } from '../contexts/ChatContext';
import Layout from '../components/layout/Layout';
import { useParams, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ChatMessageAPIResponse } from '../types/chat';
import ChatHistory from '../components/chat/ChatHistory';
import { fetchConversation } from '../services/fetchConversationService.ts.ts';
import { v4 as uuidv4 } from 'uuid';

const ChatPage: React.FC = () => {
  const { conversation_id } = useParams();
  const { accessToken } = useUser();
  const { chatLogs, setChatLogs, isBotTyping, handleSend } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const isMobileChat = location.pathname === '/m/chat';

  useEffect(() => {
    const loadChat = async () => {
      if (!conversation_id || !accessToken) return;

      try {
        const res = await fetchConversation(conversation_id, accessToken);
        const messages = res.data.messages as ChatMessageAPIResponse[];

        const fetchedLogs = messages.map((msg) => ({
          id: uuidv4(),
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
      <div className='flex flex-col w-full h-[calc(100vh-80px)]'>
        <div className='flex-1 overflow-hidden'>
          <div className='h-[calc(100%-100px)] overflow-y-auto px-8 pt-6 pb-[300px] scrollbar-hide'>
            <div className='max-w-[1030px] mx-auto flex flex-col gap-4'>
              <ChatHistory chatLogs={chatLogs} isTyping={isBotTyping} />
              <div ref={bottomRef} className='h-[30px]' />
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 left-0 right-0 px-8 py-4'>
          <div className='max-w-[1030px] mx-auto'>
            <ChatInput mode='chat' onSend={handleSend} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
