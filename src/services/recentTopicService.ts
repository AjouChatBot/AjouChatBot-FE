import { RecentTopic } from '../types/chat';
import apiClient from './apiClient';

interface RecentTopicsResponse {
  status: string;
  data: RecentTopic[];
}

export const fetchRecentTopics = async (
  token: string
): Promise<RecentTopic[]> => {
  try {
    const response = await apiClient.get<RecentTopicsResponse>(
      '/chatbot/recent-topics',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch recent topics:', error);
    throw error;
  }
};
