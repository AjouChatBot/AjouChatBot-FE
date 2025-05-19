import { useNavigate } from 'react-router-dom';
import Icon from '../Icons/Icon';

interface HeaderTabsProps {
  onLogout: () => void;
}

const HeaderTabs = ({ onLogout }: HeaderTabsProps) => {
  const navigate = useNavigate();

  return (
    <div className='absolute right-0 top-[calc(100%+8px)] w-36 bg-white rounded-2xl outline outline-1 outline-gray-200 z-50'>
      <div
        className='flex flex-row items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50'
        onClick={() => navigate('/setting/account')}
      >
        <Icon name='setting' />
        <span className='text-base font-medium'>설정</span>
      </div>

      <div className='h-px bg-gray-200 my-1' />

      <div
        className='flex flex-row items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50'
        onClick={onLogout}
      >
        <Icon name='logout' />
        <span className='text-base font-medium text-red-600'>로그아웃</span>
      </div>
    </div>
  );
};

export default HeaderTabs;
