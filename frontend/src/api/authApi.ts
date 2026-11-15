import axios from "axios";
import axiosInstance, { API_BASE_URL } from "./axios";

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput extends LoginInput {
    name: string;
}

// Full-page redirect target: the backend sends the user to Google and back
export const GOOGLE_LOGIN_URL = `${API_BASE_URL}/auth/google`;

export const login = async (input: LoginInput): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/login", input);
    return response.data;
};

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/register", input);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
};

// Turns an API error into a message for the user
export function getAuthErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "Can't reach the server. Is the backend running?";
        }
        const message = (error.response.data as { message?: string } | undefined)?.message;
        if (message) {
            return message;
        }
    }
    return "Something went wrong. Please try again.";
}
