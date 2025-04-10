import React from 'react';

type TagProps = {
  tagtext: string;
};

const Tag: React.FC<TagProps> = ({ tagtext }) => {
  return (
    <div className='bg-white px-4 py-1 text-xs rounded-3xl border-[#EAEAEA] border'>
      {tagtext}
    </div>
  );
};

export default Tag;
