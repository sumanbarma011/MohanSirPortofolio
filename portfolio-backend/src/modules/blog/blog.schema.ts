// schemas/blogPosts.ts
import zod from "zod";
import { POST_STATUS } from "./blog.type";

// Infer TypeScript types from Zod schemas
export type CreateBlogPostSchema = zod.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostSchema = zod.infer<typeof updateBlogPostSchema>;
export type GetBlogPostsQuerySchema = zod.infer<typeof getBlogPostsQuerySchema>;

// Create Blog Post Schema (Admin Only)
export const createBlogPostSchema = zod.object({
  title: zod
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),

  content: zod.string().min(100, "Content must be at least 100 characters"),

  excerpt: zod
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(500, "Excerpt must be at most 500 characters"),

  author: zod
    .string()
    .min(1, "Author is required")
    .max(100, "Author must be at most 100 characters"),

  tags: zod.array(zod.string().max(50)).optional().default([]),

  isFeatured: zod.boolean().optional().default(false),

  status: zod.enum(POST_STATUS).optional().default(POST_STATUS.DRAFT),

  imageUrl: zod.string().max(500).optional(),
  cloudinaryPublicId: zod.string().max(500).optional(),
});

// Update Blog Post Schema (Admin Only)
export const updateBlogPostSchema = zod.object({
  title: zod.string().min(5).max(200).optional(),
  content: zod.string().min(100).optional(),
  excerpt: zod.string().min(20).max(500).optional(),
  author: zod.string().min(1).max(100).optional(),
  tags: zod.array(zod.string().max(50)).optional(),
  isFeatured: zod.boolean().optional(),
  status: zod.enum(POST_STATUS).optional(),
  imageUrl: zod.string().max(500).optional(),
});

// Get Blog Posts Query Schema (Filtering)
export const getBlogPostsQuerySchema = zod.object({
  status: zod.enum(POST_STATUS).optional(),
  isFeatured: zod.boolean().optional(),
  tag: zod.string().max(50).optional(),
  limit: zod.number().int().positive().max(100).optional().default(20),
  page: zod.number().int().positive().optional().default(1),
});
