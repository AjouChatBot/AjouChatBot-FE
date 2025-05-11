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
  const isLoginPage = pathname === '/login';
  const isSettingPage = pathname.startsWith('/setting');

  const isMainHeaderPage =
    pathname === '/home' ||
    pathname === '/setting/account' ||
    pathname === '/setting/academic' ||
    pathname === '/setting/chat';

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

  const backgroundImageUrl = isLoginPage
    ? '/loginbackground.svg'
    : isSettingPage
      ? '/settingbackground.svg'
      : '/background.svg';

  return (
    <div
      className='w-screen h-screen flex flex-col px-6'
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!isLoginPage &&
        (isMainHeaderPage ? <MainHeader userInfo={userInfo} /> : <SubHeader />)}
      <main className='flex-grow'>{children}</main>
    </div>
  );
};

export default Layout;
