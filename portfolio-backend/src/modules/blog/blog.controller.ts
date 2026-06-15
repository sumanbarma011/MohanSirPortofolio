import { Request, Response } from "express";
import { createBlogSchema, updateBlogSchema } from "./blog.schema";
import { BlogModel } from "./blog.model";
import { catchAsync } from "../../utils/async.handler";
import { notFound } from "../../utils/types/app.error";
import { ApiResponse } from "../../utils/types/app.response.type";
import { BlogResponse, BlogGetResponse, BlogListResponse } from "./blog.type";

// Helper to convert blog to response
const blogToResponse = (blog: any): BlogResponse => {
  return {
    id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    author: blog.author,
    images: blog.images.map((img: any) => ({
      url: img.url,
      cloudinaryId: img.cloudinaryId,
    })),
    Slug: blog.Slug,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

export const createBlogController = catchAsync(
  async (req: Request, res: Response) => {
    console.log("------------");
    // 1. Validate body
    const parsed = createBlogSchema.parse(req.body);
    const adminId = req.user.id;
    // 2. Create blog
    const blog = await BlogModel.create({ ...parsed, author: adminId });
    const populatedBlog = await BlogModel.findById(blog._id).populate("author");

    // 3. Response
    const response: BlogGetResponse = {
      success: true,
      message: "Blog created successfully",
      data: blogToResponse(populatedBlog),
    };

    res.status(201).json(response);
  },
);

export const getAllBlogsController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch all blogs
    const blogs = await BlogModel.find()
      .populate("author") // ← Add this
      .sort({ createdAt: -1 });

    // 2. Response
    const response: BlogListResponse = {
      success: true,
      message: "Blogs retrieved successfully",
      data: blogs.map(blogToResponse),
    };

    res.status(200).json(response);
  },
);

export const getBlogByIdController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find blog
    const blog = await BlogModel.findById(id).populate("author"); // ← Add this

    if (!blog) {
      throw notFound("Blog not found");
    }

    // 3. Response
    const response: BlogGetResponse = {
      success: true,
      message: "Blog retrieved successfully",
      data: blogToResponse(blog),
    };

    res.status(200).json(response);
  },
);

export const getBlogBySlugController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate slug
    const { slug } = req.params;

    // 2. Find blog
    const blog = await BlogModel.findOne({ Slug: slug }).populate("author");

    if (!blog) {
      throw notFound("Blog not found");
    }

    // 3. Response
    const response: BlogGetResponse = {
      success: true,
      message: "Blog retrieved successfully",
      data: blogToResponse(blog),
    };

    res.status(200).json(response);
  },
);

export const updateBlogController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID and body
    const { id } = req.params;
    const parsed = updateBlogSchema.parse(req.body);

    // 2. Find and update blog
    const blog = await BlogModel.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    }).populate("author");

    if (!blog) {
      throw notFound("Blog not found");
    }

    // 3. Response
    const response: BlogGetResponse = {
      success: true,
      message: "Blog updated successfully",
      data: blogToResponse(blog),
    };

    res.status(200).json(response);
  },
);

export const deleteBlogController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find and delete blog
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      throw notFound("Blog not found");
    }

    // 3. Response
    const response: ApiResponse<void> = {
      success: true,
      message: "Blog deleted successfully",
      data: undefined,
    };

    res.status(200).json(response);
  },
);
