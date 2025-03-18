import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div
      className={`flex items-center cursor-pointer p-1 rounded-lg w-14 h-8 transition-all duration-300 ${
        isOn ? 'bg-blue_a_opacity_10' : 'bg-mono_c_opacity_10'
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-6 h-6 rounded-lg transform transition-all duration-300 ${
          isOn ? 'bg-blue_a translate-x-6' : 'bg-mono_c'
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
