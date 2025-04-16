import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
// import Tag from '../Tag';
import Icon from '../../components/Icons/Icon';
import Options from '../../components/Input/Options';
import RecentTopics from '../Chat/Search/RecentTopics';
import MonthDateSelector from '../Selector/MonthDateSelector';
import { AccountInfo } from '../../types/account';

interface ChatInputProps {
  mode: 'home' | 'chat';
  onSend: (message: string) => void;
  userInfo?: AccountInfo | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ mode, onSend, userInfo }) => {
  const [message, setMessage] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [searchMode, setSearchMode] = useState<
    'none' | 'keyword' | 'date' | 'both'
  >('none');

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.classList.add('w-full');
  }, []);

  const [toggleStates, setToggleStates] = useState({
    question: true,
    academicInfo: false,
    responseLog: true,
  });

  useEffect(() => {
    setActiveCount(Object.values(toggleStates).filter(Boolean).length);
  }, [toggleStates]);

  const onToggleChange = (key: 'question' | 'academicInfo' | 'responseLog') => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    onSend(message); // ChatPage로 메시지 보내기
    setMessage('');
  };

  const toggleSearchMode = (mode: 'keyword' | 'date') => {
    setSearchMode((prev) => {
      if (prev === 'both') return mode === 'keyword' ? 'date' : 'keyword';
      if (prev === mode) return 'none';
      if (
        (prev === 'keyword' && mode === 'date') ||
        (prev === 'date' && mode === 'keyword')
      )
        return 'both';
      return mode;
    });
  };

  const isKeywordActive = searchMode === 'keyword' || searchMode === 'both';
  const isDateActive = searchMode === 'date' || searchMode === 'both';
  const isTextareaVisible =
    (mode === 'home' && !isDateActive) ||
    (mode === 'chat' &&
      (searchMode === 'none' ||
        searchMode === 'keyword' ||
        searchMode === 'both'));

  return (
    <div className='w-full max-w-[1030px] flex flex-col relative justify-center items-center'>
      {mode === 'home' && searchMode !== 'keyword' && searchMode !== 'both' && (
        <div className='w-full flex flex-grow gap-40 justify-between'>
          <img src='/CheetoImage.png' alt='cheeto icon' className='w-[220px]' />
          <div className='flex flex-col items-end justify-center text-2xl font-bold'>
            <h3>{userInfo?.name || '사용자'}님, 돌아오신 걸 환영해요!</h3>
            <h3>궁금하신 내용이 있나요?</h3>
          </div>
        </div>
      )}

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

      <div className='w-full flex gap-6'>
        {/* 왼쪽: RecentTopics + textarea */}
        {(isKeywordActive || isTextareaVisible) && (
          <div className='w-full min-h-[166px] flex flex-col justify-between'>
            {isKeywordActive && (
              <div className='w-full mb-4'>
                <RecentTopics onSelect={(topic) => setMessage(topic)} />
              </div>
            )}
            {isTextareaVisible && (
              <div className='w-full p-4 bg-white rounded-2xl border border-mono_e h-full flex flex-col justify-between'>
                <textarea
                  className='w-full min-h-[118px] h-full p-3 text-sm border-none outline-none resize-none bg-transparent'
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
                  {/* <div className='flex gap-2'>
                    <Tag key='1' tagtext='#학기' />
                    <Tag key='2' tagtext='#개강' />
                  </div> */}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 오른쪽: 날짜 검색 */}
        {isDateActive && (
          <div className='w-full'>
            <MonthDateSelector />
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      <div className='w-full flex justify-between items-center mt-4'>
        <div className='flex justify-start gap-4'>
          <div
            className='cursor-pointer flex justify-center items-center'
            onClick={() => setIsOptionsOpen((prev) => !prev)}
          >
            <Icon name='options_blue' size={28} />
          </div>
          <p className='text-blue_a font-medium text-base'>
            {activeCount}개 활성화됨
          </p>
        </div>
        <div className='flex gap-4 justify-end items-center'>
          <div
            onClick={() => toggleSearchMode('keyword')}
            className={`cursor-pointer flex justify-center items-center bg-white rounded-xl px-4 py-3 transition ${
              isKeywordActive ? 'border border-blue_c' : 'border border-mono_e'
            }`}
          >
            <Icon
              name={
                isKeywordActive
                  ? 'inputsearchicon_blue'
                  : 'inputsearchicon_gray'
              }
            />
          </div>

          {mode !== 'home' && (
            <div
              onClick={() => toggleSearchMode('date')}
              className={`cursor-pointer flex justify-center items-center bg-white rounded-xl px-4 py-3 transition ${
                isDateActive ? 'border border-blue_c' : 'border border-mono_e'
              }`}
            >
              <Icon
                name={isDateActive ? 'calendaricon_blue' : 'calendaricon_gray'}
              />
            </div>
          )}

          <Button color='blue' text='물어보기' onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
