import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  images: {
    url: string;
    cloudinaryId: string;
  }[];
  Slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
        },
        cloudinaryId: {
          type: String,
          required: [true, "Cloudinary ID is required"],
        },
      },
    ],
    Slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel: Model<IBlog> = mongoose.model<IBlog>(
  "Blog",
  BlogSchema,
);
