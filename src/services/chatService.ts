import { ChatPayload, StreamCallback } from '../types/chat';
import apiClient from './apiClient';

const API_URL = import.meta.env.VITE_APP_API_URL;

interface ChatbotSearchParams {
  query?: string;
  keywords?: string[];
  start_date?: string;
  end_date?: string;
}

export const searchChatbot = async ({
  query,
  keywords,
  start_date,
  end_date,
}: ChatbotSearchParams) => {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (keywords && keywords.length > 0) {
    params.append('keywords', keywords.join(','));
  }
  if (start_date) params.append('start_date', start_date);
  if (end_date) params.append('end_date', end_date);

  const response = await apiClient.get(`/chatbot/search?${params.toString()}`);
  return response.data;
};

export const sendMessageToChatbotStream = async (
  payload: ChatPayload,
  onMessage: StreamCallback
) => {
  const response = await fetch(`${API_URL}/chatbot/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;

    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      onMessage({ chunk, done: readerDone });
    } else {
      onMessage({ chunk: '', done: readerDone });
    }
  }
};

export const fetchConversation = async (
  conversationId: string,
  token: string
) => {
  const response = await apiClient.get(
    `/chatbot/conversations/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
