import Icon from './Icons/Icon';

const MobileBoarding = () => {
  return (
    <div
      className='w-screen min-h-screen flex flex-col items-center justify-center px-6 py-2'
      style={{
        backgroundImage: 'url("/mobilebackground.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex flex-col items-center gap-4'>
        <Icon name='mainlogo' size={48} />
        <p className='text-sm font-bold text-blue_a'>A.mate</p>
      </div>
      <div className='text-base text-blue_a mt-[270px]'>
        <p>서비스로 이동중...</p>
      </div>
    </div>
  );
};

export default MobileBoarding;
