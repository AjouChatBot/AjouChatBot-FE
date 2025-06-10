import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SettingBlock from '../components/setting/SettingBlock';
import SettingFileBlock from '../components/setting/SettingFileBlock';
import SettingLine from '../components/setting/SettingLine';
import SettingSidebar from '../components/setting/SettingSidebar';
import SettingTitle from '../components/setting/SettingTitle';
import { updateAcademicInfoSettings } from '../services/updateAcademicInfoService';
import { useAcademicSettings } from '../stores/academicSettingStore';
import { getAcademicInfoSettings } from '../services/getAcademicInfoService';

const SettingAcademic = () => {
  const { toggleStates, setToggle, setAllToggles } = useAcademicSettings();
  const [showFileModal, setShowFileModal] = useState(false);

  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        const data = await getAcademicInfoSettings();
        setAllToggles({
          agree: data.useAcademicInfo,
          auto: data.autoCollect,
          enrollment: data.allowedCategories.enrollment_info,
          admission: data.allowedCategories.admission_info,
          course: data.allowedCategories.course_info,
          grade: data.allowedCategories.grade_info,
          registration: data.allowedCategories.registration_info,
        });
      } catch (err) {
        console.error('초기 설정 불러오기 실패:', err);
      }
    };
    fetchInitialSettings();
  }, [setAllToggles]);

  const handleToggle = (key: keyof typeof toggleStates) => {
    const newState = {
      ...toggleStates,
      [key]: !toggleStates[key],
    };
    setToggle(key);

    const payload = {
      auto_collect: newState.auto,
      use_academic_info: newState.agree,
      allowed_categories: {
        enrollment_info: newState.enrollment,
        admission_info: newState.admission,
        course_info: newState.course,
        grade_info: newState.grade,
        registration_info: newState.registration,
      },
    };

    updateAcademicInfoSettings(payload)
      .then((res) => {
        if (res.status === 'success') {
          console.log('서버 업데이트 성공:', res.message);
        } else {
          console.error('서버 업데이트 실패:', res.message);
        }
      })
      .catch((err) => {
        console.error('서버 통신 오류:', err);
      });
  };

  return (
    <Layout>
      <div className='flex w-full gap-[116px] mt-[60px] ml-[65px] mb-[60px] max-h-[calc(100vh-300px)] overflow-y-auto min-h-0 pr-4'>
        <SettingSidebar />
        <div className='flex w-full mr-[160px] flex-col overflow-y-scroll pr-4 min-h-0 max-h-screen scrollbar-hide'>
          <div className='mb-[60px] '>
            <div className='mb-9'>
              <SettingTitle type='manageAcademicInfo' />
            </div>
            <div className='flex flex-col gap-2.5'>
              <SettingBlock
                title='학적정보 수집/활용 동의'
                toggle
                isOn={toggleStates.agree}
                onToggle={() => handleToggle('agree')}
              />
              <SettingBlock
                title='학적정보 자동수집'
                toggle
                isOn={toggleStates.auto}
                onToggle={() => handleToggle('auto')}
              />
              <SettingBlock
                title='학적정보 등록(재학, 입학, 수강, 성적 정보)'
                arrow
                onClick={() => setShowFileModal(true)}
              />
            </div>
          </div>
          <div>
            <div className='mb-9'>
              <SettingTitle type='manageDataScope' />
            </div>
            <SettingLine text='학적정보' />
            <div className='mt-6 flex flex-col gap-6'>
              <SettingBlock
                title='재학정보'
                description='개인정보, 이수학기, 소속정보'
                toggle
                isOn={toggleStates.enrollment}
                onToggle={() => handleToggle('enrollment')}
              />
              <SettingBlock
                title='입학정보'
                description='입학년도, 입학전형, 입학구분, 출신고교'
                toggle
                isOn={toggleStates.admission}
                onToggle={() => handleToggle('admission')}
              />
            </div>
            <div className='mt-9 '>
              <SettingLine text='수강정보' />
              <div className='mt-6 mb-6 flex gap-[60px]'>
                <SettingBlock
                  title='수강정보'
                  description='학기별 수강과목 목록, 교직이수정보'
                  toggle
                  isOn={toggleStates.course}
                  onToggle={() => handleToggle('course')}
                />
                <SettingBlock
                  title='성적정보'
                  description='수강과목에 대한 성적정보보'
                  toggle
                  isOn={toggleStates.grade}
                  onToggle={() => handleToggle('grade')}
                />
              </div>
            </div>
            <div className='mt-9'>
              <SettingLine text='수강신청정보' />
              <div className='mt-6'>
                <SettingBlock
                  title='수강신청정보'
                  description='차기 예정학기 수강신청 내역'
                  toggle
                  isOn={toggleStates.registration}
                  onToggle={() => handleToggle('registration')}
                />
              </div>
            </div>
          </div>
          {showFileModal && (
            <div className='fixed inset-0 bg-black/20 z-50 flex items-center justify-center'>
              <div className='relative z-50'>
                <SettingFileBlock />
              </div>
              <div
                className='absolute inset-0'
                onClick={() => setShowFileModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SettingAcademic;
