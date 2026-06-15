import { ApiResponse } from "../../utils/types/app.response.type";

// export interface CreateBlogDto {
//   title: string;
//   content: string;

//   images: {
//     url: string;
//     cloudinaryId: string;
//   }[];
// }

// export interface UpdateBlogDto {
//   title?: string;
//   content?: string;

//   images?: {
//     url: string;
//     cloudinaryId: string;
//   }[];
// }

export interface BlogResponse {
  id: string;
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

export type BlogCreateResponse = ApiResponse<BlogResponse>;
export type BlogGetResponse = ApiResponse<BlogResponse>;
export type BlogListResponse = ApiResponse<BlogResponse[]>;
