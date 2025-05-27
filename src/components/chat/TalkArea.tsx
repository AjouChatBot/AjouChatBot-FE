interface TalkAreaProps {
  message?: string;
  direction?: 'left' | 'right';
  status?: 'inputted' | 'pending' | 'error';
  className?: string;
  children?: React.ReactNode;
}

const TalkArea: React.FC<TalkAreaProps> = ({
  message,
  direction = 'left',
  status = 'inputted',
  className = '',
  children,
}) => {
  const getBubbleStyle = () => {
    const baseStyle =
      'inline-block max-w-[80%] px-5 py-3 break-words bg-white shadow-[0px_0px_3px_0px_rgba(3,100,179,0.25)]';

    const directionStyle =
      direction === 'left'
        ? 'rounded-tr-xl rounded-bl-xl rounded-br-xl'
        : 'rounded-tl-xl rounded-bl-xl rounded-br-xl';

    return `${baseStyle} ${directionStyle}`;
  };

  return (
    <div
      className={`flex ${direction === 'left' ? 'justify-start' : 'justify-end'}`}
    >
      <div
        data-status={status}
        data-talk_direction={direction}
        className={`${getBubbleStyle()} ${className}`}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {status === 'pending' && !message ? children : null}
        <span className='inline-block'>{message}</span>
      </div>
    </div>
  );
};

export default TalkArea;
