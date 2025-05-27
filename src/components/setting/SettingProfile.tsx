import { useUser } from '../../contexts/UserContext';
import Icon from '../Icons/Icon';

const SettingProfile = () => {
  const { user } = useUser();

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className='flex w-full items-center justify-between bg-white border border-mono_e rounded-2xl px-9 py-6'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-black font-medium text-2xl'>
          {user.name ?? '이름 없음'}
        </h3>
        <div className='flex items-center gap-3'>
          <p className='text-blue_b font-medium text-xs'>학생사용자</p>
          <div className='w-0 h-[6px] bg-mono_c outline outline-1 outline-offset-[-0.50px] outline-mono_c' />
          <p className='text-mono_d font-medium text-xs'>학사정보 미연동</p>
        </div>
      </div>
      <div className='flex items-start gap-3'>
        <Icon name='shieldcheck' size={52} />
        <div className='flex flex-col justify-start'>
          <h2 className='text-blue_b font-bold text-2xl'>아주대학교</h2>
          <p className='text-mono_c font-bold text-xs'>
            Google Workspace 프로필
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingProfile;
