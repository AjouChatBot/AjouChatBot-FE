import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Tag from '../Tag';
import Icon from '../Icons/Icon';
import CheetoImage from './CheetoImage.png';
import Options from '../Input/Options';

type ChatInputProps = {
  mode: 'home' | 'chat';
  search: boolean;
  search_mode: 'keyword' | 'date' | 'none' | 'both';
  status: 'none' | 'selectedone' | 'selectedtwo';
};

const ChatInput: React.FC<ChatInputProps> = ({ mode, search, search_mode }) => {
  const [message, setMessage] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('w-full');
    }
  }, []);

  // ✅ 토글 상태 관리
  const [toggleStates, setToggleStates] = useState({
    question: true,
    academicInfo: false,
    responseLog: true,
  });

  useEffect(() => {
    setActiveCount(Object.values(toggleStates).filter((value) => value).length);
  }, []);

  // ✅ 토글 변경 핸들러
  const onToggleChange = (key: 'question' | 'academicInfo' | 'responseLog') => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('질문:', message);
      setMessage('');
    }
  };

  return (
    <div className='w-full flex min-w-0 flex-grow flex-col p-6 relative'>
      {mode === 'home' && (
        <div className='flex justify-between'>
          <img src={CheetoImage} alt='cheeto icon' className='w-[220px]' />
          <div className='flex flex-col items-end justify-center text-2xl font-bold'>
            <h3>ddd님, 돌아오신 걸 환영해요!</h3>
            <h3>궁금하신 내용이 있나요?</h3>
          </div>
        </div>
      )}

      {/* ✅ Options 창이 왼쪽에 붙어서 표시됨 */}
      {isOptionsOpen && (
        <div className='absolute top-16 left-6 w-64 z-50 bg-white border border-gray-300 rounded-lg shadow-lg'>
          <Options
            toggleStates={toggleStates}
            onToggleChange={onToggleChange}
            onClose={() => setIsOptionsOpen(false)}
            setActiveCount={setActiveCount}
          />
        </div>
      )}

      <div className='w-full flex flex-col'>
        <div className='w-full p-4 bg-white rounded-2xl border border-mono_e'>
          <textarea
            className='w-full h-20 p-3 text-sm border-none outline-none resize-none bg-transparent'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='검색할 주제나 내용을 알려주세요'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <div className='mt-2 flex items-center gap-3'>
            <span className='text-xs text-gray-500'>인식한 키워드</span>
            <div className='flex gap-2'>
              <Tag key='1' tagtext='#학기' />
              <Tag key='2' tagtext='#개강' />
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex justify-start gap-4'>
            {/* ✅ Options 창을 여는 버튼 (왼쪽에 붙음) */}
            <div
              className='cursor-pointer flex justify-center items-center'
              onClick={() => setIsOptionsOpen((prev) => !prev)} // ✅ 클릭하면 토글
            >
              <Icon name='options_blue' size={28} />
            </div>
            <p className='text-blue_a font-medium text-base'>
              {activeCount}개 활성화됨
            </p>
          </div>
          <div className='flex gap-4 justify-end items-center'>
            <div className='flex justify-center items-center bg-white border border-mono_e rounded-xl px-4 py-3'>
              <Icon name='inputsearchicon_gray' />
            </div>
            <Button color='blue' text='물어보기' onClick={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
