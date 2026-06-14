import { authMiddleware } from "./../../middleware/auth.middleware";
// routes/contact.ts
import express from "express";
import { validate } from "../../middleware/zod.validate";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  respondToContact,
  getNewContacts,
  getUnrespondedContacts,
} from "./contact.controller";
import { createContactSchema, updateContactSchema } from "./contact.schema";

const contactRouter = express.Router();

// PUBLIC ROUTES (Viewers - No Auth Required)
contactRouter.post("/create", validate(createContactSchema), createContact); // ---------- done

// ADMIN ROUTES (Auth Required)
contactRouter.get("/getAll", authMiddleware, getAllContacts);
contactRouter.get("/new", authMiddleware, getNewContacts);
contactRouter.get("/unresponded", authMiddleware, getUnrespondedContacts);
contactRouter.get("/:id", authMiddleware, getContactById);
contactRouter.put(
  "/:id",
  authMiddleware,
  validate(updateContactSchema),
  updateContact,
); //---- done
contactRouter.delete("/:id", authMiddleware, deleteContact); //-- done
contactRouter.post("/:id/respond", authMiddleware, respondToContact);

export default contactRouter;
