import { useState, useEffect } from 'react';
import { getAccountInfo } from '../services/authService';
import { AccountInfo } from '../types/account';

export const useAccount = () => {
  const [userInfo, setUserInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await getAccountInfo();
        setUserInfo(response.data);
      } catch (error) {
        setError(error as Error);
        console.error('Failed to load user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  return { userInfo, isLoading, error };
};
