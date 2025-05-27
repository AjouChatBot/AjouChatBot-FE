import { useLocation, useNavigate } from 'react-router-dom';
import SettingTabs from './SettingTabs';

const SettingSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const selectedTab = (() => {
    if (pathname.includes('/setting/account')) return 'account';
    if (pathname.includes('/setting/academic')) return 'academic';
    if (pathname.includes('/setting/chat')) return 'chat';
    return 'account';
  })() as 'account' | 'academic' | 'chat';

  const handleTabClick = (tab: 'account' | 'academic' | 'chat') => {
    switch (tab) {
      case 'account':
        navigate('/setting/account');
        break;
      case 'academic':
        navigate('/setting/academic');
        break;
      case 'chat':
        navigate('/setting/chat');
        break;
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-bold text-3xl mb-7'>설정</p>
      <div onClick={() => handleTabClick('account')}>
        <SettingTabs
          type='account'
          color={selectedTab === 'account' ? 'blue' : 'black'}
        />
      </div>
      <div onClick={() => handleTabClick('academic')}>
        <SettingTabs
          type='academic'
          color={selectedTab === 'academic' ? 'blue' : 'black'}
        />
      </div>
      <div onClick={() => handleTabClick('chat')}>
        <SettingTabs
          type='chat'
          color={selectedTab === 'chat' ? 'blue' : 'black'}
        />
      </div>
    </div>
  );
};

export default SettingSidebar;
