import { createResponseType, UpdateUser } from "./resp.type";
import { ApiResponse } from "./../../utils/types/app.response.type";

// controllers/contact.ts
import { type Request, type Response } from "express";
import { Contact, STATUS } from "./contact.model";
import { CreateContactInput } from "./contact.model";

import { notFound } from "../../utils/types/app.error";
import { catchAsync } from "../../utils/async.handler";

// ==================== PUBLIC (Viewers) ====================

// Create Contact (Public - Any Viewer)
export const createContact = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body;

    const contact = new Contact(value as CreateContactInput);
    contact.status = STATUS.NEW;
    contact.isResponded = false;
    contact.createdAt = new Date();
    contact.updatedAt = new Date(); // Manually set
    await contact.save();
    const {
      name,
      email,
      phone,
      service,
      subject,
      message,
      isResponded,
      status,
      _id,
      createdAt,
      updatedAt,
    } = contact.toObject();
    const filteredContact = {
      name,
      email,
      phone,
      service,
      subject,
      message,
      isResponded,
      status,
      _id,
      createdAt,
      updatedAt,
    };
    const apiResponse: ApiResponse<createResponseType> = {
      success: true,
      message: "Contact form submitted successfully",
      data: filteredContact,
    };
    res.status(201).json(apiResponse);
  },
);

// ==================== ADMIN ONLY CRUD ====================

// Get All Contacts (Admin Only)
export const getAllContacts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;

    // Get all skills with pagination only
    const contacts = await Contact.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ isFeatured: -1, createdAt: -1 })
      .select("-__v");
    if (!contacts) {
      throw notFound("No contacts found");
    }
    const response: ApiResponse<createResponseType[]> = {
      success: true,
      data: contacts,
      message: "Contacts delivered successfully",
    };
    res.status(200).json(response);
  },
);

// Get Single Contact (Admin Only)
export const getContactById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({
        success: false,
        error: {
          message: "Contact not found",
          code: "NOT_FOUND",
          statusCode: 404,
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: (error as Error).message || "Internal server error",
        code: "INTERNAL_ERROR",
        statusCode: 500,
      },
    });
  }
};

// Update Contact (Admin Only)
export const updateContact = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const value = req.body;
    console.log("=================");
    console.log(value);
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw notFound("No contact found");
    }
    // Update fields
    if (value.isResponded !== undefined) {
      contact.isResponded = value.isResponded;
    }
    if (value.response !== undefined) {
      contact.response = value.response;
    }
    if (value.status !== undefined) {
      contact.status = value.status;
    }

    contact.updatedAt = new Date(); // Manually set
    await contact.save();
    const { __v, ...filteredContact } = contact.toObject();
    const response: ApiResponse<UpdateUser> = {
      success: true,
      message: "Contact updated successfully",
      data: filteredContact,
    };
    res.status(200).json(response);
  },
);

// Delete Contact (Admin Only)
export const deleteContact = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      throw notFound("Contact not found");
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  },
);

// Respond to Contact (Admin Only)
export const respondToContact = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { response } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw notFound("No contact found");
    }

    contact.response = response;
    contact.isResponded = true;
    contact.status = STATUS.RESOLVED;
    contact.updatedAt = new Date(); // Manually set
    await contact.save();

    res.status(200).json({
      success: true,
      message: "Response sent successfully",
      data: contact,
    });
  },
);

// Get New Contacts (Admin Only - Filter by status)
export const getNewContacts = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const contacts = await Contact.find({ status: STATUS.NEW })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: contacts,
    });
  },
);

// Get Unresponded Contacts (Admin Only - Filter by isResponded)
export const getUnrespondedContacts = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const contacts = await Contact.find({ isResponded: false })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: contacts,
    });
  },
);
