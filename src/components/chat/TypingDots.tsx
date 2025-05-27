const TypingDots = () => {
  return (
    <div className='w-14 h-8 px-3 py-2.5 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center gap-1.5'>
      <span className='w-1.5 h-1.5 bg-mono_e rounded-full animate-bounce-dot [animation-delay:0s]' />
      <span className='w-1.5 h-1.5 bg-mono_e rounded-full animate-bounce-dot [animation-delay:0.2s]' />
      <span className='w-1.5 h-1.5 bg-mono_e rounded-full animate-bounce-dot [animation-delay:0.4s]' />
    </div>
  );
};

export default TypingDots;
