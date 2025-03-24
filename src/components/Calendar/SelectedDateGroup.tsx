import React from 'react';
import SelectedDateBox from './SelectedDateBox';
import classNames from 'classnames';

interface SelectedDateGroupProps {
  startDate: Date | null;
  endDate: Date | null;
  direction?: 'vertical' | 'horizontal'; // 수직 or 수평 배치
}

const SelectedDateGroup: React.FC<SelectedDateGroupProps> = ({
  startDate,
  endDate,
  direction = 'horizontal',
}) => {
  return (
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
  );
};

export default SelectedDateGroup;
