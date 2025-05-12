import Icon from '../Icons/Icon';
import ToggleSwitch from '../Input/ToggleSwitch';

interface SettingBlockProps {
  title: string;
  description?: string;
  toggle?: boolean;
  isOn?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  arrow?: boolean;
  onClick?: () => void;
  danger?: boolean;
}

const SettingBlock: React.FC<SettingBlockProps> = ({
  title,
  description,
  toggle,
  isOn,
  onToggle,
  disabled,
  arrow,
  onClick,
  danger,
}) => {
  return (
    <div
      className={`w-full px-4 py-4 bg-white bg-opacity-50 rounded-xl flex items-center justify-between cursor-pointer ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      } ${danger ? 'text-red-500' : ''}`}
      onClick={onClick}
    >
      <div className='flex flex-col'>
        <span
          className={`text-base font-medium ${danger ? 'text-red_a' : 'text-black'}`}
        >
          {title}
        </span>
        {description && (
          <span className='text-xs text-gray-400 mt-1'>{description}</span>
        )}
      </div>

      {toggle && typeof isOn === 'boolean' && onToggle && (
        <ToggleSwitch isOn={isOn} onToggle={onToggle} />
      )}

      {arrow && !toggle && (
        <Icon
          name={danger ? 'rightarrowicon_red' : 'rightarrowicon_gray'}
          size={24}
        />
      )}
    </div>
  );
};

export default SettingBlock;
