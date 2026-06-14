import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validaton failed",
        errors: result.error.issues.map((i) => i.message), // array of all invalid messages
      });
    }

    req.body = result.data as T;
    return next();
  };
