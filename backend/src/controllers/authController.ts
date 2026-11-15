import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/authService.js";
import { generateToken } from "../utils/jwtUtils.js";
import { AppError, StatusCode } from "../utils/AppError.js";

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body ?? {};

        if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
            throw new AppError("Email and password are required", StatusCode.BAD_REQUEST);
        }

        const user = await loginUser(email, password);
        const token = generateToken(user._id.toString());

        res.status(StatusCode.OK).json({ user, token });
    } catch (err) {
        next(err);
    }
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body ?? {};

        if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
            throw new AppError("Name, email and password are required", StatusCode.BAD_REQUEST);
        }

        const user = await registerUser(name, email, password);
        const token = generateToken(user._id.toString());

        res.status(StatusCode.CREATED).json({ user, token });
    } catch (err) {
        next(err);
    }
}
