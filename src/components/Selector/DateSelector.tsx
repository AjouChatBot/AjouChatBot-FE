import React, { useState } from 'react';
import CalendarMonth from '../Calendar/CalendarMonth';
import SelectedDateGroup from '../Calendar/SelectedDateGroup';
import Icon from '../Icons/Icon';

interface DateSelectorProps {
  year: number;
  month: number;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onDateSelect: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  year,
  month,
  selectedStart,
  selectedEnd,
  onDateSelect,
}) => {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const goToPrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex flex-col w-full gap-3 mt-4 text-sm text-gray-700'>
        <SelectedDateGroup
          startDate={selectedStart}
          endDate={selectedEnd}
          direction='horizontal' // 외부 상태로 교체 가능
        />
      </div>

      <div className='bg-white w-full flex justify-between gap-4 p-6 rounded-xl '>
        <div className='flex flex-col justify-start items-start'>
          <h2 className='text-lg font-semibold mb-2 whitespace-nowrap'>
            {selectedStart ? '검색 종료일' : '검색 시작일'}
          </h2>
          <div className='flex flex-col justify-start gap-2 text-base text-mono_a'>
            <span className='opacity-50'>
              {currentYear}년 {currentMonth + 1}월
            </span>
          </div>
          <div className='flex gap-2 mt-2'>
            <button
              onClick={goToPrevMonth}
              className='bg-white p-2 border border-mono_e rounded-md
            focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
              outline-none ring-0 shadow-none appearance-none'
            >
              <Icon name='leftarrowicon_black' size={8} />
            </button>
            <button
              onClick={goToNextMonth}
              className='bg-white p-2 border border-mono_e rounded-md focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
              outline-none ring-0 shadow-none appearance-none'
            >
              <Icon name='rightarrowicon_black' size={8} />
            </button>
          </div>
        </div>

        <CalendarMonth
          year={currentYear}
          month={currentMonth}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          onSelect={onDateSelect}
        />
      </div>
    </div>
  );
};

export default DateSelector;
