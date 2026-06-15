import { Router } from "express";
import {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  getBlogBySlugController,
  updateBlogController,
  deleteBlogController,
} from "./blog.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export const blogRouter = Router();

// Create blog
blogRouter.post("/create", authMiddleware, createBlogController);

// Get all blogs
blogRouter.get("/getAll", getAllBlogsController);

// Get blog by ID
blogRouter.get("/get/:id", getBlogByIdController);

// Get blog by slug
blogRouter.get("/get/slug/:slug", getBlogBySlugController);

// Update blog
blogRouter.put("/updateBlogs/:id", authMiddleware, updateBlogController);

// Delete blog
blogRouter.delete("/delete/:id", authMiddleware, deleteBlogController);
