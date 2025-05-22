export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  isUser?: boolean;
  status?: 'inputted' | 'pending' | 'error';
}

export interface ChatPayload {
  user_id: string;
  message: string;
}

export interface RecentTopic {
  question_id: number;
  question: string;
  created_at: string;
}

export interface ChatMessageAPIResponse {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}
