// controllers/skillsQualifications.ts
import { Request, Response } from "express";
import { Skill, Qualification } from "./skills.model";
import {
  CreateSkillInput,
  UpdateSkillInput,
  CreateQualificationInput,
  UpdateQualificationInput,
} from "./s&q.types";

import { catchAsync } from "../../utils/async.handler";
import { badRequest, notFound } from "../../utils/types/app.error";

// ==================== SKILL CRUD ====================

// Create Skill (Admin Only)
export const createSkill = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body as CreateSkillInput;

    const skill = await Skill.create(value);
    if (!skill) {
      throw badRequest("Cannot create skill");
    }
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  },
);

// Get All Skills (Public)
export const getAllSkills = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // Extract only limit and page from query
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;

    // Get all skills with pagination only
    const skills = await Skill.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ isFeatured: -1, createdAt: -1 });

    const total = await Skill.countDocuments();

    res.status(200).json({
      success: true,
      data: skills,
      pagination: {
        total,
        page,
        limit,
      },
    });
  },
);

// Get Single Skill (Public)
export const getSkillById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      throw notFound("Skill");
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  },
);

// Update Skill (Admin Only)
export const updateSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const value = req.body;

  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    value as UpdateSkillInput,
    { new: true },
  );
  console.log(skill);
  if (!skill) {
    throw notFound("Skill");
  }

  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
};

// Delete Skill (Admin Only)
export const deleteSkill = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      throw notFound("Skill");
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  },
);
// Get Featured Skills (Public)
export const getFeaturedSkills = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const skills = await Skill.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: skills,
    });
  },
);

// ==================== QUALIFICATION CRUD ====================

// Create Qualification (Admin Only)

// Get All Qualifications (Public)
export const createQualification = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body;

    const qualification = new Qualification(value as CreateQualificationInput);
    await qualification.save();

    res.status(201).json({
      success: true,
      message: "Qualification created successfully",
      data: qualification,
    });
  },
);

// Get Single Qualification (Public)
export const getQualificationById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const qualification = await Qualification.findById(req.params.id);

    if (!qualification) {
      throw notFound("Qualification");
    }

    res.status(200).json({
      success: true,
      data: qualification,
    });
  },
);

// Update Qualification (Admin Only)
export const updateQualification = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body;

    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      value as UpdateQualificationInput,
      { new: true },
    );

    if (!qualification) {
      throw notFound("Qualification");
    }

    res.status(200).json({
      success: true,
      message: "Qualification updated successfully",
      data: qualification,
    });
  },
);

// Delete Qualification (Admin Only)
export const deleteQualification = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);

    if (!qualification) {
      throw notFound("Qualification");
    }

    res.status(200).json({
      success: true,
      message: "Qualification deleted successfully",
    });
  },
);
// Get Featured Qualifications (Public)
export const getFeaturedQualifications = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const qualifications = await Qualification.find({ isFeatured: true })
      .sort({ yearOfPassing: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: qualifications,
    });
  },
);
