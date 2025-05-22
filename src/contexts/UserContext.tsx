import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
import { logoutAPI } from '../services/authService';

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
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(
      () => localStorage.getItem('access_token')
  );
  const logout = async (navigate?: (path: string) => void) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await logoutAPI(token); // 서버에 토큰 보냄
      }
    } catch (e) {
      console.warn('서버 로그아웃 실패', e);
    }

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');

    if(navigate) {
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
