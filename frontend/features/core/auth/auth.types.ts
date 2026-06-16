import { CloudinaryImage } from "../blogs/blog.types";

export const USER_ROLE = {
  ADMIN: "ADMIN",
} as const;

export type UserRoles = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type UserType = {
  readonly _id: string;
  email: string;
  name: string;
  role: UserRoles;
  images: CloudinaryImage | null;
  isActive: boolean;
  lastLogin: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly __v: number;
  token?: string;
};
