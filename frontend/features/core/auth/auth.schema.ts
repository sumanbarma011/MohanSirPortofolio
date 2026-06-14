import z from "zod";

export const loginAdminSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginType = z.infer<typeof loginAdminSchema>;
