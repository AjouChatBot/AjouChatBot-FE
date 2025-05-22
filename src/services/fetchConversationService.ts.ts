import apiClient from './apiClient';

export const fetchConversation = async (conversationId: string, token: string) => {
    return await apiClient.get(`/chatbot/conversations/${conversationId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
