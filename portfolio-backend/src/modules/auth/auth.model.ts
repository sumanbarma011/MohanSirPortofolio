import mongoose, { Document, Model } from "mongoose";
export enum ROLE {
  ADMIN = "ADMIN",
}
export interface IAdmin extends Document {
  email: string;
  hashedPassword: string;
  name: string;
  role: ROLE;
  images: {
    url: string;
    cloudinaryId: string;
  } | null;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminModel extends Model<IAdmin> {}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hashedPassword: { type: String, required: true, minlength: 8, select: false },
  name: { type: String, required: true, trim: true },
  role: { type: String, default: ROLE.ADMIN, enum: Object.values(ROLE) },
  images: {
    url: String,
    cloudinaryId: String,
  },

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
});

//  Clean — no next needed with async pre hooks
// adminSchema.pre<IAdmin>("save", async function () {
//   if (!this.isModified("hashedPassword")) return;
//   this.hashedPassword = await bcrypt.hash(this.hashedPassword, 12);
// });
const Admin = mongoose.model<IAdmin, IAdminModel>("Admin", adminSchema);
export default Admin;
