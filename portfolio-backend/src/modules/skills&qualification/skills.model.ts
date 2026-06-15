// models/skillsQualifications.ts
import mongoose, { Schema, Model, Document } from "mongoose";

// ==================== SKILLS MODEL ====================

export enum LEVEL {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}
export interface ISkill extends Document {
  name: string;

  description?: string;
  level?: LEVEL;
  yearsOfExperience?: number;
  isFeatured: boolean; //for highlight
  createdAt: Date;
  updatedAt: Date;
}
const skillSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },

  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: 500,
  },
  level: {
    type: String,
    required: false,
    enum: Object.values(LEVEL),
    default: LEVEL.INTERMEDIATE,
  },
  yearsOfExperience: {
    type: Number,
    required: false,
    min: 0,
    max: 50,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Skill: Model<ISkill> = mongoose.model<ISkill>("Skill", skillSchema);

// ==================== QUALIFICATION MODEL ====================
export enum ACADEMICTYPE {
  CA = "CA",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DIPLOMA = "DIPLOMA",
  CERTIFICATION = "CERTIFICATION",
  OTHER = "OTHER",
}
export interface IQualification extends Document {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  yearOfPassing: number;
  grade?: string;
  certificationNumber?: string;
  issuingAuthority?: string;
  description?: string;
  type: ACADEMICTYPE;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const qualificationSchema: Schema = new Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    yearOfPassing: {
      type: Number,
      required: true,
      min: 1950,
      max: 2026,
    },
    grade: {
      type: String,
      required: false,
      trim: true,
      maxlength: 50,
    },
    certificationNumber: {
      type: String,
      required: false,
      trim: true,
      maxlength: 100,
    },
    issuingAuthority: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ACADEMICTYPE),
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Qualification: Model<IQualification> = mongoose.model<IQualification>(
  "Qualification",
  qualificationSchema,
);

export { Skill, Qualification };
