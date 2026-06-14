// models/contact.ts
import { NextFunction } from "express";
import mongoose, { Schema, Model } from "mongoose";

import { Document } from "mongoose";

// Services Enum (CA Services)
export enum SERVICE {
  TAXATION = "TAXATION",
  AUDIT = "AUDIT",
  ADVISORY = "ADVISORY",
  FINANCIAL_PLANNING = "FINANCIAL_PLANNING",
}
export enum STATUS {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  ARCHIVED = "ARCHIVED",
}
// Contact Interface
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  service: SERVICE;
  subject: string;
  message: string;
  isResponded: boolean;
  response?: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}

// Input Types
export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  service: SERVICE;
  subject: string;
  message: string;
}

export interface UpdateContactInput {
  isResponded?: boolean;
  response?: string;
  status?: STATUS;
}

export interface GetContactsQueryInput {
  service?: SERVICE;
  status?: STATUS;
  isResponded?: boolean;
  limit?: number;
  page?: number;
}

const contactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  service: {
    type: String,
    required: true,
    enum: Object.values(SERVICE),
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  isResponded: {
    type: Boolean,
    default: false,
  },
  response: {
    type: String,
    required: false,
    trim: true,
    maxlength: 1000,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(STATUS),
    default: STATUS.NEW,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> = mongoose.model<IContact>(
  "Contact",
  contactSchema,
);

export { Contact };
