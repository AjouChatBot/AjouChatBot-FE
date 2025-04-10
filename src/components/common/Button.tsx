import React from 'react';
import Icon from '../Icons/Icon'; // 아이콘 컴포넌트 불러오기

type ButtonProps = {
  color: 'gray' | 'grayline' | 'blue' | 'blueline' | 'red' | 'redline';
  text: '물어보기' | '답변하기' | '찾아보기';
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ color, text, onClick }) => {
  // 색상에 따른 스타일 매핑
  const colorStyles = {
    gray: 'bg-mono_b text-white border-transparent',
    grayline: 'bg-white text-mono_b border-gray-500 border',
    blue: 'bg-blue-500 text-white border-transparent',
    blueline: 'bg-white text-blue-500 border-blue-500 border',
    red: 'bg-red-500 text-white border-transparent',
    redline: 'bg-white text-red-500 border-red-500 border',
  };

  // 특정 그룹의 색상에 같은 아이콘 적용
  let icon;
  if (['gray', 'blue', 'red'].includes(color)) {
    icon = <Icon name='rightarrowicon_white' />;
  } else if (['grayline'].includes(color)) {
    icon = <Icon name='rightarrowicon_gray' />;
  } else if (['blueline'].includes(color)) {
    icon = <Icon name='rightarrowicon_blue' />;
  } else if (['redline'].includes(color)) {
    icon = <Icon name='rightarrowicon_red' />;
  }

  return (
    <button
      className={`flex items-center gap-2 px-4 py-3 rounded-2xl ${colorStyles[color]}`}
      onClick={onClick}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default Button;
