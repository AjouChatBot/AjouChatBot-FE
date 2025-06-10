import apiClient from './apiClient';

export const deleteCustomUserData = async (): Promise<{
  status: string;
  message: string;
}> => {
  const response = await apiClient.delete('/account/info/delete');
  return response.data;
};

export const getUserDataCollectionSettings = async () => {
  try {
    const response = await apiClient.get('/account/info/track');
    return response.data.data.track_enabled;
  } catch (error) {
    console.error('Error fetching user data collection settings:', error);
    throw error;
  }
};

export const updateUserDataCollectionSettings = async (
  trackEnabled: boolean
): Promise<{
  status: string;
  message: string;
}> => {
  try {
    const response = await apiClient.patch('/account/info/track', {
      track_enabled: trackEnabled,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user data collection settings:', error);
    throw error;
  }
};
