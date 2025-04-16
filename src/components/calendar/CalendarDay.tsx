import React from 'react';
import classNames from 'classnames';

interface CalendarDayProps {
  day: number;
  isSelected: boolean;
  isInRange: boolean;
  isEndDate?: boolean;
  isNextMonth?: boolean;
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isSelected,
  isInRange,
  isEndDate,
  isNextMonth,
  onClick,
}) => {
  const isActive = isSelected || isInRange || isEndDate;
  const isDimmed = isNextMonth && !isActive;

  return (
    <button
      onClick={onClick}
      className={classNames(
        'w-8 h-8 flex items-center justify-center rounded-lg py-1 px-3 transition border-none m-2',
        {
          'bg-blue_c text-white': isActive,
          'bg-white text-black': !isActive,
          'opacity-50 pointer-events-none': isDimmed,
          'hover:border-none hover:outline hover:outline-1 hover:outline-mono_e':
            !isActive,
        },
        'appearance-none',
        'focus:outline-none',
        'focus:ring-0',
        'focus-visible:outline-none',
        'focus-visible:ring-0',
        'outline-none',
        'ring-0',
        'shadow-none'
      )}
    >
      {day}
    </button>
  );
};

export default CalendarDay;
