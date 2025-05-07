import React from 'react';
import { AccountInfo } from '../../types/account';
import HeaderLeft from '../mainheader/HeaderLeft';
import HeaderRight from '../mainheader/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface MainHeaderProps {
  userInfo: AccountInfo | null;
}

const MainHeader: React.FC<MainHeaderProps> = ({ userInfo }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
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
