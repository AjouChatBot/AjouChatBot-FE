import React, { useEffect, useRef } from 'react';
import ToggleSwitch from './ToggleSwitch';

type ToggleKeys = 'question' | 'academicInfo' | 'responseLog';

interface OptionsProps {
  toggleStates: { [key in ToggleKeys]: boolean };
  onToggleChange: (key: ToggleKeys) => void;
  onClose?: () => void;
  setActiveCount: (count: number) => void;
}

const Options: React.FC<OptionsProps> = ({
  toggleStates,
  onToggleChange,
  onClose,
  setActiveCount,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const activeCount = Object.values(toggleStates).filter(
      (value) => value
    ).length;
    setActiveCount(activeCount);
  }, [toggleStates, setActiveCount]);

  return (
    <div
      ref={optionsRef}
      className='w-80 px-6 py-5 bg-white rounded-lg shadow-md inline-flex flex-col justify-center items-start gap-6'
    >
      <div className='justify-start text-black text-base font-bold'>옵션</div>

      <div className='self-stretch flex flex-col justify-start items-start gap-2'>
        <div className='self-stretch inline-flex justify-center items-center gap-2.5'>
          <div className='justify-start text-neutral-400 text-xs font-medium'>
            질문
          </div>
          <div className='flex-1 h-0 border border-neutral-400'></div>
        </div>
        <div className='self-stretch flex flex-col justify-start items-start gap-1.5'>
          <div className='self-stretch inline-flex justify-between items-center'>
            <div className='justify-start text-sky-700 text-base font-semibold'>
              새로운 주제로 질문하기
            </div>
            <ToggleSwitch
              isOn={toggleStates.question}
              onToggle={() => onToggleChange('question')}
            />
          </div>
        </div>
      </div>

      <div className='self-stretch flex flex-col justify-start items-start gap-2'>
        <div className='self-stretch inline-flex justify-center items-center gap-2.5'>
          <div className='justify-start text-neutral-400 text-xs font-semibold'>
            응답
          </div>
          <div className='flex-1 h-0 border border-neutral-400'></div>
        </div>
        <div className='self-stretch flex flex-col justify-start items-start gap-1.5'>
          <div className='self-stretch inline-flex justify-between items-center'>
            <div className='justify-start text-sky-700 text-base font-semibold'>
              응답에 내 학적정보 반영하기
            </div>
            <ToggleSwitch
              isOn={toggleStates.academicInfo}
              onToggle={() => onToggleChange('academicInfo')}
            />
          </div>
          <div className='self-stretch inline-flex justify-between items-center'>
            <div className='justify-start text-sky-700 text-base font-semibold'>
              응답기록 활용동의
            </div>
            <ToggleSwitch
              isOn={toggleStates.responseLog}
              onToggle={() => onToggleChange('responseLog')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
