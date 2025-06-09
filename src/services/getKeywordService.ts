import apiClient from './apiClient';
import {AxiosError} from "axios";

interface GetKeywordRequest {
    text: string;
}

export interface GetKeywordResponse {
    keywords: string[];
    target: string;
    category: string;
}

export const getKeyword = async (
    requestData: GetKeywordRequest
): Promise<GetKeywordResponse> => {
    try {
        const response = await apiClient.post<GetKeywordResponse>(
            '/keyword',
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                const data = error.response.data as { message?: string };
                throw new Error(data.message ?? 'Bad Request');
            }
        }
        throw error;
    }
};

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}