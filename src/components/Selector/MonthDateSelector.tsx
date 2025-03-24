import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import DateSelector from './DateSelector';

const MonthDateSelector: React.FC = () => {
  const [mode, setMode] = useState<'month' | 'date'>('month');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const handleMonthSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setMode('date');
  };

  const handleBackToMonth = () => {
    setMode('month');
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
          <button
            onClick={handleBackToMonth}
            className='mb-4 text-sm text-blue_c hover:underline'
          >
            ← 월 선택으로 돌아가기
          </button>
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
          />
        </>
      )}
    </div>
  );
};

export default MonthDateSelector;
