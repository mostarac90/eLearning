// The logged-in user attached to req.user.
// - authMiddleware sets it from the JWT
// - the Google strategy in config/passport.ts sets it after sign-in
// Passport already declares `req.user?: Express.User`, so we extend that
// interface instead of redeclaring req.user (which would conflict).
declare global {
    namespace Express {
        interface User {
            id: string;
        }
    }
}

export {};
