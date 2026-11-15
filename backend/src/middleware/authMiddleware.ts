import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils.js";
import { AppError, StatusCode } from "../utils/AppError.js";


function getTokenFromRequest(req: Request): string | undefined {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const bearerToken = authHeader.slice("Bearer ".length).trim();
        if (bearerToken) {
            return bearerToken;
        }
    }

    const cookieToken: unknown = req.cookies?.token;
    if (typeof cookieToken === "string" && cookieToken.length > 0) {
        return cookieToken;
    }

    return undefined;
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const token = getTokenFromRequest(req);

    if (!token) {
        return next(new AppError("Authentication required", StatusCode.UNAUTHORIZED));
    }

    try {
        // verifyToken throws AppError 401 for an invalid or expired token
        const payload = verifyToken(token);

        req.user = { id: payload.sub };
        next();
    } catch (err) {
        next(err);
    }
}
