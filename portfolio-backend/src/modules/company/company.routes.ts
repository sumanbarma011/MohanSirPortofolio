import { Router } from "express";
import { validate } from "../../middleware/zod.validate";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createCompanyController,
  getAllCompaniesController,
  getActiveCompaniesController,
  getCompanyByIdController,
  updateCompanyController,
  deleteCompanyController,
} from "./company.controller";
import { createCompanySchema, updateCompanySchema } from "./company.schema";

export const companyRouter = Router();

// Create company (require auth)
companyRouter.post(
  "/companies",
  authMiddleware,
  validate(createCompanySchema),
  createCompanyController,
);

// Get all companies (no auth)
companyRouter.get("/companies", getAllCompaniesController);

// Get active companies only (no auth)
companyRouter.get("/companies/active", getActiveCompaniesController);

// Get company by ID (no auth)
companyRouter.get("/companies/:id", getCompanyByIdController);

// Update company (require auth)
companyRouter.put(
  "/companies/:id",
  authMiddleware,
  validate(updateCompanySchema),
  updateCompanyController,
);

// Delete company (require auth)
companyRouter.delete("/companies/:id", authMiddleware, deleteCompanyController);