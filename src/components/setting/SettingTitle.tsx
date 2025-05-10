import Icon from '../Icons/Icon';

type Title =
  | 'manageCollectedData'
  | 'manageAcademicInfo'
  | 'manageAccountInfo'
  | 'registerAcademicInfo'
  | 'manageDataScope';

interface SettigTitleProps {
  type: Title;
}

const titleConfig: Record<
  Title,
  {
    icon: 'smilechaticon_black' | 'infomanageicon_black' | 'personicon_black'; // 또는 string
    title: string;
    subtitle?: string;
  }
> = {
  manageCollectedData: {
    icon: 'smilechaticon_black',
    title: '수집데이터 관리',
    subtitle: '대화를 통해 분석한 정보를 관리합니다',
  },
  manageAcademicInfo: {
    icon: 'infomanageicon_black',
    title: '학적정보활용 설정',
    subtitle: '서비스 내에서 개인 학적정보에 대한 활용여부를 설정합니다',
  },
  manageAccountInfo: {
    icon: 'personicon_black',
    title: '계정정보',
  },
  manageDataScope: {
    icon: 'infomanageicon_black',
    title: '정보 활용범위 설정',
    subtitle: '서비스 내에서 활용할 학적정보를 선택합니다',
  },
  registerAcademicInfo: {
    icon: 'infomanageicon_black',
    title: '학적정보 등록',
  },
} as const;

const SettingTitle: React.FC<SettigTitleProps> = ({ type }) => {
  const { icon, title } = titleConfig[type];

  return (
    <div>
      <div className='flex gap-3'>
        <Icon name={icon} size={32} />
        <h2 className='font-medium text-2xl text-black'>{title}</h2>
      </div>
      <div className='mt-3 pl-11 font-medium text-base text-mono_c'>
        {titleConfig[type].subtitle && <p>{titleConfig[type].subtitle}</p>}
      </div>
    </div>
  );
};

export default SettingTitle;
