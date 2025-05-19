import { useState, useRef, useEffect } from 'react';
import { User } from '../../types/user';
import HeaderTabs from '../layout/HeaderTabs';

interface HeaderRightProps {
  userInfo: User;
  onLogout: () => void;
}

const HeaderRight = ({ userInfo, onLogout }: HeaderRightProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative mt-5' ref={menuRef}>
      <div
        className='flex items-center gap-3 cursor-pointer'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className='flex-col items-end gap-0.5'>
          <div className='text-right text-base font-bold'>
            {userInfo.name}님
          </div>
          <div className='flex justify-end gap-1.5'>
            <div className='text-right text-xs font-medium'>
              {userInfo.email}
            </div>
          </div>
        </div>
        <img
          className='w-12 h-12 rounded-2xl border border-gray-200'
          src={userInfo.profile_image}
          alt={`${userInfo.name}의 프로필 이미지`}
        />
      </div>

      {isMenuOpen && <HeaderTabs onLogout={onLogout} />}
    </div>
  );
};

export default HeaderRight;
