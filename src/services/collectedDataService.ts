// services/collectedDataService.ts
import apiClient from './apiClient';

export const deleteCustomUserData = async (): Promise<{
  status: string;
  message: string;
}> => {
  const response = await apiClient.delete('/account/info/delete');
  return response.data;
};
