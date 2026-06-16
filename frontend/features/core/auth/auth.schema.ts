import z from "zod";

export const loginAdminSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginType = z.infer<typeof loginAdminSchema>;

export const updateAdminSchema = z.object({
  name: z.string().trim().optional(),
  email: z.email().optional(),
  images: z
    .object({
      url: z.url("Invalid URL format"),
      cloudinaryId: z.string().min(1, "Cloudinary ID required"),
    })
    .optional()
    .nullable(),
});

// Password Schema provided
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type UpdateAdminType = z.infer<typeof updateAdminSchema>;
