import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../../components/common/Button';
import Icon from '../../components/Icons/Icon';
import Options from '../../components/Input/Options';
import RecentTopics from '../chat/search/RecentTopics';
import MonthDateSelector from '../selector/MonthDateSelector';
import { useUser } from '../../contexts/UserContext';
import { useChat } from '../../contexts/ChatContext';
import TypingDots from './TypingDots';
import { updateChatSettings } from '../../services/updateChatSettingService';
import { ChatMessage } from '../../types/chat';
import { searchChatbotStreamAndUpdate } from '../../services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Tag from '../../components/common/Tag';

interface ChatInputProps {
  mode: 'home' | 'chat' | 'search';
  onSend: (message: ChatMessage) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ mode, onSend }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    clearChat,
    startKeywordCollection,
    chatLogs,
    handleSend: sendMessage,
    category,
  } = useChat();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [searchMode, setSearchMode] = useState<
    'none' | 'keyword' | 'date' | 'both'
  >('none');
  const [toggleStates, setToggleStates] = useState({
    question: false,
    academicInfo: false,
    responseLog: false,
  });

  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const isKeywordActive = searchMode === 'keyword' || searchMode === 'both';
  const isDateActive = searchMode === 'date' || searchMode === 'both';
  const isTextareaVisible =
    (mode === 'home' && !isDateActive) ||
    (mode === 'chat' && (searchMode === 'none' || isKeywordActive));

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timestamp = useRef<number>(0);

  const [input, setInput] = useState('');

  const startKeywordCollectionCallback = useCallback(
    (msg: string) => {
      startKeywordCollection(msg);
    },
    [startKeywordCollection]
  );

  useEffect(() => {
    setActiveCount(Object.values(toggleStates).filter(Boolean).length);
  }, [toggleStates]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleToggle = async (key: keyof typeof toggleStates) => {
    const updatedStates = {
      ...toggleStates,
      [key]: !toggleStates[key],
    };
    setToggleStates(updatedStates);

    if (key === 'question' && !toggleStates[key]) {
      clearChat();
    }

    try {
      await updateChatSettings({
        new_topic_question: updatedStates.question,
        include_academic_info: updatedStates.academicInfo,
        allow_response: updatedStates.responseLog,
      });
    } catch (error) {
      console.error('채팅 설정 반영 실패:', error);
    }
  };

  useEffect(() => {
    if (!input.trim()) return;

    const inputted_time = new Date().getTime();
    timestamp.current = inputted_time;

    const timer = setTimeout(() => {
      if (timestamp.current === inputted_time) {
        startKeywordCollectionCallback(input.trim());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, startKeywordCollectionCallback]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSend();
      }
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      let messageToSend: string;
      const isNewTopic =
        mode === 'home' || (toggleStates.question && chatLogs.length === 0);

      if (isDateActive && selectedStart && selectedEnd) {
        const startDate = new Date(selectedStart);
        const endDate = new Date(selectedEnd);
        const formatDate = (date: Date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        messageToSend = `[${formatDate(startDate)} ~ ${formatDate(endDate)}] ${input.trim()} 검색 결과`;
      } else {
        messageToSend = input.trim();
      }

      sendMessage({
        sender: 'user',
        message: messageToSend,
        isNewTopic,
      });
      setInput('');

      if (mode === 'home') {
        navigate('/chat');
      }

      if (isDateActive || isKeywordActive) {
        setSearchMode('none');
        setSelectedStart(null);
        setSelectedEnd(null);
      }

      if (toggleStates.question) {
        const updatedStates = {
          ...toggleStates,
          question: false,
        };
        setToggleStates(updatedStates);
        try {
          await updateChatSettings({
            new_topic_question: false,
            include_academic_info: updatedStates.academicInfo,
            allow_response: updatedStates.responseLog,
          });
        } catch (error) {
          console.error('채팅 설정 반영 실패:', error);
        }
      }

      if (mode === 'search') {
        try {
          const query = input.trim();
          const keywords = isKeywordActive
            ? extractKeywordsFromMessage(query)
            : undefined;
          const start_date =
            isDateActive && selectedStart
              ? selectedStart.toISOString().split('T')[0]
              : undefined;
          const end_date =
            isDateActive && selectedEnd
              ? selectedEnd.toISOString().split('T')[0]
              : undefined;

          const token = localStorage.getItem('access_token');
          if (!token) throw new Error('Missing access token');

          await searchChatbotStreamAndUpdate(
            {
              query: query.length > 0 ? query : undefined,
              keywords,
              start_date,
              end_date,
            },
            token,
            (msg) => {
              onSend({
                id: uuidv4(),
                sender: 'bot',
                message: msg,
                isUser: false,
                status: 'inputted',
              });
            },
            () => {
              setSearchMode('none');
              setSelectedStart(null);
              setSelectedEnd(null);
              setInput('');
            }
          );
        } catch (error) {
          console.error('검색 실패:', error);
          onSend({
            id: uuidv4(),
            sender: 'bot',
            message: '검색 중 오류가 발생했습니다.',
            isUser: false,
            status: 'inputted',
          });
        }
      }
    }
  };

  const toggleSearchMode = (targetMode: 'keyword' | 'date') => {
    setSearchMode((prev) => {
      if (mode === 'home') return prev === targetMode ? 'none' : targetMode;
      if (prev === 'none') return targetMode;
      if (prev === targetMode) return 'none';
      if (prev === 'both') return targetMode === 'keyword' ? 'date' : 'keyword';
      return 'both';
    });
  };

  const extractKeywordsFromMessage = (text: string): string[] => {
    return text
      .split(',')
      .map((kw) => kw.trim())
      .filter((kw) => kw.length > 0);
  };

  const buttonLabel = isKeywordActive || isDateActive ? '찾아보기' : '물어보기';

  return (
    <div className='w-full flex flex-col relative justify-center items-center'>
      {mode === 'home' && !isKeywordActive && (
        <div className='w-full flex flex-grow gap-40 justify-between'>
          <img src='/CheetoImage.png' alt='cheeto icon' className='w-[220px]' />
          <div className='flex flex-col items-end justify-center text-2xl text-black font-bold'>
            <h3>{user?.name || '사용자'}님, 돌아오신 걸 환영해요!</h3>
            <h3>궁금하신 내용이 있나요?</h3>
          </div>
        </div>
      )}

      {isOptionsOpen && (
        <div className='absolute left-6 bottom-12 w-64 z-50 bg-white border border-gray-300 rounded-lg shadow-lg'>
          <Options
            toggleStates={toggleStates}
            onToggleChange={handleToggle}
            onClose={() => setIsOptionsOpen(false)}
            setActiveCount={setActiveCount}
          />
        </div>
      )}

      <div className='w-full flex gap-6 justify-center'>
        {(isKeywordActive || isTextareaVisible) && (
          <div className='w-full min-h-[166px] flex flex-col justify-between'>
            {isKeywordActive && (
              <div className='w-full mb-4'>
                <RecentTopics onSelect={(topic) => setInput(topic)} />
              </div>
            )}
            {isTextareaVisible && (
              <div className='w-full p-4 bg-white rounded-2xl border border-mono_e h-full flex flex-col justify-between'>
                <textarea
                  value={input}
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  ref={textareaRef}
                  className='w-full min-h-[118px] h-full p-3 text-sm border-none outline-none resize-none bg-transparent'
                  placeholder='검색할 주제나 내용을 알려주세요'
                />
                <div className='mt-2 flex items-center gap-3'>
                  <span className='text-xs text-gray-500'>인식한 키워드</span>
                  {input.trim().length > 0 && <TypingDots />}
                  {category && (
                    <div className='flex gap-2'>
                      <Tag tagtext={category} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {isDateActive && (
          <div className='w-full'>
            <MonthDateSelector
              selectedStart={selectedStart}
              selectedEnd={selectedEnd}
              setSelectedStart={setSelectedStart}
              setSelectedEnd={setSelectedEnd}
              direction={isKeywordActive ? 'horizontal' : 'vertical'}
            />
          </div>
        )}
      </div>

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

          <Button color='blue' text={buttonLabel} onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
