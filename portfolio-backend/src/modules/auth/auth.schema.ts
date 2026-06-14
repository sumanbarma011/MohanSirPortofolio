import { z } from "zod";
import { ROLE } from "./auth.model";
export const createAdminSchema = z.object({
  email: z.email("Invalid email format"),
  hashedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .transform((val) => {
      return val
        .replace(/\s+/g, " ") // remove extra spaces
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }),
  role: z
    .enum(Object.values(ROLE) as [string, ...string[]])
    .default(ROLE.ADMIN),
  image: z.url("Invalid URL format").nullable().optional().default(null),

  isActive: z.boolean().optional().default(true),
});
export const loginAdminSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
export const updateAdminSchema = z.object({
  email: z.email().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .transform((val) => {
      return val
        .replace(/\s+/g, " ") // remove extra spaces
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }),
  isActive: z.boolean().optional(),
  lastLogin: z.date().nullable().optional(),
});
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
export type adminType = z.infer<typeof createAdminSchema>;
export type loginType = z.infer<typeof loginAdminSchema>;
export type updatType = z.infer<typeof updateAdminSchema>;
export type changePasswordType = z.infer<typeof changePasswordSchema>;
