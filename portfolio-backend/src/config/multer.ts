// middleware/upload.ts
import multer from "multer";
import type { FileFilterCallback } from "multer";
import type { Request } from "express";
import path from "path";
import fs from "fs";

// Create uploads directory if not exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration (store locally first, then upload to Cloudinary)
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// File filter (images AND PDFs only)
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // Allowed image types
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;

  // Check extension and mimetype
  const extname = allowedImageTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const imageMimetype = allowedImageTypes.test(file.mimetype);

  // PDF type
  const pdfMimetype = file.mimetype === "application/pdf";
  const pdfExtname = path.extname(file.originalname).toLowerCase() === ".pdf";

  if ((extname && imageMimetype) || (pdfMimetype && pdfExtname)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only images (jpeg, jpg, png, gif, webp) and PDFs are allowed"),
    );
  }
};

// Multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max (increased for PDFs)
  },
});
