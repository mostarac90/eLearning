import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid resource ID"
        });
    }

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

};