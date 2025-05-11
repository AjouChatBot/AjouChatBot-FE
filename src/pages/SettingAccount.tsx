import Layout from '../components/layout/Layout';
import SettingDetail from '../components/setting/SettingDetail';
import SettingLine from '../components/setting/SettingLine';
import SettingProfile from '../components/setting/SettingProfile';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';

const SettingAccount = () => {
  return (
    <Layout>
      <div className='flex w-full gap-[116px] ml-[65px]'>
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
              <SettingDetail label='이름' value='ㅁㅁㅁ' />
              <SettingDetail label='전화번호' value='010-1234-5678' />
              <SettingDetail label='이름' value='abc@ajou.ac.kr' />
            </div>
            <div className='w-full flex flex-col gap-6'>
              <SettingLine text='재학정보' />
              <SettingDetail label='단과대학' value='ㅁㅁㅁ' />
              <SettingDetail label='소속학과' value='ㅁㅁㅁ' />
              <SettingDetail label='제1전공' value='ㅁㅁㅁ' />
              <SettingDetail label='학년' value='ㅁㅁㅁ' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingAccount;
