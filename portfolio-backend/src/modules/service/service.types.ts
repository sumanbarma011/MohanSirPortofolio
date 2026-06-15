import { ApiResponse } from "../../utils/types/app.response.type";

export interface CreateServiceDto {
  name: string;
  description: string;
}

export interface UpdateServiceDto {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceCreateResponse = ApiResponse<ServiceResponse>;
export type ServiceGetResponse = ApiResponse<ServiceResponse>;
export type ServiceListResponse = ApiResponse<ServiceResponse[]>;
