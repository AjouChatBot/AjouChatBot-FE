import React from 'react';

interface TalkAreaProps {
  message: string;
  direction?: 'left' | 'right';
  status?: 'inputted' | 'pending' | 'error';
}

const TalkArea: React.FC<TalkAreaProps> = ({
  message,
  direction = 'left',
  status = 'inputted',
}) => {
  return (
    <div
      data-status={status}
      data-talk_direction={direction}
      className='w-72 px-5 py-3 bg-white rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-[0px_0px_3px_0px_rgba(3,100,179,0.25)]'
    >
      <div className="text-base font-['Noto_Sans_KR'] leading-loose">
        {message}
      </div>
    </div>
  );
};

export default TalkArea;
