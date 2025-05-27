import Icon from '../Icons/Icon';

type SettingTabType = 'account' | 'academic' | 'chat';
type SettingTabColor = 'black' | 'blue';

interface SettingTabProps {
  type: SettingTabType;
  color: SettingTabColor;
}

const settingTabsConfig = {
  account: {
    iconBlack: 'personicon_black',
    iconBlue: 'personicon_blue',
    label: '계정 정보',
  },
  academic: {
    iconBlack: 'infomanageicon_black',
    iconBlue: 'infomanageicon_blue',
    label: '학적정보 관리',
  },
  chat: {
    iconBlack: 'smilechaticon_black',
    iconBlue: 'smilechaticon_blue',
    label: '채팅데이터 관리',
  },
} as const;

const SettingTabs: React.FC<SettingTabProps> = ({ type, color }) => {
  const config = settingTabsConfig[type];
  const iconName = color === 'blue' ? config.iconBlue : config.iconBlack;

  return (
    <div
      className={`w-[200px] flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition ${color === 'blue' ? 'border border-blue_c text-blue_c bg-white' : 'text-black bg-white'}`}
    >
      <Icon name={iconName} size={24} />
      <span>{config.label}</span>
    </div>
  );
};

export default SettingTabs;
