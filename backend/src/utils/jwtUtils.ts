
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError, StatusCode } from "./AppError.js";

export function generateToken(userId: string): string {
    if (!env.jwtSecret) {
        throw new AppError("JWT_SECRET is not defined", StatusCode.INTERNAL_SERVER_ERROR);
    }

    return jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: "1h" });
}


export interface TokenPayload {
    sub: string;
}

export function verifyToken(token: string): TokenPayload {
    if (!env.jwtSecret) {
        throw new AppError("JWT_SECRET is not defined", StatusCode.INTERNAL_SERVER_ERROR);
    }

    let payload: string | jwt.JwtPayload;

    try {
        payload = jwt.verify(token, env.jwtSecret);
    } catch {
        throw new AppError("Invalid token", StatusCode.UNAUTHORIZED);
    }

    // jwt.verify can return a plain string; we only issue object payloads with a user id in "sub"
    if (typeof payload === "string" || typeof payload.sub !== "string") {
        throw new AppError("Invalid token", StatusCode.UNAUTHORIZED);
    }

    return { sub: payload.sub };
}