import { Router } from "express";
import { validate } from "../../middleware/zod.validate";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createAreaOfWorkController,
  getAllAreasOfWorkController,
  getActiveAreasOfWorkController,
  getAreaOfWorkByIdController,
  updateAreaOfWorkController,
  deleteAreaOfWorkController,
} from "./area.of.work.controller";
import {
  createAreaOfWorkSchema,
  updateAreaOfWorkSchema,
} from "./area.of.work.schema";

export const areaOfWorkRouter = Router();

// Create area (require auth)
areaOfWorkRouter.post(
  "/areas-of-work",
  authMiddleware,
  validate(createAreaOfWorkSchema),
  createAreaOfWorkController,
);

// Get all areas (no auth)
areaOfWorkRouter.get("/areas-of-work", getAllAreasOfWorkController);

// Get active areas only (no auth)
areaOfWorkRouter.get("/areas-of-work/active", getActiveAreasOfWorkController);

// Get area by ID (no auth)
areaOfWorkRouter.get("/areas-of-work/:id", getAreaOfWorkByIdController);

// Update area (require auth)
areaOfWorkRouter.put(
  "/areas-of-work/:id",
  authMiddleware,
  validate(updateAreaOfWorkSchema),
  updateAreaOfWorkController,
);

// Delete area (require auth)
areaOfWorkRouter.delete(
  "/areas-of-work/:id",
  authMiddleware,
  deleteAreaOfWorkController,
);
