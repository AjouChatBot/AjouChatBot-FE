import { useNavigate } from 'react-router-dom';
import ChatInput from '../components/chat/ChatInput';
import Layout from '../components/layout/Layout';
import { useChat } from '../contexts/ChatContext';

const Home = () => {
  const navigate = useNavigate();
  const { handleSend, setChatLogs } = useChat();

  const handleMessageSend = (chat: {
    sender: 'user' | 'bot';
    message: string;
  }) => {
    setChatLogs([]);
    handleSend({ ...chat, isNewTopic: true });
    navigate('/chat');
  };

  return (
    <Layout>
      <div className='flex justify-center items-center w-full px-4'>
        <div className='flex justify-center max-w-[800px] w-full mt-[150px]'>
          <ChatInput mode='home' onSend={handleMessageSend} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
