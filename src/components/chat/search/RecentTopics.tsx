import { useEffect, useRef, useState } from 'react';
import Icon from '../../Icons/Icon';
import { useUser } from '../../../contexts/UserContext';
import { fetchRecentTopics } from '../../../services/recentTopicService';
import { RecentTopic } from '../../../types/chat';

interface RecentTopicsProps {
  onSelect: (topic: string) => void;
}

export default function RecentTopics({ onSelect }: RecentTopicsProps) {
  const [topics, setTopics] = useState<RecentTopic[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { accessToken } = useUser();

  useEffect(() => {
    const loadTopics = async () => {
      if (!accessToken) return;
      try {
        const data = await fetchRecentTopics(accessToken);
        setTopics(data);
      } catch (e) {
        console.error('최근 주제 목록 불러오기 실패:', e);
      }
    };
    loadTopics();
  }, [accessToken]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [topics]);

  if (topics.length === 0) return null;

  return (
    <div>
      <p className='opacity-30 text-black text-base mb-4 font-bold'>
        최근 주제
      </p>
      <div
        ref={scrollRef}
        className='h-[123px] overflow-y-auto flex flex-col gap-2 no-scrollbar '
      >
        {topics.map((topic) => (
          <button
            key={topic.question_id}
            onClick={() => onSelect(topic.question)}
            className='flex gap-2.5 items-center text-left bg-white bg-opacity-60 border border-mono_e px-5 py-4 rounded-xl text-base text-black font-medium transition'
          >
            <Icon name='questionmessage' size={24} />
            {topic.question}
          </button>
        ))}
      </div>
    </div>
  );
}
