"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.handleHttp = exports.NotFoundError = exports.HttpError = void 0;
class HttpError extends Error {
    HttpError = 'HttpError';
    errorCode = 500;
    errorMessage = 'Internal server error';
}
exports.HttpError = HttpError;
;
class NotFoundError extends HttpError {
    NotFoundError = 'NotFoundError';
    errorCode = 404;
    errorMessage = 'Not found';
    constructor(message) {
        super(message);
        this.errorMessage = message;
    }
}
exports.NotFoundError = NotFoundError;
;
const handleHttp = (res, error) => {
    res.status(500);
    res.send({ error });
};
exports.handleHttp = handleHttp;
class BadRequestError extends HttpError {
    BadRequestError = 'BadRequestError';
    errorCode = 404;
    errorMessage = 'Bad request';
    constructor(message) {
        super(message);
        this.errorMessage = message;
    }
}
exports.BadRequestError = BadRequestError;
;
class UnauthorizedError extends HttpError {
    UnauthorizedError = 'UnauthorizedError';
    errorCode = 401;
    errorMessage = 'UnauthorizedError';
    constructor() {
        super('Authorization token is absent or invalid');
    }
}
exports.UnauthorizedError = UnauthorizedError;
;
class ForbiddenError extends HttpError {
    ForbiddenError = 'ForbiddenError';
    errorCode = 403;
    errorMessage = 'Forbidden';
}
exports.ForbiddenError = ForbiddenError;
;
