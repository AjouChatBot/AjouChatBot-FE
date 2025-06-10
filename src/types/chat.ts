export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  isUser?: boolean;
  status?: 'inputted' | 'pending' | 'error';
  isNewTopic?: boolean;
}

export interface ChatPayload {
  user_id: string;
  message: string;
  is_new_topic?: boolean;
  category?: string;
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
