/// <reference types="vite/client" />
import axios, { AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const rawData = error.response?.data || null;

    if (!rawData) return Promise.reject(error);

    try {
      const responseData =
        typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

      if (typeof responseData !== 'object') {
        console.error('Parsed response is not a valid object:', responseData);
        return Promise.reject(error);
      }

      const { status, message } = responseData;
      console.error('Response Error: ', { status, message });
    } catch (parseError) {
      console.error('Failed to parse response data:', rawData);
      return Promise.reject(parseError);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
