import { useState } from 'react';
import TalkArea from '../components/chat/TalkArea';
import Icon from '../components/Icons/Icon';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const MobileHome = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { handleSend } = useChat();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSend({ sender: 'user', message: message.trim() });
        setMessage('');
        navigate('/m/chat');
      }
    }
  };

  const handleSendButtonClick = () => {
    if (message.trim()) {
      handleSend({ sender: 'user', message: message.trim() });
      setMessage('');
      navigate('/m/chat');
    }
  };

  return (
    <div>
      <div
        className='w-screen min-h-screen flex flex-col px-6 py-2'
        style={{
          backgroundImage: 'url("/mobilebackground.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='flex flex-col items-center mt-[84px]'>
          <Icon name='amatetext_mobilelogin' size={150} />
        </div>
        <div className='w-full'>
          <div className='flex items-center mb-4'>
            <Icon name='mainlogo' size={32} />
            <p className='text-sm font-bold text-blue_a'>A.mate</p>
          </div>
          <div className='flex flex-col gap-2'>
            <TalkArea message='궁금한 게 있으신가요? 편하게 질문해주세요!' />
            <TalkArea message='최근에는 이런 것들을 물어보셨어요!' />
          </div>
        </div>
        <div className='w-full px-6 fixed bottom-[43px] left-0 right-0 flex flex-col items-center'>
          <div className='w-full px-4 py-2 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center'>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='메시지 입력'
              className={`flex-1 text-sm font-medium leading-loose outline-none ${
                message ? 'text-mono_a' : 'text-mono_c'
              }`}
            />
            <button
              onClick={handleSendButtonClick}
              className={`w-7 h-7 relative flex justify-center items-center ${
                message.trim() ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ padding: 0 }}
            >
              <div className='w-7 h-7 bg-blue_a rounded-full flex items-center justify-center'>
                <Icon name='sendicon_white' size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
