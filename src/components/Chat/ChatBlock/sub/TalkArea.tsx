import React from 'react';

interface TalkAreaProps {
  talk_direction: 'left' | 'right';
  status: 'inputted' | 'inputting';
  message?: string;
}

const TalkArea: React.FC<TalkAreaProps> = ({
  talk_direction,
  status,
  message,
}) => {
  return (
    <div
      data-status={status}
      data-talk_direction={talk_direction}
      className={` 
        max-w-[295px] w-fit px-5 py-3 bg-white shadow-[0px_0px_3px_0px_rgba(3,100,179,0.25)]
        flex justify-center items-center gap-2.5
        ${talk_direction === 'left' ? 'rounded-tr-xl rounded-bl-xl rounded-br-xl' : 'rounded-tl-xl rounded-bl-xl rounded-br-xl'}
      `}
    >
      {status === 'inputting' ? (
        <div className='flex justify-start items-center gap-2'>
          <div className='w-3 h-3 bg-blue-400 rounded-full animate-bounce-dot'></div>
          <div
            className='w-3 h-3 bg-blue-400 rounded-full animate-bounce-dot'
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className='w-3 h-3 bg-blue-400 rounded-full animate-bounce-dot'
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      ) : (
        <div className='w-fit text-black text-base font-normal leading-loose whitespace-normal'>
          {message}
        </div>
      )}
    </div>
  );
};

export default TalkArea;
