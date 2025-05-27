import { useState, useRef } from 'react';
import Icon from '../Icons/Icon';

interface SettingFileAreaProps {
  label?: string;
  accept?: string;
}

const SettingFileArea: React.FC<SettingFileAreaProps> = ({
  label = '클릭하여 파일 선택\n혹은 끌어다 놓기',
  accept = '.jpeg, .jpg, .png, .pdf',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDelete = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex gap-4'>
      {!file ? (
        <div
          className='w-[222px] h-[300px] border border-mono_e rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white'
          onClick={handleAreaClick}
        >
          <Icon name='fileuploadicon_gray' size={60} className='mb-3' />
          <p className='text-center text-xs font-bold whitespace-pre-line text-mono_b'>
            {label}
          </p>
          <p className='text-[10px] text-mono_b mt-4'>
            인식 가능문서: 재학증명서
          </p>
          <p className='text-[10px] text-mono_b'>확장자: jpeg, jpg, png, pdf</p>
          <input
            type='file'
            accept={accept}
            className='hidden'
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
      ) : (
        <div className='w-[222px] h-[300px] border rounded-xl flex flex-col items-center justify-center bg-white relative'>
          <Icon name='fileuploadicon_blue' size={60} className='mb-3' />
          <div className='flex gap-2.5'>
            <p className='text-sm font-semibold text-blue_a'>{file.name}</p>
            <Icon name='filexicon_gray' size={20} onClick={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingFileArea;
