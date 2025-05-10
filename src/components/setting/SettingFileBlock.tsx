import SettingFileArea from './SettingFileArea';
import SettingTitle from './SettingTitle';

const SettingFileBlock = () => {
  return (
    <div className='bg-white px-9 py-9 rounded-3xl'>
      <div className='mb-6'>
        <SettingTitle type='registerAcademicInfo' />
      </div>
      <div className='flex gap-2.5'>
        <div className='flex flex-col gap-4'>
          <p className='text-black font-medium text-base'>재학정보</p>
          <SettingFileArea />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-black font-medium text-base'>입학정보</p>
          <SettingFileArea />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-black font-medium text-base'>수강정보</p>
          <SettingFileArea />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-black font-medium text-base'>성적정보</p>
          <SettingFileArea />
        </div>
      </div>
    </div>
  );
};

export default SettingFileBlock;
