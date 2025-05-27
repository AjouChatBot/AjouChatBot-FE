import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import { ChatMessageAPIResponse } from '../types/chat';
import ChatHistory from '../components/chat/ChatHistory';
import Icon from '../components/Icons/Icon';
import { fetchConversation } from '../services/fetchConversationService.ts';
import { v4 as uuidv4 } from 'uuid';

const MobileChat = () => {
  const [message, setMessage] = useState('');
  const { conversation_id } = useParams();
  const { accessToken } = useUser();
  const { chatLogs, setChatLogs, isBotTyping, handleSend } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

  const handleSendMessage = async () => {
    if (message.trim()) {
      await handleSend({
        sender: 'user',
        message: message.trim(),
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='text-black'>
      <div
        className='w-screen min-h-screen flex flex-col px-6 py-2'
        style={{
          backgroundImage: 'url("/mobilebackground.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='flex flex-col w-full min-h-[calc(100vh-80px)]'>
          <div className='absolute top-0 bottom-[100px] left-0 right-0 overflow-y-auto px-4 pt-6 scrollbar-hide'>
            <div className='flex flex-col gap-4'>
              <ChatHistory chatLogs={chatLogs} isTyping={isBotTyping} />
              <div ref={bottomRef} className='h-[30px]' />
            </div>
          </div>
          <div className='w-full px-6 fixed bottom-[43px] left-0 right-0 flex flex-col items-center'>
            <div className='w-full px-4 py-2 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center'>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='메시지 입력'
                className={`flex-1 text-sm font-medium leading-loose outline-none ${
                  message ? 'text-mono_a' : 'text-mono_c'
                }`}
              />
              <button
                onClick={handleSendMessage}
                className={`w-7 h-7 relative flex justify-center items-center ${
                  message.trim() ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ padding: 0 }}
              >
                <div className='w-7 h-7 bg-blue_a rounded-full flex items-center justify-center'>
                  <Icon name='sendicon_white' size={16} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChat;
