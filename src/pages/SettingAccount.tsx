import Layout from '../components/layout/Layout';
import SettingDetail from '../components/setting/SettingDetail';
import SettingLine from '../components/setting/SettingLine';
import SettingProfile from '../components/setting/SettingProfile';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';
import { useUser } from '../contexts/UserContext';

const SettingAccount = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <Layout>
      <div className='flex w-full gap-[116px] ml-[65px] mt-[60px] mb-[60px]'>
        <SettingSidebar />
        <div className='w-full mr-[206px]'>
          <div className='mb-9'>
            <SettingTitle type='manageAccountInfo' />
          </div>
          <div className='mb-9'>
            <SettingProfile />
          </div>
          <div className='w-full flex gap-[60px]'>
            <div className='w-full flex flex-col gap-6'>
              <SettingLine text='개인정보' />
              <SettingDetail label='이름' value={user.name} />
              <SettingDetail label='전화번호' value={user.phone} />
              <SettingDetail label='이메일' value={user.email} />
            </div>
            <div className='w-full flex flex-col gap-6'>
              <SettingLine text='재학정보' />
              <SettingDetail label='단과대학' value={user.college} />
              <SettingDetail label='소속학과' value={user.department} />
              <SettingDetail label='제1전공' value={user.major} />
              <SettingDetail label='학년' value={`${user.grade}학년`} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingAccount;
