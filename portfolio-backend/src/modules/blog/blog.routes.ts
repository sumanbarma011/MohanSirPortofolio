// routes/blogPosts.ts
import express from "express";
import {
  getAllPublishedPosts,
  getPublishedPostById,
  getFeaturedPosts,
  createBlogPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  publishPost,
  archivePost,
} from "./blog.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/zod.validate";
import {
  createBlogPostSchema,
  getBlogPostsQuerySchema,
  updateBlogPostSchema,
} from "./blog.schema";
import { upload } from "../../config/multer";

const blogRouter = express.Router();

// PUBLIC ROUTES (Viewers - No Auth Required)
blogRouter.get("/published", getAllPublishedPosts); // --done
blogRouter.get("/published/featured", getFeaturedPosts); // --done
blogRouter.get("/published/:id", getPublishedPostById); // --done

// ADMIN ROUTES (Auth Required)
blogRouter.post(
  "/",
  authMiddleware,
  validate(createBlogPostSchema),
  createBlogPost,
); //------ done
blogRouter.get(
  "/",
  authMiddleware,
  validate(getBlogPostsQuerySchema),
  getAllPosts,
); // ---done
blogRouter.get("/:id", authMiddleware, getPostById);
blogRouter.put(
  "/:id",
  authMiddleware,
  validate(updateBlogPostSchema),
  upload.single("image"),
  updatePost,
); // --- done
blogRouter.delete("/:id", authMiddleware, deletePost); //--- done
blogRouter.post("/:id/publish", authMiddleware, publishPost); // --done
blogRouter.post("/:id/archive", authMiddleware, archivePost); // -- done

export default blogRouter;
