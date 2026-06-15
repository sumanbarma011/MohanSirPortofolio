// routes/skillsQualifications.ts
import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
  getFeaturedSkills,
  createQualification,
  getQualificationById,
  updateQualification,
  deleteQualification,
  getFeaturedQualifications,
} from "./s$q.controller";

import { authMiddleware } from "./../../middleware/auth.middleware";
import {
  createQualificationSchema,
  createSkillSchema,
  updateQualificationSchema,
  updateSkillSchema,
} from "./s&q.schema";
import { validate } from "../../middleware/zod.validate";
const skRouter = express.Router();

// ==================== SKILL ROUTES ====================

// Public Routes (No Auth Required)
skRouter.get("/getAll", getAllSkills); // ---------------------- done
skRouter.get("/getAll/featured", getFeaturedSkills); // ---------------------- done
skRouter.get("/get/:id", getSkillById); // ---------------------- done

// Admin Routes (Auth Required)
skRouter.post(
  "/create",
  authMiddleware,
  validate(createSkillSchema),
  createSkill,
); // ----------------------------------- checked
skRouter.put(
  "/update/:id",
  authMiddleware,
  validate(updateSkillSchema),
  updateSkill,
); // checked -----------------------------------
skRouter.delete("/delete/:id", authMiddleware, deleteSkill); // ----------------------------------- checked

// ==================== QUALIFICATION ROUTES ====================

// Public Routes (No Auth Required)
// skRouter.get("/qualifications", getAllQualifications);
skRouter.get("/qualifications/featured", getFeaturedQualifications); // ----------------------------------- done
skRouter.get("/qualifications/:id", getQualificationById);

// Admin Routes (Auth Required)
skRouter.post(
  "/qualifications",
  authMiddleware,
  validate(createQualificationSchema),
  createQualification,
); // ----------------------------------- done
skRouter.put(
  "/qualifications/:id",
  authMiddleware,
  validate(updateQualificationSchema),
  updateQualification,
); // ----------------------------------- checked
skRouter.delete("/qualifications/:id", authMiddleware, deleteQualification); // ----------------------------------- done

export default skRouter;
