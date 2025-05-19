import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import SubHeader from './SubHeader';

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

  const backgroundImageUrl = isLoginPage
    ? '/loginbackground.svg'
    : isSettingPage
      ? '/settingbackground.svg'
      : '/background.svg';

  return (
    <div
      className='w-screen min-h-screen flex flex-col px-6 py-2'
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!isLoginPage && (isMainHeaderPage ? <MainHeader /> : <SubHeader />)}
      <main className='flex-1 relative'>{children}</main>
    </div>
  );
};

export default Layout;
