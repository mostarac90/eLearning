import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import { env } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import courseRoutes from "./routes/courseRoutes.js";
import passport from "./config/passport.js";

const app = express();

// Global middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: env.clientUrl,
    credentials: true
}));

app.use(passport.initialize());

// Authentication routes
app.use("/api/auth", authRoutes);

// API routes
app.use("/api/health", healthRoutes);

app.use("/api/courses", courseRoutes);

// Error handling (must be registered after routes)
app.use(errorHandler);

export default app;