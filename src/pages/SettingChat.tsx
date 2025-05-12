import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SettingBlock from '../components/setting/SettingBlock';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';

const SettingChat = () => {
  const [toggleStates, setToggleStates] = useState({
    grade: false,
  });

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Layout>
      <div className='w-full flex gap-[116px] ml-[65px] mt-[60px] mb-[60px]'>
        <SettingSidebar />
        <div className='w-full mr-[160px]'>
          <SettingTitle type='manageCollectedData' />
          <div className='w-full flex flex-col gap-2.5 mt-9'>
            <SettingBlock
              title='성적정보'
              description='수강과목에 대한 성적정보'
              toggle
              isOn={toggleStates.grade}
              onToggle={() => handleToggle('grade')}
            />
            <SettingBlock
              title='사용자 맞춤데이터 수집'
              arrow={true}
              danger={true}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingChat;
