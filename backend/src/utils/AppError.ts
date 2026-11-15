export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.name = "AppError";

        Error.captureStackTrace(this, this.constructor);
    }
}

export enum StatusCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}