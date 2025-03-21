import { Response } from "express";
import { stat } from "fs";

export const handleHttpError = (res: Response, error: unknown) => {
  if (!res.headersSent) {
    if(error instanceof Error){
      console.error("Error: ", error.message);
    } else {
      console.error("Unexpected error: ", error);
    }

    const statusCode = (error as any)?.statusCode || 500;
    const message = error instanceof Error ? error.message : "Internal server error";

    return res.status(statusCode).json({ error: message });
  }
};

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Authorization token is absent or invalid") {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden"){
    super(message, 403);
  }
}
