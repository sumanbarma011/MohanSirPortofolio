import mongoose, { Document } from "mongoose";
export type RESOURCE_TYPE = "image" | "video" | "raw" | "auto";
export interface IFile extends Document {
  url: string;
  public_id: string;
  resource_type: RESOURCE_TYPE;
  format: string;
  bytes: number;
  original_name: string;
}

const fileSchema = new mongoose.Schema<IFile>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    resource_type: {
      type: String,
      enum: ["image", "video", "raw", "auto"],
      required: true,
    },
    format: { type: String },
    bytes: { type: Number },
    original_name: { type: String },
  },
  { timestamps: true },
);

export const FileModel = mongoose.model<IFile>("File", fileSchema);
