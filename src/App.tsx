import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import Setting from './pages/Setting';

const App = () => {
  return (
    <UserProvider>
      <ChatProvider>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
      </ChatProvider>
    </UserProvider>
  );
};

export default App;
