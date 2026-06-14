// controllers/blogPosts.ts
import type { Request, Response } from "express";
import { BlogPost } from "./blog.model";
import { CreateBlogPostInput, POST_STATUS } from "./blog.type";

import { catchAsync } from "../../utils/async.handler";
import { internalError, notFound } from "../../utils/types/app.error";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../config/cloudinary.config";

// ==================== PUBLIC (Viewers) ====================

// Get All Published Posts (Public)
export const getAllPublishedPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const posts = await BlogPost.find({ status: POST_STATUS.PUBLISHED })
      .sort({ publishedAt: -1, views: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: posts,
    });
  },
);

// Get Single Published Post (Public)
export const getPublishedPostById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    if (post.status !== "PUBLISHED") {
      throw notFound("Not Found");
    }

    // Increment views
    post.views = post.views + 1;
    post.updatedAt = new Date(); // Manual update
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  },
);

// Get Featured Posts (Public)
export const getFeaturedPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const posts = await BlogPost.find({
      status: POST_STATUS.PUBLISHED,
      isFeatured: true,
    })
      .sort({ publishedAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: posts,
    });
  },
);

// ==================== ADMIN ONLY CRUD ====================

// Create Blog Post (Admin Only) - Manual slug generation
export const createBlogPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body || {};

    console.log(value);
    console.log(req.file);
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(
          req.file.path,
          "ca_portfolio/blog",
        );
        value.imageUrl = uploadResult.secure_url; // Set image URL
        value.cloudinaryPublicId = uploadResult.public_id; // Set Cloudinary ID
      } catch (uploadError) {
        throw internalError((uploadError as Error).message);
      }
    }

    const post = new BlogPost(value as CreateBlogPostInput);

    // Manually generate slug from title
    post.slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    post.createdAt = new Date();
    post.updatedAt = new Date(); // Manual update

    // Auto-set publishedAt if status is PUBLISHED
    if (post.status === "PUBLISHED") {
      post.publishedAt = new Date();
    }

    await post.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: post,
    });
  },
);

// Get All Posts (Admin Only)
export const getAllPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.query;

    // Build query with filtering
    const query: any = {};
    if (value.status) query.status = value.status;
    if (value.isFeatured) query.isFeatured = value.isFeatured;
    if (value.tag) query.tags = value.tag; // Filter by tag

    const posts = await BlogPost.find(query)
      .limit(Number(value.limit) || 20)
      .skip((Number(value.page || 1) - 1) * (Number(value.limit) || 20))
      .sort({ createdAt: -1 });

    const total = await BlogPost.countDocuments(query);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: value.page || 1,
        limit: value.limit || 20,
      },
    });
  },
);
// Get Single Post (Admin Only)
export const getPostById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  },
);

// Update Post (Admin Only) - Manual slug + updatedAt
export const updatePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body;

    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }
    if (req.file) {
      try {
        //  NEW: Delete old image from Cloudinary if exists
        if (post.cloudinaryPublicId) {
          await deleteFromCloudinary(post.cloudinaryPublicId);
        }

        const uploadResult = await uploadToCloudinary(
          req.file.path,
          "ca_portfolio/blog",
        );
        post.imageUrl = uploadResult.secure_url; // Update image URL
        post.cloudinaryPublicId = uploadResult.public_id; // Update Cloudinary ID
      } catch (uploadError) {
        throw internalError((uploadError as Error).message);
      }
    }
    // Update fields
    if (value.title !== undefined) post.title = value.title;
    if (value.content !== undefined) post.content = value.content;
    if (value.excerpt !== undefined) post.excerpt = value.excerpt;
    if (value.author !== undefined) post.author = value.author;
    if (value.tags !== undefined) post.tags = value.tags;
    if (value.isFeatured !== undefined) post.isFeatured = value.isFeatured;
    if (value.status !== undefined) post.status = value.status;
    if (value.imageUrl !== undefined) post.imageUrl = value.imageUrl;

    // Regenerate slug if title changed
    if (value.title !== undefined) {
      post.slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    post.updatedAt = new Date(); // Manual update

    // Auto-set publishedAt if changing to PUBLISHED
    if (post.status === "PUBLISHED" && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: post,
    });
  },
);

// Delete Post (Admin Only)
export const deletePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }
    if (post.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(post.cloudinaryPublicId);
      } catch (deleteError) {
        console.error(
          "Cloudinary deletion failed:",
          (deleteError as Error).message,
        );
      }
    }

    await BlogPost.deleteOne({ _id: post._id });

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  },
);

// Publish Post (Admin Only) - Manual updatedAt
export const publishPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    post.status = POST_STATUS.PUBLISHED;
    if (!post.publishedAt) {
      post.publishedAt = new Date();
    }
    post.updatedAt = new Date(); // Manual update
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post published successfully",
      data: post,
    });
  },
);

// Archive Post (Admin Only) - Manual updatedAt
export const archivePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    post.status = POST_STATUS.ARCHIVED;
    post.updatedAt = new Date(); // Manual update
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post archived successfully",
      data: post,
    });
  },
);
