import { ApiResponse } from "../../utils/types/app.response.type";

export interface CreateAreaOfWorkDto {
  title: string;
  description: string;
}

export interface UpdateAreaOfWorkDto {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export interface AreaOfWorkResponse {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AreaOfWorkCreateResponse = ApiResponse<AreaOfWorkResponse>;
export type AreaOfWorkGetResponse = ApiResponse<AreaOfWorkResponse>;
export type AreaOfWorkListResponse = ApiResponse<AreaOfWorkResponse[]>;
