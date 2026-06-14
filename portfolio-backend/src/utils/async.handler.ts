import type { Request, Response, NextFunction } from "express";

// express does not support async by default
export function catchAsync(
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}
