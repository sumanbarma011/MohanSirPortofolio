// utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary (images + PDFs)
export const uploadToCloudinary = async (
  filePath: string,
  folder: string = "ca_portfolio",
): Promise<UploadApiResponse> => {
  try {
    // Detect if file is PDF
    const isPdf = path.extname(filePath).toLowerCase() === ".pdf";

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: isPdf ? "raw" : "auto", // PDF = raw, images = auto
      transformation: [
        { quality: "auto:best" },
        ...(isPdf ? [] : [{ fetch_format: "auto" }]), // No fetch_format for PDFs
      ],
    });

    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${(error as Error).message}`);
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${(error as Error).message}`);
  }
};

// Get Cloudinary URL (handle PDFs)
export const getCloudinaryUrl = (
  publicId: string,
  resourceType: string = "auto",
): string => {
  return cloudinary.url(publicId, {
    resource_type: resourceType,
  });
};

export default cloudinary;
