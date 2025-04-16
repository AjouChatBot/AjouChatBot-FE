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
  const pathname = location.pathname;
  const isHomePage = pathname === '/home';
  const isLoginPage = pathname === '/login';
  const [userInfo, setUserInfo] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (!isLoginPage) {
      const loadUserInfo = async () => {
        try {
          const response = await getAccountInfo();
          setUserInfo(response.data);
        } catch (error) {
          console.error('Failed to load user info:', error);
        }
      };

      loadUserInfo();
    }
  }, [isLoginPage]);

  return (
    <div
      className='min-h-screen flex flex-col px-6'
      style={{
        backgroundImage: 'url("/background.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* /login 페이지가 아니면 헤더 표시 */}
      {!isLoginPage &&
        (isHomePage ? <MainHeader userInfo={userInfo} /> : <SubHeader />)}
      <main className='flex-grow'>{children}</main>
    </div>
  );
};

export default Layout;
