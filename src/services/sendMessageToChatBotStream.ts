export const sendMessageToChatbotStream = async (
  payload: { user_id: number; message: string },
  onMessage: (response: { chunk: string; done: boolean }) => void
) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/chatbot/message`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    }
  );

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
