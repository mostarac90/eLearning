import "dotenv/config";

export const env = {
    port: Number(process.env.PORT ?? 3000),
    clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
    mongodbUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/easylearning",
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL ?? "http://localhost:3000/api/auth/google/callback"
};