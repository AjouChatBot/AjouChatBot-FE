import ChatInput from './components/Chat/ChatInput';

function App() {
  return (
    <div className='w-full bg-[slate-300] flex justify-center bg-blue-50'>
      <div className='w-full px-6 py-10 flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          📅 ChatInput 테스트
        </h1>

        {/* <ChatInput mode='home' /> */}
        <ChatInput mode='chat' />
      </div>
    </div>
  );
}

export default App;
