import z from "zod";

export const LEVEL = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
  EXPERT: "EXPERT",
} as const;

export const createSkillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .max(100, "Skill name must be at most 100 characters"),

  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),

  level: z.enum(LEVEL).optional().default(LEVEL.INTERMEDIATE),

  yearsOfExperience: z
    .number()
    .min(0, "Years must be at least 0")
    .max(50, "Years must be at most 50")
    .optional(),

  isFeatured: z.boolean().optional().default(false),
});

export type CreateSkillInputType = z.infer<typeof createSkillSchema>;

// Update Skill Schema (Admin)
const updateSkillSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  description: z.string().max(500).optional(),
  level: z.enum(LEVEL).optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
  isFeatured: z.boolean().optional(),
});

// Get Skills Query Schema (Filtering)
// const getSkillsQuerySchema = z.object({
//   level: z.enum(LEVEL).optional(),
//   isFeatured: z.boolean().optional(),
//   limit: z.number().int().positive().max(100).optional().default(20),
//   page: z.number().int().positive().optional().default(1),
// });

// ==================== QUALIFICATION SCHEMAS ====================

// Create Qualification Schema (Admin)
// const createQualificationSchema = z.object({
//   degree: z
//     .string()
//     .min(2, "Degree must be at least 2 characters")
//     .max(150, "Degree must be at most 150 characters"),

//   institution: z
//     .string()
//     .min(2, "Institution must be at least 2 characters")
//     .max(200, "Institution must be at most 200 characters"),

//   fieldOfStudy: z
//     .string()
//     .min(2, "Field of study must be at least 2 characters")
//     .max(150, "Field of study must be at most 150 characters"),

//   yearOfPassing: z
//     .number()
//     .min(1950, "Year must be at least 1950")
//     .max(2026, "Year must be at most 2026"),

//   grade: z
//     .string()
//     .max(50, "Grade must be at most 50 characters")
//     .optional()
//     .or(z.literal("")),

//   certificationNumber: z
//     .string()
//     .max(100, "Certification number must be at most 100 characters")
//     .optional()
//     .or(z.literal("")),

//   issuingAuthority: z
//     .string()
//     .max(200, "Issuing authority must be at most 200 characters")
//     .optional()
//     .or(z.literal("")),

//   description: z
//     .string()
//     .max(500, "Description must be at most 500 characters")
//     .optional()
//     .or(z.literal("")),

//   type: z.enum(ACADEMICTYPE),

//   isFeatured: z.boolean().optional().default(false),
// });

// // Update Qualification Schema (Admin)
// const updateQualificationSchema = z.object({
//   degree: z.string().min(2).max(150).optional(),
//   institution: z.string().min(2).max(200).optional(),
//   fieldOfStudy: z.string().min(2).max(150).optional(),
//   yearOfPassing: z.number().min(1950).max(2026).optional(),
//   grade: z.string().max(50).optional(),
//   certificationNumber: z.string().max(100).optional(),
//   issuingAuthority: z.string().max(200).optional(),
//   description: z.string().max(500).optional(),
//   type: z.enum(ACADEMICTYPE).optional(),
//   isFeatured: z.boolean().optional(),
// });

// // Get Qualifications Query Schema (Filtering)
// const getQualificationsQuerySchema = z.object({
//   type: z.enum(ACADEMICTYPE).optional(),
//   isFeatured: z.boolean().optional(),
//   limit: z.number().int().positive().max(100).optional().default(20),
//   page: z.number().int().positive().optional().default(1),
// });
