import apiClient from './apiClient';

interface ChatSettingData {
  new_topic_question: boolean;
  include_academic_info: boolean;
  allow_response: boolean;
}

interface ChatSettingResponse {
  status: string;
  data: ChatSettingData;
}

export const getChatSettings = async (): Promise<ChatSettingData> => {
  const res = await apiClient.get<ChatSettingResponse>(
    '/chatbot/chat-settings'
  );
  return res.data.data;
};
