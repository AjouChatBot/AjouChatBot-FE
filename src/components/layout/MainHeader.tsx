import React from 'react';
import HeaderLeft from '../mainheader/HeaderLeft';
import HeaderRight from '../mainheader/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-start justify-between px-6'>
      <HeaderLeft />
      <HeaderRight userInfo={user} onLogout={handleLogout} />
    </div>
  );
};

export default MainHeader;
