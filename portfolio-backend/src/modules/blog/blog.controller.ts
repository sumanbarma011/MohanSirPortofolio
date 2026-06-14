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

export const getAllPublishedPosts = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const posts = await BlogPost.find({ status: POST_STATUS.PUBLISHED })
      .sort({ publishedAt: -1, views: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: posts,
    });
  },
);

export const getPublishedPostById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    if (post.status !== "PUBLISHED") {
      throw notFound("Not Found");
    }

    post.views = post.views + 1;
    post.updatedAt = new Date();
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  },
);

export const getFeaturedPosts = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
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

// Create Blog Post (Admin Only) - Handle images array OR single file
export const createBlogPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const bodyData = req.body || {};

    const imageUrlArray: string[] = [];
    const cloudinaryIdArray: string[] = [];

    // ✅ Handle images array from frontend
    if (
      bodyData.images &&
      Array.isArray(bodyData.images) &&
      bodyData.images.length > 0
    ) {
      for (const image of bodyData.images) {
        imageUrlArray.push(image.url);
        cloudinaryIdArray.push(image.cloudinaryId);
      }
      bodyData.imageUrl = imageUrlArray;
    }

    // ✅ OR handle single file upload via Multer
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(
          req.file.path,
          "ca_portfolio/blog",
        );
        bodyData.imageUrl = [uploadResult.secure_url]; // Array with 1 image
        bodyData.cloudinaryPublicId = [uploadResult.public_id]; // Array with 1 ID
      } catch (uploadError) {
        throw internalError((uploadError as Error).message);
      }
    }

    const post = new BlogPost(bodyData as CreateBlogPostInput);

    post.slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    post.createdAt = new Date();
    post.updatedAt = new Date();

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

export const getAllPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.query;

    const query: any = {};
    if (value.status) query.status = value.status;
    if (value.isFeatured) query.isFeatured = value.isFeatured;
    if (value.tag) query.tags = value.tag;

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

// Update Post (Admin Only) - Handle images array OR single file
export const updatePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const bodyData = req.body || {};

    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    // ✅ Handle images array from frontend
    if (
      bodyData.images &&
      Array.isArray(bodyData.images) &&
      bodyData.images.length > 0
    ) {
      try {
        // Delete old images from Cloudinary
        if (post.cloudinaryPublicId && Array.isArray(post.cloudinaryPublicId)) {
          for (const publicId of post.cloudinaryPublicId) {
            await deleteFromCloudinary(publicId);
          }
        }

        // Set new images
        const imageUrlArray: string[] = [];
        const cloudinaryIdArray: string[] = [];

        for (const image of bodyData.images) {
          imageUrlArray.push(image.url);
          cloudinaryIdArray.push(image.cloudinaryId);
        }

        post.imageUrl = imageUrlArray;
        post.cloudinaryPublicId = cloudinaryIdArray;
      } catch (uploadError) {
        throw internalError((uploadError as Error).message);
      }
    }

    // ✅ OR handle single file upload via Multer
    if (req.file) {
      try {
        // Delete old images
        if (post.cloudinaryPublicId && Array.isArray(post.cloudinaryPublicId)) {
          for (const publicId of post.cloudinaryPublicId) {
            await deleteFromCloudinary(publicId);
          }
        }

        const uploadResult = await uploadToCloudinary(
          req.file.path,
          "ca_portfolio/blog",
        );
        post.imageUrl = [uploadResult.secure_url]; // Array with 1 image
        post.cloudinaryPublicId = [uploadResult.public_id]; // Array with 1 ID
      } catch (uploadError) {
        throw internalError((uploadError as Error).message);
      }
    }

    if (bodyData.title !== undefined) post.title = bodyData.title;
    if (bodyData.content !== undefined) post.content = bodyData.content;
    if (bodyData.excerpt !== undefined) post.excerpt = bodyData.excerpt;
    if (bodyData.author !== undefined) post.author = bodyData.author;
    if (bodyData.tags !== undefined) post.tags = bodyData.tags;
    if (bodyData.isFeatured !== undefined)
      post.isFeatured = bodyData.isFeatured;
    if (bodyData.status !== undefined) post.status = bodyData.status;

    if (bodyData.title !== undefined) {
      post.slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    post.updatedAt = new Date();

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

export const deletePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    // Delete all images from Cloudinary
    if (post.cloudinaryPublicId && Array.isArray(post.cloudinaryPublicId)) {
      for (const publicId of post.cloudinaryPublicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (deleteError) {
          console.error(
            "Cloudinary deletion failed:",
            (deleteError as Error).message,
          );
        }
      }
    }

    await BlogPost.deleteOne({ _id: post._id });

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  },
);

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
    post.updatedAt = new Date();
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post published successfully",
      data: post,
    });
  },
);

export const archivePost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw notFound("Blog post");
    }

    post.status = POST_STATUS.ARCHIVED;
    post.updatedAt = new Date();
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post archived successfully",
      data: post,
    });
  },
);
