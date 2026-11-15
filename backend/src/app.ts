import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { env } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();

// Global middleware
app.use(express.json());

app.use(cors({
    origin: env.clientUrl
}));

// Authentication routes
app.use("/api/auth", authRoutes);

// API routes
app.use("/api/health", healthRoutes);

app.use("/api/courses", courseRoutes);

// Error handling (must be registered after routes)
app.use(errorHandler);

export default app;