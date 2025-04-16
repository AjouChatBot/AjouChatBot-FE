import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { ChatProvider } from './contexts/ChatContext';
import Login from './pages/Login';

const App = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </ChatProvider>
  );
};

export default App;
