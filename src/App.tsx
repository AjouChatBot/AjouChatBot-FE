import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import SettingAccount from './pages/SettingAccount';
import SettingAcademic from './pages/SettingAcademic';
import SettingChat from './pages/SettingChat';
import MobileBoarding from './components/MobileBoarding';
import MobileLogin from './pages/MobileLogin';
import MobileHome from './pages/MobileHome';
import MobileChat from './pages/MobileChat';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isMobilePath = location.pathname.startsWith('/m');

  useEffect(() => {
    if (isMobilePath) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobilePath]);

  if (isMobilePath && isLoading) {
    return <MobileBoarding />;
  }

  return (
    <UserProvider>
      <ChatProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/m/login' element={<MobileLogin />} />

          {/* Protected Routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/chat'
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path='/setting/account'
            element={
              <ProtectedRoute>
                <SettingAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path='/setting/academic'
            element={
              <ProtectedRoute>
                <SettingAcademic />
              </ProtectedRoute>
            }
          />
          <Route
            path='/setting/chat'
            element={
              <ProtectedRoute>
                <SettingChat />
              </ProtectedRoute>
            }
          />

          {/* Mobile Protected Routes */}
          <Route
            path='/m/home'
            element={
              <ProtectedRoute>
                <MobileHome />
              </ProtectedRoute>
            }
          />
          <Route
            path='/m/chat'
            element={
              <ProtectedRoute>
                <MobileChat />
              </ProtectedRoute>
            }
          />
          <Route path='/m/*' element={<Navigate to='/m/home' replace />} />
        </Routes>
      </ChatProvider>
    </UserProvider>
  );
};

export default App;
