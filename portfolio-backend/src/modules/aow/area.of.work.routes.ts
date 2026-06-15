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
  "/create",
  authMiddleware,
  validate(createAreaOfWorkSchema),
  createAreaOfWorkController,
);

// Get all areas (no auth)
areaOfWorkRouter.get("/getAll", getAllAreasOfWorkController);

// Get active areas only (no auth)
areaOfWorkRouter.get("/active", getActiveAreasOfWorkController);

// Get area by ID (no auth)
areaOfWorkRouter.get("/get/:id", getAreaOfWorkByIdController);

// Update area (require auth)
areaOfWorkRouter.put(
  "/update/:id",
  authMiddleware,
  validate(updateAreaOfWorkSchema),
  updateAreaOfWorkController,
);

// Delete area (require auth)
areaOfWorkRouter.delete(
  "/delete/:id",
  authMiddleware,
  deleteAreaOfWorkController,
);
