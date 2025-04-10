import { useEffect, useState } from 'react';
import MainHeader from '../components/layout/MainHeader';
import ChatInput from '../components/chat/ChatInput';
import { getAccountInfo } from '../services/accountService';
import { AccountInfo } from '../types/account';

const Home = () => {
  const [userInfo, setUserInfo] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getAccountInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSend = (message: string) => {
    console.log('Message sent:', message);
    // TODO: Implement send message logic
  };

  return (
    <div
      className='min-h-screen w-full flex flex-col'
      style={{
        backgroundImage: 'url("/background.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MainHeader userInfo={userInfo} />
      <div className='flex-grow flex justify-center'>
        <div className='w-[1028px]'>
          <ChatInput mode='home' onSend={handleSend} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
