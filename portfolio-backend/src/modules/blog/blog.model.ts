// models/blogPosts.ts
import mongoose, { Schema, Model } from "mongoose";
import { IBlogPost, POST_STATUS } from "./blog.type";

const blogPostSchema: Schema<IBlogPost> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 100,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 500,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  tags: {
    type: [String],
    default: [],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(POST_STATUS),
    default: POST_STATUS.DRAFT,
  },
  imageUrl: {
    type: String,
    required: false,
    maxlength: 500,
  },
  cloudinaryPublicId: {
    type: String,
    required: false,
    maxlength: 500,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  publishedAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Removed pre('save') hook - handle slug and updatedAt manually in controllers

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  blogPostSchema,
);

export { BlogPost };
