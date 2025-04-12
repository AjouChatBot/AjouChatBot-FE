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

  return (
    <div
      className='min-h-screen flex flex-col px-6'
      style={{
        backgroundImage: 'url("/background.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {isHomePage ? <MainHeader userInfo={userInfo} /> : <SubHeader />}
      <main className='flex-grow'>{children}</main>
    </div>
  );
};

export default Layout;
