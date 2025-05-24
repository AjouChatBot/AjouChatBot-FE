import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import SettingAccount from './pages/SettingAccount';
import SettingAcademic from './pages/SettingAcademic';
import SettingChat from './pages/SettingChat';

const App = () => {
  return (
    <UserProvider>
      <ChatProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setting/account' element={<SettingAccount />} />
          <Route path='/setting/academic' element={<SettingAcademic />} />
          <Route path='/setting/chat' element={<SettingChat />} />
        </Routes>
      </ChatProvider>
    </UserProvider>
  );
};

export default App;
