import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SettingBlock from '../components/setting/SettingBlock';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';
import {
  deleteCustomUserData,
  getUserDataCollectionSettings,
  updateUserDataCollectionSettings,
} from '../services/collectedDataService';

const SettingChat = () => {
  const navigate = useNavigate();
  const [toggleStates, setToggleStates] = useState({
    grade: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const trackEnabled = await getUserDataCollectionSettings();
        setToggleStates((prev) => ({
          ...prev,
          grade: trackEnabled,
        }));
      } catch (error) {
        console.error('Error fetching user data collection settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = async (key: keyof typeof toggleStates) => {
    try {
      const newValue = !toggleStates[key];
      await updateUserDataCollectionSettings(newValue);
      setToggleStates((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    } catch (error) {
      console.error('Error updating user data collection settings:', error);
    }
  };

  const handleDeleteData = async () => {
    try {
      setIsDeleting(true);
      await deleteCustomUserData();
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
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
              arrow={!isDeleting}
              danger={!isDeleting}
              onClick={handleDeleteData}
              loading={isDeleting}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingChat;
