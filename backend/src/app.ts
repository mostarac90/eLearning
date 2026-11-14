import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Global middleware
app.use(express.json());

app.use(cors({
    origin: env.clientUrl
}));

// API routes
app.use("/api/health", healthRoutes);

// Error handling (must be registered after routes)
app.use(errorHandler);

export default app;