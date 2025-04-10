import React from 'react';
import { AccountInfo } from '../../types/account';
import HeaderLeft from '../mainheader/HeaderLeft';
import HeaderRight from '../mainheader/HeaderRight';

interface MainHeaderProps {
  userInfo: AccountInfo | null;
}

const MainHeader: React.FC<MainHeaderProps> = ({ userInfo }) => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-grow items-start justify-between px-6'>
      <HeaderLeft />
      <HeaderRight userInfo={userInfo} onLogout={handleLogout} />
    </div>
  );
};

export default MainHeader;
