import { UserType } from "../auth/auth.types";

export type CloudinaryImage = {
  url: string;
  cloudinaryId: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: UserType;
  images: CloudinaryImage[];
  Slug: string;
  createdAt: string;
  updatedAt: string;
};
