import CalendarDay from './CalendarDay';

interface CalendarMonthProps {
  year: number;
  month: number;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelect: (date: Date) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  year,
  month,
  selectedStart,
  selectedEnd,
  onSelect,
}) => {
  const getDaysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();
  const getStartDayOfWeek = (y: number, m: number) =>
    new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startDayOfWeek = getStartDayOfWeek(year, month);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getDateObject = (day: number, offset: number = 0) =>
    new Date(year, month + offset, day);

  const days: {
    day: number;
    date: Date;
    isSelected: boolean;
    isInRange: boolean;
    isEndDate: boolean;
    isNextMonth: boolean;
  }[] = [];

  // 이전 달 날짜
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDate = getDateObject(-startDayOfWeek + i + 1, 0);
    days.push({
      day: prevDate.getDate(),
      date: prevDate,
      isSelected: false,
      isInRange: false,
      isEndDate: false,
      isNextMonth: true,
    });
  }

  // 이번 달 날짜
  for (let i = 1; i <= daysInMonth; i++) {
    const current = getDateObject(i, 0);
    const isSelected = selectedStart && isSameDay(current, selectedStart);
    const isEndDate = selectedEnd && isSameDay(current, selectedEnd);
    const inRange =
      selectedStart &&
      selectedEnd &&
      current > selectedStart &&
      current < selectedEnd;

    days.push({
      day: i,
      date: current,
      isSelected: !!isSelected,
      isEndDate: !!isEndDate,
      isInRange: !!inRange,
      isNextMonth: false,
    });
  }

  // 다음 달 날짜
  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = getDateObject(i, 1);
    days.push({
      day: nextDate.getDate(),
      date: nextDate,
      isSelected: false,
      isInRange: false,
      isEndDate: false,
      isNextMonth: true,
    });
  }

  // 7개씩 자른 주 단위 배열 생성
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className='w-full flex flex-col gap-1'>
      {weeks.map((week, idx) => (
        <div key={idx} className='w-full flex justify-between'>
          {week.map(
            ({ day, date, isSelected, isInRange, isEndDate, isNextMonth }) => (
              <div key={date.toISOString()} className='flex justify-center'>
                <CalendarDay
                  day={day}
                  isSelected={isSelected}
                  isInRange={isInRange}
                  isEndDate={isEndDate}
                  isNextMonth={isNextMonth}
                  onClick={() => onSelect(date)}
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarMonth;
