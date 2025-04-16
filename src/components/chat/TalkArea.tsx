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
  const getBubbleStyle = () => {
    let baseStyle =
      'inline-block px-5 py-3 bg-white shadow-[0px_0px_3px_0px_rgba(3,100,179,0.25)]';
    let directionStyle = '';

    if (direction === 'left') {
      directionStyle = 'rounded-tr-xl rounded-bl-xl rounded-br-xl';
    } else {
      directionStyle = 'rounded-tl-xl rounded-bl-xl rounded-br-xl';
    }

    return `${baseStyle} ${directionStyle}`;
  };

  return (
    <div
      data-status={status}
      data-talk_direction={direction}
      className={getBubbleStyle()}
    >
      <div className='text-base leading-loose'>{message}</div>
    </div>
  );
};

export default TalkArea;
