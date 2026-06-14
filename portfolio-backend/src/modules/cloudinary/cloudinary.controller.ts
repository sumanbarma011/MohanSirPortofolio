import { Request, Response } from "express";
import { fileUploadSchema } from "./cloudinary.schema";
import { FileModel } from "./cloudinary.model";
import cloudinary from "../../config/cloudinary.config";

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    // 1. Validate body
    const parsed = fileUploadSchema.parse(req.body);

    // 2. Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    // 3. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: parsed.folder || "uploads",
      resource_type: "auto", // supports image/pdf/video
    });

    // 4. Save in DB
    const fileDoc = await FileModel.create({
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes,
      original_name: req.file.originalname,
    });

    // 5. Response
    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: fileDoc,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Upload failed",
      errors: error?.errors || [error.message],
    });
  }
};
