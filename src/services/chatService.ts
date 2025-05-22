import { ChatPayload } from '../types/chat';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const sendMessageStreamAndUpdate = async (
  payload: ChatPayload,
  token: string,
  updateMessage: (updatedMessage: string) => void,
  finalize: () => void
) => {
  const response = await fetch(`${API_URL}/chatbot/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const content = line.slice(5);
            if (content) {
              updateMessage(content);
              await new Promise((resolve) => setTimeout(resolve, 10));
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
    finalize();
  }
};

export const searchChatbotStreamAndUpdate = async (
  params: {
    query?: string;
    keywords?: string[];
    start_date?: string;
    end_date?: string;
  },
  token: string,
  updateMessage: (msg: string) => void,
  finalize: () => void
) => {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.append('query', params.query);
  if (params.keywords)
    searchParams.append('keywords', params.keywords.join(','));
  if (params.start_date) searchParams.append('start_date', params.start_date);
  if (params.end_date) searchParams.append('end_date', params.end_date);

  const response = await fetch(
    `${API_URL}/chatbot/search/stream?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const content = line.slice(5);
            if (content) {
              updateMessage(content);
              await new Promise((resolve) => setTimeout(resolve, 10));
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
    finalize();
  }
};
