// types/blogPosts.ts
import { Document } from "mongoose";

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
  imageUrl?: string[]; // Array of image URLs
  views: number;
  publishedAt?: Date;
  cloudinaryPublicId?: string[]; // Array of Cloudinary IDs
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
  imageUrl?: string[]; // Array of URLs
}

export interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  isFeatured?: boolean;
  status?: POST_STATUS;
  imageUrl?: string[]; // Array of URLs
}

export interface GetBlogPostsQueryInput {
  status?: POST_STATUS;
  isFeatured?: boolean;
  tag?: string;
  limit?: number;
  page?: number;
}
