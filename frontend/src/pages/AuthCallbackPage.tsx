import { Navigate } from "react-router-dom";

// The backend redirects here after a successful Google sign-in.
// It has already set the httpOnly "token" cookie, so there is nothing to
// store on this side: go straight to the dashboard.
export default function AuthCallbackPage() {
    return <Navigate to="/" replace />;
}
