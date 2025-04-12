import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { ChatProvider } from './contexts/ChatContext';

const App = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </ChatProvider>
  );
};

export default App;
