import { z } from "zod";

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
      url: z.string().url(),
      cloudinaryId: z.string().min(1, "Cloudinary ID is required"),
    })
    .optional(),
});

export const updateCompanySchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .optional(),
  logo: z
    .object({
      url: z.string().url(),
      cloudinaryId: z.string().min(1),
    })
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateCompanyType = z.infer<typeof createCompanySchema>;
export type UpdateCompanyType = z.infer<typeof updateCompanySchema>;
