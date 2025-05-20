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
  const isUser = direction === 'right';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        data-status={status}
        data-talk_direction={direction}
        className={`
          px-5 py-3 bg-white shadow-[0px_0px_3px_0px_rgba(3,100,179,0.25)]
          ${
            isUser
              ? 'rounded-tl-xl rounded-bl-xl rounded-br-xl bg-white'
              : 'rounded-tr-xl rounded-bl-xl rounded-br-xl bg-white'
          }
          max-w-[75%] break-words whitespace-pre-wrap
        `}
      >
        <div className='text-base leading-loose'>{message}</div>
      </div>
    </div>
  );
};

export default TalkArea;
