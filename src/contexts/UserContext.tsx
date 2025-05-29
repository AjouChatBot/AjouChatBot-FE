import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { logoutAPI } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: (navigate?: (path: string) => void) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  accessToken: null,
  setUser: () => {},
  setAccessToken: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('access_token')
  );

  // 토큰 만료 체크 함수
  const checkTokenExpiration = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // 토큰이 만료되었거나 만료 1분 전인 경우
      if (!decoded.exp || decoded.exp <= currentTime) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token decode error:', error);
      return true;
    }
  };

  // 초기 로드 시 토큰 체크
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && checkTokenExpiration(token)) {
      logout(navigate);
    }
  }, []);

  // 세션 체크 및 자동 로그아웃
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('access_token');
      if (token && checkTokenExpiration(token)) {
        logout(navigate);
      }
    };

    // 1분마다 세션 체크
    const intervalId = setInterval(checkSession, 60000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, [navigate]);

  const logout = async (navigate?: (path: string) => void) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await logoutAPI(token);
      }
    } catch (e) {
      console.warn('서버 로그아웃 실패', e);
    }

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (navigate) {
      navigate('/login');
    }
  };

  return (
    <UserContext.Provider
      value={{ user, accessToken, setUser, setAccessToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
