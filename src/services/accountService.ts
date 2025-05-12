import { MeResponse } from '../types/user';
import apiClient from './apiClient';

export const getAccountInfo = async (): Promise<MeResponse> => {
  const res = await apiClient.get<MeResponse>('/account/info');
  return res.data;
};
