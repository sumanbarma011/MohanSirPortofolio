import mongoose, { Document, Model } from "mongoose";

export interface ICompany extends Document {
  companyName: string;
  description: string;
  logo: {
    url: string;
    cloudinaryId: string;
  } | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyModel extends Model<ICompany> {}

const CompanySchema = new mongoose.Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    logo: {
      url: String,
      cloudinaryId: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CompanyModel: Model<ICompany> = mongoose.model<ICompany>(
  "Company",
  CompanySchema,
);
