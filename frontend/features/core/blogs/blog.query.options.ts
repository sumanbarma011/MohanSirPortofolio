import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";
import { ApiDelete, ApiGet, ApiPost } from "@/providers/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { CreateBlogType } from "./blog.schema";
import { BlogPost, CloudinaryImage } from "./blog.types";
import { UserType } from "../auth/auth.types";

export const getAllBlogsQueryOptions = queryOptions({
  queryKey: [queryKeys.blog.read],
  queryFn: () => ApiGet<BlogPost[]>(ApiPath.blog.read),
});
export const getSpecificBlogsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [queryKeys.blog.readSpecific],
    queryFn: () => ApiGet<BlogPost>(`${ApiPath.blog.specificBlog}${id}`),
  });

export const createBlogMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.blog.create],
    mutationFn: (data: CreateBlogType) =>
      ApiPost<[BlogPost, UserType]>(ApiPath.blog.create, data),
  });

export const uploadImageMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.cloudinary.upload],
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "ca_portfolio/blog");
      return ApiPost<CloudinaryImage[]>(ApiPath.cloudinary.upload, formData);
    },
  });

export const deleteBlogMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.blog.delete],

    mutationFn: (blogId: string) =>
      ApiDelete<void>(`${ApiPath.blog.delete}${blogId}`),
  });
