import { useEffect, useRef, useState } from 'react';
import Icon from '../../Icons/Icon';

interface Topic {
  id: string;
  title: string;
}

interface RecentTopicsProps {
  onSelect: (topic: string) => void;
}

const mockTopics: Topic[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `최근 질문 ${i + 1}`,
}));

export default function RecentTopics({ onSelect }: RecentTopicsProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTopics(mockTopics);
  }, []);

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
            key={topic.id}
            onClick={() => onSelect(topic.title)}
            className='flex gap-2.5 items-center text-left bg-white bg-opacity-60 border border-mono_e px-5 py-4 rounded-xl text-base text-black font-medium transition'
          >
            <Icon name='questionmessage' size={24} />
            {topic.title}
          </button>
        ))}
      </div>
    </div>
  );
}
