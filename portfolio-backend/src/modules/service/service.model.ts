import mongoose, { Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceModel extends Model<IService> {}

const ServiceSchema = new mongoose.Schema<IService>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Service name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
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

export const ServiceModel: Model<IService> = mongoose.model<IService>(
  "Service",
  ServiceSchema,
);
