import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { getAccountInfo } from '../services/accountService';
import { logoutAPI } from '../services/authService';

interface UserContextType {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.warn('서버 로그아웃 실패', e);
    }

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    } else {
      getAccountInfo()
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error('유저 정보 로딩 실패:', err);
          logout();
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, accessToken, setUser, setAccessToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
