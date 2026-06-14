import { boolean, string } from "zod";
import { STATUS } from "./contact.model";
import { Types } from "mongoose";

export type createResponseType = {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
  isResponded: boolean;
  response?: string;
  status: STATUS;
  _id: Types.ObjectId;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

// export type UserWithoutPassword = Omit<createResponseType, "password">;
export type UpdateUser = Partial<createResponseType>;
// export type DeleteUser = Pick<User, "_id">;
