import apiClient from './apiClient';
import { LoginResponse, MeResponse } from '../types/user';

export const loginWithGoogle = async (
  credential: string
): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/auth/login', {
    credential,
  });
  return res.data;
};

export const getUserProfile = async (): Promise<MeResponse> => {
  const res = await apiClient.get<MeResponse>('/auth/me');
  return res.data;
};

export const logoutAPI = async (token: string) => {
  return await apiClient.post('/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
