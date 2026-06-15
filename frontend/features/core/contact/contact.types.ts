import { Service } from "../services/service.types";

export const STATUS = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  ARCHIVED: "ARCHIVED",
} as const;

export type STATUS = (typeof STATUS)[keyof typeof STATUS];

export type ContactResponseType = {
  name: string;
  email: string;
  phone: string;
  service: Service[];
  subject: string;
  message: string;
  isResponded: boolean;
  response?: string;

  status: STATUS;
  readonly _id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
