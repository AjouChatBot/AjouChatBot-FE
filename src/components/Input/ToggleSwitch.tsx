import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div
      className={`relative flex items-center cursor-pointer rounded-lg w-14 h-8 px-1 transition-colors duration-300 ${
        isOn ? 'bg-blue_a_opacity_10' : 'bg-mono_c_opacity_10'
      }`}
      onClick={handleClick}
    >
      <div
        className={`absolute left-1 top-1 w-6 h-6 rounded-lg transition-transform duration-300 ${
          isOn ? 'translate-x-6 bg-blue_a' : 'translate-x-0 bg-mono_c'
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
