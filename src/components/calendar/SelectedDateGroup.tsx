import React from 'react';
import SelectedDateBox from '../calendar/SelectedDateBox';
import classNames from 'classnames';

interface SelectedDateGroupProps {
  startDate: Date | null;
  endDate: Date | null;
  direction?: 'vertical' | 'horizontal'; // 수직 or 수평 배치
}

const SelectedDateGroup: React.FC<SelectedDateGroupProps> = ({
  startDate,
  endDate,
  direction = 'vertical',
}) => {
  return (
    <div className='flex flex-col justify-start'>
      <p className='font-bold text-base text-black text-opacity-30 mb-4'>
        검색 기간
      </p>
      <div
        className={classNames(
          'flex',
          direction === 'vertical'
            ? 'flex-col gap-3'
            : 'flex-row gap-2 flex-nowrap items-center justify-between'
        )}
      >
        <SelectedDateBox date={startDate} label='검색 시작일' />
        <SelectedDateBox date={endDate} label='검색 종료일' />
      </div>
    </div>
  );
};

export default SelectedDateGroup;
