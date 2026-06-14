export const SERVICE = {
  TAXATION: "TAXATION",
  AUDIT: "AUDIT",
  ADVISORY: "ADVISORY",
  FINANCIAL_PLANNING: "FINANCIAL_PLANNING",
} as const;

export type SERVICE = (typeof SERVICE)[keyof typeof SERVICE];

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
  service: string;
  subject: string;
  message: string;
  isResponded: boolean;
  status: STATUS;
  readonly _id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
