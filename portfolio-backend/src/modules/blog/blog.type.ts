// types/blogPosts.ts
import { Document } from "mongoose";

// Post Status Enum
export enum POST_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

// Blog Post Interface
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  isFeatured: boolean;
  status: POST_STATUS;
  imageUrl?: string;
  views: number;
  publishedAt?: Date;
  pdfUrl?: string; // New PDF field
  fileType?: "image" | "pdf"; // File type indicator
  cloudinaryPublicId?: string; // Cloudinary ID
  createdAt: Date;
  updatedAt: Date;
}

// Input Types
export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags?: string[];
  isFeatured?: boolean;
  status?: POST_STATUS;
  imageUrl?: string;
}

export interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  isFeatured?: boolean;
  status?: POST_STATUS;
  imageUrl?: string;
}

export interface GetBlogPostsQueryInput {
  status?: POST_STATUS;
  isFeatured?: boolean;
  tag?: string;
  limit?: number;
  page?: number;
}
