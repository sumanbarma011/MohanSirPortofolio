import { Router } from "express";
import { validate } from "../../middleware/zod.validate";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createServiceController,
  getAllServicesController,
  getActiveServicesController,
  getServiceByIdController,
  updateServiceController,
  deleteServiceController,
  getServicesForContactController,
} from "./service.controller";
import { createServiceSchema, updateServiceSchema } from "./service.schema";

export const serviceRouter = Router();

// Create service (require auth)
serviceRouter.post(
  "/create",
  authMiddleware,
  validate(createServiceSchema),
  createServiceController,
);

//get services for contact controller
serviceRouter.get("/for-contact", getServicesForContactController);
// Get all services (no auth)
serviceRouter.get("/getAll", getAllServicesController);

// Get active services only (no auth)
serviceRouter.get("/get/active", getActiveServicesController);

// Get service by ID (no auth)
serviceRouter.get("/get/:id", getServiceByIdController);

// Update service (require auth)
serviceRouter.put(
  "/update/:id",
  authMiddleware,
  validate(updateServiceSchema),
  updateServiceController,
);

// Delete service (require auth)
serviceRouter.delete("/delete/:id", authMiddleware, deleteServiceController);
