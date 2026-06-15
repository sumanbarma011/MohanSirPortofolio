import { z } from "zod";

export const createAreaOfWorkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim(),
});

export const updateAreaOfWorkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateAreaOfWorkType = z.infer<typeof createAreaOfWorkSchema>;
export type UpdateAreaOfWorkType = z.infer<typeof updateAreaOfWorkSchema>;
