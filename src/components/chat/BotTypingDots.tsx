import React from 'react';

const BotTypingDots: React.FC = () => {
    return (
        <div className='w-14 h-8 px-3 py-2.5 bg-white rounded-3xl inline-flex justify-center items-center gap-1.5'>
            <span className="w-2 h-2 rounded-full bg-blue_b animate-bounce-dot [animation-delay:0s]" />
            <span className="w-2 h-2 rounded-full bg-blue_c animate-bounce-dot [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-blue_a_opacity_10 animate-bounce-dot [animation-delay:0.4s]" />
        </div>
);
};

export default BotTypingDots;
