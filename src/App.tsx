import React, { useState } from 'react';
import Options from './components/Input/Options';

const App = () => {
  // 상태 타입 지정
  type ToggleKeys = 'question' | 'academicInfo' | 'responseLog';

  const [toggleStates, setToggleStates] = useState<Record<ToggleKeys, boolean>>(
    {
      question: true,
      academicInfo: false,
      responseLog: true,
    }
  );

  // keyof를 사용하여 안전한 인덱싱
  const handleToggleChange = (key: ToggleKeys) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key], // 상태 반전
    }));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Options 테스트</h1>

      {/* Options 컴포넌트 렌더링 */}
      <Options
        toggleStates={toggleStates}
        onToggleChange={handleToggleChange}
      />

      {/* 현재 상태 표시 */}
      <div className='mt-6 p-4 bg-white rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold'>현재 토글 상태</h2>
        <pre className='text-sm text-gray-700'>
          {JSON.stringify(toggleStates, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default App;
