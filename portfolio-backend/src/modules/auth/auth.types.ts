import { Types } from "mongoose";
import { ROLE } from "./auth.model";
export type Admin = {
  _id: Types.ObjectId;
  email: string;
  hashedPassword: string;
  name: string;
  role: ROLE;
  image: string | null;
  isActive: Boolean;
  lastLogin: NativeDate | null;
  createdAt: NativeDate;
  updatedAt: NativeDate;

  __v: Number;
};
export type AdminWithoutPassword = Omit<Admin, "hashedPassword">;
export type UpdateAdmin = Partial<AdminWithoutPassword>;
export type DeleteAdmin = Pick<Admin, "_id">;
