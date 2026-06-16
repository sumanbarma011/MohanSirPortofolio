import { createResponseType, UpdateUser } from "./resp.type";
import { ApiResponse } from "./../../utils/types/app.response.type";

// controllers/contact.ts
import { type Request, type Response } from "express";
import { Contact, STATUS } from "./contact.model";
import { CreateContactInput } from "./contact.model";

import { badRequest, notFound } from "../../utils/types/app.error";
import { catchAsync } from "../../utils/async.handler";
import { sendContactToAdmin } from "../../config/nodemailer";

// ==================== PUBLIC (Viewers) ====================

// Create Contact (Public - Any Viewer)
export const createContact = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    console.log("================");
    const value = req.body;
    const contact = new Contact(value as CreateContactInput);
    contact.status = STATUS.NEW;
    contact.isResponded = false;
    await contact.save();

    const populatedContact = await Contact.findById(contact._id).populate(
      "service",
    );
    if (!populatedContact) {
      throw notFound("Contact not found after creation");
    }
    //   const html = `
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <style>
    //       body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    //       .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    //       .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
    //       .content { padding: 20px; }
    //       .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; margin: 10px 0; }
    //       .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="container">
    //       <div class="header">
    //         <h1>Thank You for Contacting Us!</h1>
    //       </div>
    //       <div class="content">
    //         <p>Dear ${contact.name},</p>
    //         <p>Thank you for reaching out to us regarding <strong>${contact.subject}</strong>.</p>
    //         <p>We have received your message and our team will review it shortly. We aim to respond within 24-48 hours.</p>
    //         <p>If you have any urgent concerns, feel free to call us at +91-9876543210.</p>
    //         <a href="https://yourwebsite.com/contact" class="button">Visit Our Contact Page</a>
    //       </div>
    //       <div class="footer">
    //         <p>Best regards,<br>Your CA Portfolio Team</p>
    //         <p>This is an automated confirmation email</p>
    //       </div>
    //     </div>
    //   </body>
    //   </html>
    // `;
    // await sendEmail({
    //   to: value.email,
    //   html,
    //   subject: `Thank You for Contacting Us - ${contact.subject}`,
    //   text: `Dear ${contact.name}, Thank you for reaching out to us regarding ${contact.subject}. We have received your message and will respond within 24-48 hours.`,
    // });
    try {
      await sendContactToAdmin(contact);
      console.log("email send successfully");
    } catch (error) {
      throw badRequest("Email cannot be send");
    }
    const apiResponse: ApiResponse<createResponseType> = {
      success: true,
      message: "Contact form submitted successfully",
      data: populatedContact.toObject() as createResponseType,
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
      .populate("service")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
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
    const contact = await Contact.findById(req.params.id).populate("service");
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
      .populate("service")
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
      .populate("service")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: contacts,
    });
  },
);
