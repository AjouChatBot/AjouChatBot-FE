import { useNavigate } from 'react-router-dom';
import Icon from '../Icons/Icon';
import TalkArea from '../chat/TalkArea';

const HeaderLeft = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-start gap-4' onClick={() => navigate('/home')}>
      <div className='mt-5'>
        <Icon name='mainlogo' size={40} />
      </div>
      <div className='flex flex-col'>
        <div className='flex items-start'>
          <Icon name='AmateText' size={80} />
        </div>
        <div className="whitespace-nowrap">
          <TalkArea message='어떤 내용이 궁금하신가요?' />
        </div>
      </div>
    </div>
  );
};

export default HeaderLeft;
