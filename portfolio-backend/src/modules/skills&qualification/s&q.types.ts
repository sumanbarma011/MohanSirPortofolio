// types/skillsQualifications.ts

import { ACADEMICTYPE, CATEGORY, LEVEL } from "./skills.model";

// ==================== SKILL INTERFACE ====================

export interface CreateSkillInput {
  name: string;
  category: CATEGORY;
  description?: string;
  level?: LEVEL;
  yearsOfExperience?: number;
  isFeatured?: boolean;
}

export interface UpdateSkillInput {
  name?: string;
  category?: CATEGORY;
  description?: string;
  level?: LEVEL;
  yearsOfExperience?: number;
  isFeatured?: boolean;
}

export interface GetSkillsQueryInput {
  category?: CATEGORY;
  level?: LEVEL;
  isFeatured?: boolean;
  limit?: number;
  page?: number;
}

// ==================== QUALIFICATION INTERFACE ====================

export interface CreateQualificationInput {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  yearOfPassing: number;
  grade?: string;
  certificationNumber?: string;
  issuingAuthority?: string;
  description?: string;
  type: ACADEMICTYPE;
  isFeatured?: boolean;
}

export interface UpdateQualificationInput {
  degree?: string;
  institution?: string;
  fieldOfStudy?: string;
  yearOfPassing?: number;
  grade?: string;
  certificationNumber?: string;
  issuingAuthority?: string;
  description?: string;
  type?: ACADEMICTYPE;
  isFeatured?: boolean;
}

export interface GetQualificationsQueryInput {
  type?: ACADEMICTYPE;
  isFeatured?: boolean;
  limit?: number;
  page?: number;
}
