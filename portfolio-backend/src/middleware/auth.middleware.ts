import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jose";
import { unauthorized } from "../utils/types/app.error";
import { catchAsync } from "../utils/async.handler";
import { ENV } from "../config/global.config";

export const authMiddleware = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    // 1. Get token from cookies
    console.log("authMiddleware called");
    const token = req.cookies?.accessToken;

    if (!token) {
      throw unauthorized("You are not logged in");
    }

    if (!ENV.JWT_SECRET) {
      throw unauthorized("JWT secret is not configured");
    }

    const { payload } = await verifyAccessToken(token, ENV.JWT_SECRET);

    req.user = payload;
    console.log(req.user);

    next();
  },
);
