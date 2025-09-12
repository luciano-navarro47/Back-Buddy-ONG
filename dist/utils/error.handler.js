"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.HttpError = exports.handleHttpError = exports.getErrorMessage = void 0;
const getErrorMessage = (error) => {
    if (error instanceof NotFoundError)
        return "Wrong Email";
    if (error instanceof UnauthorizedError)
        return "Wrong password";
    return "Unexpected error when logging in";
};
exports.getErrorMessage = getErrorMessage;
const handleHttpError = (res, error) => {
    if (!res.headersSent) {
        if (error instanceof Error) {
            console.error("Error: ", error.message);
        }
        else {
            console.error("Unexpected error: ", error);
        }
        const statusCode = error?.statusCode || 500;
        const message = error instanceof Error ? error.message : "Internal server error";
        return res.status(statusCode).json({ error: message });
    }
};
exports.handleHttpError = handleHttpError;
class HttpError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
class NotFoundError extends HttpError {
    constructor(message = "Not found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends HttpError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends HttpError {
    constructor(message = "Authorization token is absent or invalid") {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends HttpError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
