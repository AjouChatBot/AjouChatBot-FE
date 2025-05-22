import React from 'react';

interface TalkAreaProps {
    message?: string;
    children?: React.ReactNode;
    direction?: 'left' | 'right';
    status?: 'inputted' | 'pending' | 'error';
    className?: string;
}

const TalkArea: React.FC<TalkAreaProps> = ({
                                               message,
    children,
                                               direction = 'left',
                                               status = 'inputted',
                                               className = '',
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
                style={{ whiteSpace: 'pre-wrap'}}
            >
                {children ?? message}
            </div>
        </div>
    );
};

export default TalkArea;
