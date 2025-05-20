import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import DateSelector from './DateSelector';

interface MonthDateSelectorProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  setSelectedStart: (date: Date | null) => void;
  setSelectedEnd: (date: Date | null) => void;
  direction?: 'horizontal' | 'vertical';
}

const MonthDateSelector: React.FC<MonthDateSelectorProps> = ({
  selectedStart,
  selectedEnd,
  setSelectedStart,
  setSelectedEnd,
  direction,
}) => {
  const [mode, setMode] = useState<'month' | 'date'>('month');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setMode('date');
  };

  return (
    <div className='w-full flex flex-col'>
      {mode === 'month' ? (
        <MonthSelector
          initialYear={selectedYear ?? new Date().getFullYear()}
          selectedYear={selectedYear ?? undefined}
          selectedMonth={selectedMonth ?? undefined}
          onMonthSelect={handleMonthSelect}
        />
      ) : (
        <>
          <DateSelector
            year={selectedYear!}
            month={selectedMonth!}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onDateSelect={(date) => {
              if (!selectedStart || (selectedStart && selectedEnd)) {
                setSelectedStart(date);
                setSelectedEnd(null);
              } else if (date < selectedStart) {
                setSelectedStart(null);
                setSelectedEnd(null);
              } else {
                setSelectedEnd(date);
              }
            }}
            direction={direction}
          />
        </>
      )}
    </div>
  );
};

export default MonthDateSelector;
