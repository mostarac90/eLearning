import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/authService.js";
import { generateToken } from "../utils/jwtUtils.js";
import { AppError, StatusCode } from "../utils/AppError.js";
import { env } from "../config/env.js";

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

// Shared by googleCallback and logout: a cookie is only cleared
// when it is cleared with the same options it was set with.
const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const
};

// 204 No Content - the Google sign-in cookie is removed
export function logout(_req: Request, res: Response) {
    res.clearCookie("token", authCookieOptions);
    res.status(StatusCode.NO_CONTENT).send();
}

export async function googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user;

        if (!user) {
            throw new AppError("Google authentication failed", StatusCode.UNAUTHORIZED);
        }

        const token = generateToken(user.id);

        // Set the JWT in a secure HTTP-only cookie.
        res.cookie("token", token, {
            ...authCookieOptions,
            maxAge: 1 * 60 * 60 * 1000 // 1 hour in milliseconds
        });

        //Redirect the user to the React frontend's authentication callback page.
       res.redirect(`${env.clientUrl}/auth/callback`);

    } catch (err) {
        next(err);
    }
}
