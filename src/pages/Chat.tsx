import React from 'react';
import ChatHistory from '../components/Chat/ChatHistory';
import ChatInput from '../components/Chat/ChatInput';
import { useChat } from '../hooks/useChat';

const ChatPage: React.FC = () => {
  const { chatLogs, isBotTyping, handleSend } = useChat();

  return (
    <div className='flex flex-col w-full h-full'>
      <ChatHistory chatLogs={chatLogs} isTyping={isBotTyping} />
      <ChatInput onSend={handleSend} mode='chat' />
    </div>
  );
};

export default ChatPage;
