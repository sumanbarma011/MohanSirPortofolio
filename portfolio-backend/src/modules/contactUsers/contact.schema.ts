// schemas/contact.ts
import zod from "zod";
import { isValidObjectId } from "mongoose";
// Create Contact Schema (Public - Viewers)
export const createContactSchema = zod.object({
  name: zod
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: zod
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be at most 255 characters"),

  phone: zod
    .string()
    .min(7, "Phone must be at least 7 characters")
    .max(20, "Phone must be at most 20 characters"),

  service: zod
    .union([zod.string(), zod.array(zod.string())])
    .transform((val) => {
      const serviceArray = Array.isArray(val) ? val : [val];

      for (const id of serviceArray) {
        if (!id || typeof id !== "string" || !isValidObjectId(id)) {
          throw new Error("Invalid Service ID");
        }
      }

      return serviceArray;
    }),
  subject: zod
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be at most 200 characters"),

  message: zod
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

// Update Contact Schema (Admin Only)
export const updateContactSchema = zod.object({
  isResponded: zod.boolean().optional(),
  response: zod.string().max(1000).optional(),
  status: zod.enum(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"]).optional(),
});

// Get Contacts Query Schema (Admin Filtering)
export const getContactsQuerySchema = zod.object({
  service: zod.string().uuid().optional(),
  status: zod.enum(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"]).optional(),
  isResponded: zod.boolean().optional(),
  limit: zod.number().int().positive().max(100).optional().default(20),
  page: zod.number().int().positive().optional().default(1),
});
