import axios from "axios";
import { clearToken, getToken } from "../auth/tokenStorage";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    // Sends the httpOnly "token" cookie set by Google sign-in
    withCredentials: true
});

// Attach the JWT from email/password login to every request
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// A 401 from a protected endpoint means the session is missing or expired:
// forget the token and send the user to the login page.
// Login/register 401s (e.g. wrong password) are left for the login form to show.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest = error.config?.url?.startsWith("/auth/");

        if (error.response?.status === 401 && !isAuthRequest) {
            clearToken();
            if (window.location.pathname !== "/login") {
                window.location.assign("/login");
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
