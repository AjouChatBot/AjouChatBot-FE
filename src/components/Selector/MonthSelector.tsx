import Icon from '../Icons/Icon';
import { useState } from 'react';
import classNames from 'classnames';

interface MonthSelectorProps {
  initialYear?: number;
  selectedYear?: number;
  selectedMonth?: number;
  onMonthSelect: (year: number, month: number) => void;
}

const Months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const MonthSelector: React.FC<MonthSelectorProps> = ({
  initialYear = new Date().getFullYear(),
  onMonthSelect,
  selectedYear,
  selectedMonth,
}) => {
  const [currentYear, setCurrentYear] = useState(initialYear);

  const goToPrevYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const goToNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  return (
    <div className=' w-full bg-white p-6 rounded-xl '>
      <h2 className='text-lg font-semibold mb-2'>검색 시작 년도</h2>

      <div className='flex items-center gap-2 text-base text-mono_a mb-4'>
        <span className='opacity-50'>{currentYear}년</span>
        <div className='flex gap-2'>
          <button
            onClick={goToPrevYear}
            className='bg-white p-2 border border-mono_e rounded
            focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
            outline-none ring-0 shadow-none appearance-none'
          >
            <Icon name='leftarrowicon_black' size={6} />
          </button>
          <button
            onClick={goToNextYear}
            className='bg-white p-2 border border-mono_e rounded
            focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
            outline-none ring-0 shadow-none appearance-none'
          >
            <Icon name='rightarrowicon_black' size={6} />
          </button>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 w-full'>
        {Months.map((label, idx) => (
          <button
            key={idx}
            onClick={() => onMonthSelect(currentYear, idx)}
            className={classNames(
              'w-8 h-8 flex justify-center items-center rounded-lg text-sm transition',
              selectedMonth === idx && selectedYear === currentYear
                ? 'bg-blue_c text-white'
                : 'bg-white text-black hover:outline hover:outline-1 hover:outline-mono_e',
              'appearance-none focus:outline-none focus:ring-0'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthSelector;
