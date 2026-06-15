import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { globalErrorHandler } from "./middleware/global.error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { notFound } from "./middleware/notfound";
import cookieParser from "cookie-parser";
import skRouter from "./modules/skills&qualification/s&q.routes";
import contactRouter from "./modules/contactUsers/contact.routes";
import { blogRouter } from "./modules/blog/blog.routes";
import { cloudinaryRouter } from "./modules/cloudinary/cloudinary.routes";
import { serviceRouter } from "./modules/service/service.routes";
import { areaOfWorkRouter } from "./modules/aow/area.of.work.routes";
import { companyRouter } from "./modules/company/company.routes";
export const createApp = (): express.Express => {
  const app = express();

  const ensureDbConnected = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        success: false,
        message: "Database is not connected yet. Try again shortly.",
      });
      return;
    }
    next();
  };

  // ALLOW URLS "*" allows every frontend domains
  app.use(
    cors({
      origin: process.env.CORS_ORIGINS ?? "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  // ALLOW JSON AND FORM DATA
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(ensureDbConnected);

  app.get("/health", (_req, res) => {
    res.status(200).json({
      message: "Server is healthy",
    });
  });
  //routes
  app.use("/auth", authRouter);
  app.use("/sq", skRouter);
  app.use("/contact", contactRouter);
  app.use("/company", companyRouter);
  app.use("/blog", blogRouter);
  app.use("/aow", areaOfWorkRouter);
  app.use("/cloudinary", cloudinaryRouter);
  app.use("/service", serviceRouter);
  app.use(notFound);

  // GLOBAL ERROR MIDDLEWARE
  app.use(globalErrorHandler);
  return app;
};
