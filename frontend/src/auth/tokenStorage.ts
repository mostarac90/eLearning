// Stores the JWT from email/password login and registration.
// (Google sign-in uses an httpOnly cookie set by the backend instead.)
const TOKEN_KEY = "easylearning.token";

export function getToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

export function setToken(token: string): void {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch {
        // Storage unavailable (e.g. private mode): the user stays logged in until reload
    }
}

export function clearToken(): void {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch {
        // Ignore
    }
}
