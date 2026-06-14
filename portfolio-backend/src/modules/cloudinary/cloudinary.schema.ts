import { z } from "zod";

export const fileUploadSchema = z.object({
  folder: z.string().optional(), // optional cloud folder
});
