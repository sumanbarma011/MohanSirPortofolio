import bcrypt from "bcrypt";
import { catchAsync } from "../../utils/async.handler";
import { Request, Response } from "express";
import Admin from "./auth.model";
import { ApiResponse } from "../../utils/types/app.response.type";
import { changePasswordType, loginType } from "./auth.schema";
import {
  unauthorized,
  notFound,
  internalError,
  badRequest,
} from "../../utils/types/app.error";
import { generateTokenPair } from "../../utils/jose";
import { ENV } from "../../config/global.config";
import { AdminWithoutPassword, UpdateAdmin } from "./auth.types";
import { verifyRefreshToken, generateAccessToken } from "../../utils/jose";

export class AuthController {
  static login = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      console.log("===============");
      const admin = req.body as loginType;
      const existAdmin = await Admin.findOne({
        email: admin.email,
      }).select("+hashedPassword");
      console.log("================");
      console.log("admin", admin);
      console.log("existAdmin", existAdmin);
      if (!existAdmin || !existAdmin.hashedPassword) {
        throw unauthorized("Invalid credentials");
      }
      console.log("existAdmin", existAdmin);
      const passwordMatches = await bcrypt.compare(
        admin.password,
        existAdmin.hashedPassword,
      );
      console.log(passwordMatches);
      if (!passwordMatches) {
        throw unauthorized("Invalid credentials");
      }

      existAdmin.lastLogin = new Date();
      await existAdmin.save();

      const jwtSecret = ENV.JWT_SECRET;
      if (!jwtSecret) {
        throw internalError("JWT secret is not configured");
      }

      const { accessToken, refreshToken } = await generateTokenPair(
        {
          id: existAdmin._id.toString(),
          email: existAdmin.email,
          role: existAdmin.role,
        },
        jwtSecret,
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      });
      const { hashedPassword, ...adminData } = existAdmin.toObject();

      const response: ApiResponse<AdminWithoutPassword & { token: string }> = {
        success: true,
        message: "Logged in successfully",
        data: { ...adminData, token: accessToken },
      };
      res.status(200).json(response);
    },
  );
  static updateAuth = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body as UpdateAdmin;
    const validatedBody = body;
    const updateData = await Admin.findByIdAndUpdate(id, validatedBody, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      throw notFound("Admin not found");
    }

    const { hashedPassword, ...adminData } = updateData.toObject();

    const response: ApiResponse<AdminWithoutPassword> = {
      success: true,
      message: "Admin updated successfully",
      data: adminData,
    };
    res.status(200).json(response);
  });
  //LogOut ADMIN

  static logout = catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    },
  );
  static getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw badRequest("No refresh token provided");
    }

    if (!ENV.JWT_SECRET) {
      throw internalError("JWT secret is not configured");
    }

    const { payload } = await verifyRefreshToken(refreshToken, ENV.JWT_SECRET);
    console.log("refresh payload", payload);

    const accessToken = await generateAccessToken(payload, ENV.JWT_SECRET);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });
    const response: ApiResponse<{ accessToken: string }> = {
      success: true,
      message: "Access token refreshed successfully",
      data: { accessToken },
    };
    res.status(200).json(response);
  });

  static changePassword = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { currentPassword, newPassword } = req.body as changePasswordType;
      const userId = req.user.id; // From auth middleware

      // Find admin
      const admin = await Admin.findById(userId);
      if (!admin) {
        throw notFound("Admin Id not found");
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        admin.hashedPassword,
      );
      if (!isPasswordValid) {
        throw unauthorized("Password not matched");
      }

      // Update password (will be hashed by pre('save') hook)
      admin.hashedPassword = newPassword;
      await admin.save();

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    },
  );
  static me = catchAsync(
    async (req: Request, res: Response<ApiResponse<AdminWithoutPassword>>) => {
      const { id } = req.user;
      const user = await Admin.findById({ _id: id }).lean();
      if (!user) {
        throw notFound("Admin not found");
      }
      res.status(200).json({
        success: true,
        message: "User Details loaded successfully",
        data: user,
      });
    },
  );
}
