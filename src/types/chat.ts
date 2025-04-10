export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export interface ChatPayload {
  user_id: number;
  message: string;
}

export interface StreamResponse {
  chunk: string;
  done: boolean;
}

export type StreamCallback = (response: StreamResponse) => void; 