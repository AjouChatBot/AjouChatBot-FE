import React from 'react';
import Icon from '../Icons/Icon';

interface SelectedDateBoxProps {
  date: Date | null;
  label: string; // '검색 시작일' or '검색 종료일'
}

const SelectedDateBox: React.FC<SelectedDateBoxProps> = ({ date, label }) => {
  const iconName = date ? 'dateselect_left_blue' : 'dateselect_left_black';

  return (
    <div className='inline-flex bg-white bg-opacity-60 border-mono_e gap-2 px-4 py-3 rounded-xl items-center w-full'>
      <Icon name={iconName} size={24} />
      {date ? (
        <p className='text-blue_c text-base font-medium'>
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
        </p>
      ) : (
        <p className='opacity-30 text-black text-base font-medium'>{label}</p>
      )}
    </div>
  );
};

export default SelectedDateBox;
