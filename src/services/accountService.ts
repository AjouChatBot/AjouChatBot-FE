import { AccountResponse } from '../types/account';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getAccountInfo = async (): Promise<AccountResponse> => {
  const response = await fetch(`${API_URL}/account/info`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch account info');
  }

  return response.json();
};
