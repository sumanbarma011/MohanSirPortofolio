import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { ApiDelete, ApiGet, ApiPost } from "@/providers/axiosInstance";
import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";

export const createCompanySchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim(),
  logo: z
    .object({
      url: z.string().url("Invalid image URL"),
      cloudinaryId: z.string().min(1, "Cloudinary ID is required"),
    })
    .optional()
    .nullable(),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;

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

export const createCompanyMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.company.create],
    mutationFn: (data: CreateCompanyType) =>
      ApiPost<CompanyResponse>(ApiPath.company.create, data),
  });

export const getAllCompaniesQueryOptions = queryOptions({
  queryKey: [queryKeys.company.getAll],
  queryFn: () => ApiGet<CompanyResponse[]>(ApiPath.company.getAll),
});

export const deleteCompanyMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.company.delete],

    mutationFn: (companyId: string) =>
      ApiDelete<void>(`${ApiPath.company.delete}${companyId}`),
  });
