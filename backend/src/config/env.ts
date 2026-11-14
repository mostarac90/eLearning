import "dotenv/config";

export const env = {
    port: Number(process.env.PORT ?? 3000),
    clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
    mongodbUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/easylearning"
};