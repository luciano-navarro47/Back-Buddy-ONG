import { Response } from "express";

export const handleHttpError = (res: Response, error: string, status = 500) => {
  if (!res.headersSent) {
    res.status(status).send({ error });
  }
};

export class HttpError extends Error {
  HttpError = "HttpError";
  errorCode = 500;
  errorMessage = "Internal server error";
}

export class NotFoundError extends HttpError {
  NotFoundError = "NotFoundError";
  errorCode = 404;
  errorMessage = "Not found";

  constructor(message: string) {
    super(message);
    this.errorMessage = message;
  }
}

export class BadRequestError extends HttpError {
  BadRequestError = "BadRequestError";
  errorCode = 404;
  errorMessage = "Bad request";

  constructor(message: string) {
    super(message);
    this.errorMessage = message;
  }
}

export class UnauthorizedError extends HttpError {
  UnauthorizedError = "UnauthorizedError";
  errorCode = 401;
  errorMessage = "UnauthorizedError";

  constructor() {
    super("Authorization token is absent or invalid");
  }
}

export class ForbiddenError extends HttpError {
  ForbiddenError = "ForbiddenError";
  errorCode = 403;
  errorMessage = "Forbidden";
}
