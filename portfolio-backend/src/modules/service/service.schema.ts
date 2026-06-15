import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name cannot exceed 100 characters")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim(),
});

export const updateServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name cannot exceed 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateServiceType = z.infer<typeof createServiceSchema>;
export type UpdateServiceType = z.infer<typeof updateServiceSchema>;
