import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import SubHeader from './SubHeader';
import { getAccountInfo } from '../../services/accountService';
import { AccountInfo } from '../../types/account';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
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

  return (
    <div className='min-h-screen flex flex-col px-6'>
      {isHomePage ? <MainHeader userInfo={userInfo} /> : <SubHeader />}
      <main className='flex-grow w-full max-w-screen-xl mx-auto'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
