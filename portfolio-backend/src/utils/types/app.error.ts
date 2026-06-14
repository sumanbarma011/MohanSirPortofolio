export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: string[];

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: string[],
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (
  message: string,
  statusCode: number,
  code: string,
  details?: any,
): AppError => {
  return new AppError(message, statusCode, code, details);
};

export const notFound = (resource: string): AppError => {
  return new AppError(`${resource} not found`, 404, "NOT_FOUND");
};

export const unauthorized = (msg?: string): AppError => {
  return new AppError(msg || "Unauthorized", 401, "UNAUTHORIZED");
};

export const forbidden = (msg?: string): AppError => {
  return new AppError(msg || "Forbidden", 403, "FORBIDDEN");
};

export const badRequest = (msg: string, details?: any): AppError => {
  return new AppError(msg, 400, "BAD_REQUEST", details);
};

export const conflict = (msg: string): AppError => {
  return new AppError(msg, 409, "CONFLICT");
};

export const internalError = (msg?: string): AppError => {
  return new AppError(msg || "Internal server error", 500, "INTERNAL_ERROR");
};

export const serviceUnavailable = (msg?: string, details?: any): AppError => {
  return new AppError(
    msg || "Service is temporarily unavailable. Please try again in a moment.",
    503,
    "SERVICE_UNAVAILABLE",
    details,
  );
};

export const validationError = (msg: string, details?: any): AppError => {
  return new AppError(msg, 422, "VALIDATION_ERROR", details);
};
