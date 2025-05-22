import { useEffect, useState, useRef } from 'react';
import Icon from '../Icons/Icon';
import { useNavigate } from 'react-router-dom';
import { RecentTopic } from '../../types/chat';
import { fetchRecentTopics } from '../../services/recentTopicService';
import { useUser } from '../../contexts/UserContext';
import HeaderTabs from '../layout/HeaderTabs';

const SubHeader = () => {
  const navigate = useNavigate();
  const { accessToken, user, logout } = useUser();
  const [recentTopic, setRecentTopic] = useState<RecentTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accessToken) return;
    const fetch = async () => {
      try {
        const topics = await fetchRecentTopics(accessToken);
        setRecentTopic(topics[0] || null);
      } catch (e) {
        console.error('최근 주제 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [accessToken]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayText = loading
    ? '로딩 중...'
    : recentTopic?.question || '최근 대화 없음';

  return (
    <div className='flex flex-grow items-start justify-between mt-[60px] mb-2'>
      <div className='relative w-full flex justify-between items-center'>
        <div className='flex justify-start items-center gap-3'>
          <div className='w-12 h-12 relative flex justify-center items-center'>
            <div className='w-12 h-12 absolute bg-white rounded-2xl border border-gray-200' />
            <div className='relative z-10'>
              <Icon
                name='leftarrowicon_gray'
                onClick={() => navigate('/home')}
              />
            </div>
          </div>
        </div>

        <div className='rounded-xl flex justify-start items-center gap-4'>
          <div className='text-stone-500 text-base font-bold'>
            지금 대화중인 주제
          </div>
          <div className='text-black text-base font-bold'>{displayText}</div>
        </div>

        <div className='relative' ref={menuRef}>
          <img
            className='w-12 h-12 rounded-2xl border border-gray-200 cursor-pointer'
            src={user?.profile_image || 'https://placehold.co/48x48'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            alt='Profile'
          />
          {isMenuOpen && <HeaderTabs onLogout={() => logout(navigate)} />}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
