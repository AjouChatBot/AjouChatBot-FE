import apiClient from './apiClient';

interface ChatSettingPayload {
  new_topic_question: boolean;
  include_academic_info: boolean;
  allow_response: boolean;
}

interface ChatSettingResponse {
  status: string;
  message: string;
}

export const updateChatSettings = async (
  payload: ChatSettingPayload
): Promise<ChatSettingResponse> => {
  const res = await apiClient.patch<ChatSettingResponse>(
    '/chatbot/chat-settings',
    payload
  );
  return res.data;
};
