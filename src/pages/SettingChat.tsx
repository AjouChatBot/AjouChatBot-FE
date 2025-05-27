import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SettingBlock from '../components/setting/SettingBlock';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';
import { deleteCustomUserData } from '../services/collectedDataService';

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

  const handleDeleteData = async () => {
    try {
      const res = await deleteCustomUserData();
      if (res.status === 'success') {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert('초기화 요청 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className='w-full flex gap-[116px] ml-[65px] mt-[60px] mb-[60px]'>
        <SettingSidebar />
        <div className='w-full mr-[160px]'>
          <SettingTitle type='manageCollectedData' />
          <div className='w-full flex flex-col gap-2.5 mt-9'>
            <SettingBlock
              title='사용자 맞춤데이터 수집'
              toggle
              isOn={toggleStates.grade}
              onToggle={() => handleToggle('grade')}
            />
            <SettingBlock
              title='A.mate 맞춤형 수집데이터 초기화'
              arrow={true}
              danger={true}
              onClick={handleDeleteData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingChat;
