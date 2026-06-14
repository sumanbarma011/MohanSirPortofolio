import { Request, Response } from "express";
import { fileUploadSchema } from "./cloudinary.schema";
import { FileModel } from "./cloudinary.model";
import cloudinary from "../../config/cloudinary.config";
import fs from "fs";
import { catchAsync } from "../../utils/async.handler";
import { notFound } from "../../utils/types/app.error";
import { ApiResponse } from "../../utils/types/app.response.type";
import { cloudinaryResponse } from "./response.type";

export const uploadFilesController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate body
    const parsed = fileUploadSchema.parse(req.body);

    // 2. Normalize files (single, multiple, or fields)
    let files: Express.Multer.File[] = [];

    if (req.file) {
      files = [req.file]; // single → array
    } else if (Array.isArray(req.files) && req.files.length > 0) {
      files = req.files as Express.Multer.File[];
    } else if (req.files && typeof req.files === "object") {
      const filesObject = req.files as Record<string, Express.Multer.File[]>;
      files = Object.values(filesObject).flat();
    }

    if (files.length === 0) {
      throw notFound("No file(s) uploaded");
    }

    // 3. Upload all files (parallel )
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: parsed.folder || "uploads",
          resource_type: "auto",
        });

        // delete temp file
        await fs.promises.unlink(file.path);

        const fileDoc = await FileModel.create({
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          original_name: file.originalname,
        });

        return fileDoc.toObject();
      }),
    );

    const response: ApiResponse<cloudinaryResponse | cloudinaryResponse[]> = {
      success: true,
      message: "File(s) uploaded successfully",
      data: req.file
        ? {
            url: uploadedFiles[0].url,
            cloudinaryId: uploadedFiles[0].public_id,
          }
        : uploadedFiles.map((uploadFile) => ({
            url: uploadFile.url,
            cloudinaryId: uploadFile.public_id,
          })),
    };

    // 4. Response ( return)
    res.status(201).json(response);
  },
);
