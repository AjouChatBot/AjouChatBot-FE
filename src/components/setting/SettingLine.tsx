interface SettingLineProps {
  text: string;
}

const SettingLine: React.FC<SettingLineProps> = ({ text }) => {
  return (
    <div className='flex items-center gap-2 w-full'>
      <span className='text-base text-mono_a font-medium opacity-30 whitespace-nowrap'>
        {text}
      </span>
      <div className='flex-1 h-px bg-mono_a opacity-30' />
    </div>
  );
};

export default SettingLine;
