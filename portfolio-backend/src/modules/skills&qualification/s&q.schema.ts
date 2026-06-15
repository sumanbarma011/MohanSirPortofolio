// schemas/skillsQualifications.js
import zod from "zod";
import { ACADEMICTYPE, LEVEL } from "./skills.model";

// ==================== SKILL SCHEMAS ====================

// Create Skill Schema (Admin)
const createSkillSchema = zod.object({
  name: zod
    .string()
    .min(2, "Skill name must be at least 2 characters")
    .max(100, "Skill name must be at most 100 characters"),

  description: zod
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(zod.literal("")),

  level: zod.enum(LEVEL).optional().default(LEVEL.INTERMEDIATE),

  yearsOfExperience: zod
    .number()
    .min(0, "Years must be at least 0")
    .max(50, "Years must be at most 50")
    .optional(),

  isFeatured: zod.boolean().optional().default(false),
});

// Update Skill Schema (Admin)
const updateSkillSchema = zod.object({
  name: zod.string().min(2).max(100).optional(),

  description: zod.string().max(500).optional(),
  level: zod.enum(LEVEL).optional(),
  yearsOfExperience: zod.number().min(0).max(50).optional(),
  isFeatured: zod.boolean().optional(),
});

// Get Skills Query Schema (Filtering)
const getSkillsQuerySchema = zod.object({
  level: zod.enum(LEVEL).optional(),
  isFeatured: zod.boolean().optional(),
  limit: zod.number().int().positive().max(100).optional().default(20),
  page: zod.number().int().positive().optional().default(1),
});

// ==================== QUALIFICATION SCHEMAS ====================

// Create Qualification Schema (Admin)
const createQualificationSchema = zod.object({
  degree: zod
    .string()
    .min(2, "Degree must be at least 2 characters")
    .max(150, "Degree must be at most 150 characters"),

  institution: zod
    .string()
    .min(2, "Institution must be at least 2 characters")
    .max(200, "Institution must be at most 200 characters"),

  fieldOfStudy: zod
    .string()
    .min(2, "Field of study must be at least 2 characters")
    .max(150, "Field of study must be at most 150 characters"),

  yearOfPassing: zod
    .number()
    .min(1950, "Year must be at least 1950")
    .max(2026, "Year must be at most 2026"),

  grade: zod
    .string()
    .max(50, "Grade must be at most 50 characters")
    .optional()
    .or(zod.literal("")),

  certificationNumber: zod
    .string()
    .max(100, "Certification number must be at most 100 characters")
    .optional()
    .or(zod.literal("")),

  issuingAuthority: zod
    .string()
    .max(200, "Issuing authority must be at most 200 characters")
    .optional()
    .or(zod.literal("")),

  description: zod
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(zod.literal("")),

  type: zod.enum(ACADEMICTYPE),

  isFeatured: zod.boolean().optional().default(false),
});

// Update Qualification Schema (Admin)
const updateQualificationSchema = zod.object({
  degree: zod.string().min(2).max(150).optional(),
  institution: zod.string().min(2).max(200).optional(),
  fieldOfStudy: zod.string().min(2).max(150).optional(),
  yearOfPassing: zod.number().min(1950).max(2026).optional(),
  grade: zod.string().max(50).optional(),
  certificationNumber: zod.string().max(100).optional(),
  issuingAuthority: zod.string().max(200).optional(),
  description: zod.string().max(500).optional(),
  type: zod.enum(ACADEMICTYPE).optional(),
  isFeatured: zod.boolean().optional(),
});

// Get Qualifications Query Schema (Filtering)
const getQualificationsQuerySchema = zod.object({
  type: zod.enum(ACADEMICTYPE).optional(),
  isFeatured: zod.boolean().optional(),
  limit: zod.number().int().positive().max(100).optional().default(20),
  page: zod.number().int().positive().optional().default(1),
});

export {
  createSkillSchema,
  updateSkillSchema,
  getSkillsQuerySchema,
  createQualificationSchema,
  updateQualificationSchema,
  getQualificationsQuerySchema,
};
