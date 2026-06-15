import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),
  content: z.string().min(10, "Content must be at least 10 characters"),

  images: z.array(
    z.object({
      url: z.url("Invalid URL format"),
      cloudinaryId: z.string().min(1, "Cloudinary ID is required"),
    }),
  ),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .trim()
    .optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .optional(),

  images: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format"),
        cloudinaryId: z.string().min(1, "Cloudinary ID is required"),
      }),
    )
    .min(0, "Images array is optional")
    .optional(),
});
