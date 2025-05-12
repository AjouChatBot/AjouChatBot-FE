import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { getAccountInfo } from '../services/accountService';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsedUser: User = JSON.parse(stored);
          setUser(parsedUser);
        } else {
          const response = await getAccountInfo(); // 서버에서 전체 유저 정보 가져옴
          localStorage.setItem('user', JSON.stringify(response.data));
          setUser(response.data);
        }
      } catch (err) {
        console.error('유저 정보 로딩 실패:', err);
        localStorage.removeItem('user');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
