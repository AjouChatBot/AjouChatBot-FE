import Icon from '../Icons/Icon';
import ToggleSwitch from '../Input/ToggleSwitch';

interface SettingBlockProps {
  title: string;
  description?: string;
  toggle?: boolean;
  arrow?: boolean;
  isOn?: boolean;
  onToggle?: () => void;
  danger?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const SettingBlock: React.FC<SettingBlockProps> = ({
  title,
  description,
  toggle,
  arrow,
  isOn,
  onToggle,
  danger,
  onClick,
  loading,
}) => {
  return (
    <div
      className={`w-full px-4 py-4 bg-white bg-opacity-50 rounded-xl flex items-center justify-between cursor-pointer ${
        danger ? 'text-red-500 border border-mono_e' : ''
      }`}
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

      <div className='flex items-center gap-2'>
        {loading ? (
          <div className='w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin' />
        ) : (
          <>
            {toggle && typeof isOn === 'boolean' && onToggle && (
              <ToggleSwitch isOn={isOn} onToggle={onToggle} />
            )}
            {arrow && (
              <Icon
                name={danger ? 'rightarrowicon_red' : 'rightarrowicon_gray'}
                size={24}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingBlock;
