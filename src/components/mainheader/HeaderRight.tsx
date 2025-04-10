import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icons/Icon';
import { AccountInfo } from '../../types/account';

interface HeaderRightProps {
  userInfo: AccountInfo;
  onLogout: () => void;
}

const HeaderRight: React.FC<HeaderRightProps> = ({ userInfo, onLogout }) => {
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
              {userInfo.department}
            </div>
            <div className='text-right text-xs font-medium'>
              {userInfo.grade}학년
            </div>
          </div>
        </div>
        <img
          className='w-12 h-12 rounded-2xl border border-gray-200'
          src='https://placehold.co/48x48'
          alt={`${userInfo.name}의 프로필 이미지`}
        />
      </div>

      {isMenuOpen && (
        <div className='absolute right-0 top-[calc(100%+8px)] p-3.5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 shadow-sm z-50'>
          <div className='px-3 py-1'>
            <div className='flex items-center gap-4'>
              <Icon name='setting' />
              <div className='text-base font-medium'>설정</div>
            </div>
          </div>
          <div className='h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200' />
          <div className='px-3 py-1 cursor-pointer' onClick={onLogout}>
            <div className='flex items-center gap-4'>
              <Icon name='logout' />
              <div className='text-red-600 text-base font-medium'>로그아웃</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderRight;
