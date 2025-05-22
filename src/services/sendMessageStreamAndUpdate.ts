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
  const decoder = new TextDecoder();
  let buffer = '';
  let accumulated = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');  // ✅ const로 변경
    buffer = lines.pop()!; // 마지막 미완성 줄은 buffer에 보관

    for (const line of lines) {
      if (line.startsWith('data:')) {
        updateMessage(accumulated);
      }
    }

  }
finalize()};
