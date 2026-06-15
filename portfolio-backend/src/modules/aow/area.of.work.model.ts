import mongoose, { Document, Model } from "mongoose";

export interface IAreaOfWork extends Document {
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAreaOfWorkModel extends Model<IAreaOfWork> {}

const AreaOfWorkSchema = new mongoose.Schema<IAreaOfWork>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
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

export const AreaOfWorkModel: Model<IAreaOfWork> = mongoose.model<IAreaOfWork>(
  "AreaOfWork",
  AreaOfWorkSchema,
);
