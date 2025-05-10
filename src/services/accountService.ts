import apiClient from './apiClient';
import { AccountResponse } from '../types/account';

export const getAccountInfo = async (): Promise<AccountResponse> => {
  const response = await apiClient.get<AccountResponse>('/account/info');
  return response.data;
};
