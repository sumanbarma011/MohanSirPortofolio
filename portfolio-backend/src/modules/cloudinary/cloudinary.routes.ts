import { Router } from "express";
import { upload } from "../../config/multer";
import { uploadFilesController } from "./cloudinary.controller";
export const cloudinaryRouter = Router();

cloudinaryRouter.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 }, // single
    { name: "files", maxCount: 10 }, // multiple
  ]),
  uploadFilesController,
);
