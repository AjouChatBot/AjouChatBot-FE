import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInput from '../components/Chat/ChatInput';
import { getAccountInfo } from '../services/accountService';
import { AccountInfo } from '../types/account';
import Layout from '../components/layout/Layout';
import { useChat } from '../contexts/ChatContext';

const Home = () => {
  const [userInfo, setUserInfo] = useState<AccountInfo | null>(null);
  const navigate = useNavigate();
  const { handleSend } = useChat();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await getAccountInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    loadUserInfo();
  }, []);

  const handleMessageSend = (message: string) => {
    handleSend(message);
    navigate('/chat');
  };

  return (
    <Layout>
      <div className='flex-grow flex justify-center'>
        <div className='w-full'>
          <ChatInput
            mode='home'
            onSend={handleMessageSend}
            userInfo={userInfo}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
