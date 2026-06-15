import { ApiResponse } from "../../utils/types/app.response.type";

export interface CreateCompanyDto {
  companyName: string;
  description: string;
  logo: {
    url: string;
    cloudinaryId: string;
  } | null;
}

export interface UpdateCompanyDto {
  companyName?: string;
  description?: string;
  logo?: {
    url: string;
    cloudinaryId: string;
  } | null;
  isActive?: boolean;
}

export interface CompanyResponse {
  id: string;
  companyName: string;
  description: string;
  logo: {
    url: string;
    cloudinaryId: string;
  } | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CompanyCreateResponse = ApiResponse<CompanyResponse>;
export type CompanyGetResponse = ApiResponse<CompanyResponse>;
export type CompanyListResponse = ApiResponse<CompanyResponse[]>;
