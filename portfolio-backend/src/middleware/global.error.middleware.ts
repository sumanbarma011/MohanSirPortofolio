import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/types/app.error";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.error("ERROR :", err); // log for debugging

    // Check if response headers already sent (prevents double response)
    if (res.headersSent) {
      return next(err);
    }

    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errors: string[] = err.errors || [];
    let code = err.code || "INTERNAL_ERROR";

    // Handle Zod validation error
    if (err.name === "ZodError") {
      statusCode = 400;
      message = "Validation failed";
      code = "VALIDATION_ERROR";
      errors = err.errors.map((e: any) => e.message);
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
      statusCode = 409;
      code = "DUPLICATE_ERROR";
      message = "Duplicate field value";
      errors = Object.values(err.keyValue);
    }

    // Handle Mongoose not connected error
    if (err.name === "MongoNotConnectedError") {
      statusCode = 503;
      message = "Database is not connected";
      code = "DATABASE_NOT_CONNECTED";
      errors = [err.message];
    }

    // Handle Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID";
      code = "INVALID_ID";
      errors = [err.value];
    }

    // Handle expired or invalid JWT errors from jose
    if (err.code === "ERR_JWT_EXPIRED" || err.name === "JWTExpired") {
      statusCode = 401;
      message = "JWT expired";
      code = "JWT_EXPIRED";
      errors = [];
    }

    // Operational error (AppError)
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        code: err.code,
        message: err.message,
        errors: err.details,
      });
    }

    //  Unknown / programming error
    return res.status(statusCode).json({
      success: false,
      message,
      code,
      errors,
    });
  } catch (handlerError) {
    console.error("ERROR HANDLER CRASHED:", handlerError);
    // Prevent infinite loop by checking headersSent
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        code: "INTERNAL_ERROR",
        errors: [],
      });
    }
  }
};
