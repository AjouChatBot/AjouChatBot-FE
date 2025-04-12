import Icon from '../Icons/Icon';
import { useNavigate } from 'react-router-dom';

const SubHeader = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-grow items-start justify-between mt-[60px] mb-2'>
      <div className='relative w-full flex justify-between items-center'>
        <div className='flex justify-start items-center gap-3'>
          <div className='w-12 h-12 relative flex justify-center items-center'>
            <div className='w-12 h-12 absolute bg-white rounded-2xl border border-gray-200' />
            <div className='relative z-10'>
              <Icon
                name='leftarrowicon_gray'
                onClick={() => navigate('/home')}
              />
            </div>
          </div>
        </div>
        <div className='rounded-xl flex justify-start items-center gap-4'>
          <div className='text-stone-500 text-base font-bold'>
            지금 대화중인 주제
          </div>
          <div className='text-black text-base font-bold'>
            수강신청 기간에 대한 질문
          </div>
        </div>
        <img
          className='w-12 h-12 rounded-2xl border border-gray-200'
          src='https://placehold.co/48x48'
          alt='Profile'
        />
      </div>
    </div>
  );
};

export default SubHeader;
