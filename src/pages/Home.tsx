import { useNavigate } from 'react-router-dom';
import ChatInput from '../components/chat/ChatInput';
import Layout from '../components/layout/Layout';
import { useChat } from '../contexts/ChatContext';

const Home = () => {
  const navigate = useNavigate();
  const { handleSend } = useChat();

  const handleMessageSend = (message: string) => {
    handleSend(message);
    navigate('/chat');
  };

  return (
    <Layout>
      <div className='flex justify-center items-center w-full h-full px-4'>
        <div className='flex justify-center max-w-[1200px] w-full mt-[200px]'>
          <ChatInput mode='home' onSend={handleMessageSend} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
