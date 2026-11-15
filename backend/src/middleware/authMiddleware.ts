import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils.js";
import { AppError, StatusCode } from "../utils/AppError.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authorization header missing or malformed", StatusCode.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyToken(token);
        req.user = {
            id: payload.sub
        };
        next();
    } catch (err) {
        next(err);
    }
}