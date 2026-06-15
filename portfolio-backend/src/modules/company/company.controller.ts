import { Request, Response } from "express";
import { createCompanySchema, updateCompanySchema } from "./company.schema";
import { CompanyModel } from "./company.model";
import { catchAsync } from "../../utils/async.handler";
import { notFound } from "../../utils/types/app.error";
import { ApiResponse } from "../../utils/types/app.response.type";
import {
  CompanyResponse,
  CompanyGetResponse,
  CompanyListResponse,
} from "./company.types";

// Helper to convert company to response
const companyToResponse = (company: any): CompanyResponse => {
  return {
    id: company._id.toString(),
    companyName: company.companyName,
    description: company.description,
    logo: company.logo,
    isActive: company.isActive,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
};

export const createCompanyController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate body
    const parsed = createCompanySchema.parse(req.body);

    // 2. Create company
    const company = await CompanyModel.create(parsed);

    // 3. Response
    const response: CompanyGetResponse = {
      success: true,
      message: "Company created successfully",
      data: companyToResponse(company),
    };

    res.status(201).json(response);
  },
);

export const getAllCompaniesController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch all companies
    const companies = await CompanyModel.find().sort({ createdAt: -1 });

    // 2. Response
    const response: CompanyListResponse = {
      success: true,
      message: "Companies retrieved successfully",
      data: companies.map(companyToResponse),
    };

    res.status(200).json(response);
  },
);

export const getActiveCompaniesController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch only active companies
    const companies = await CompanyModel.find({ isActive: true }).sort({
      createdAt: -1,
    });

    // 2. Response
    const response: CompanyListResponse = {
      success: true,
      message: "Active companies retrieved successfully",
      data: companies.map(companyToResponse),
    };

    res.status(200).json(response);
  },
);

export const getCompanyByIdController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find company
    const company = await CompanyModel.findById(id);

    if (!company) {
      throw notFound("Company not found");
    }

    // 3. Response
    const response: CompanyGetResponse = {
      success: true,
      message: "Company retrieved successfully",
      data: companyToResponse(company),
    };

    res.status(200).json(response);
  },
);

export const updateCompanyController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID and body
    const { id } = req.params;
    const parsed = updateCompanySchema.parse(req.body);

    // 2. Find and update company
    const company = await CompanyModel.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      throw notFound("Company not found");
    }

    // 3. Response
    const response: CompanyGetResponse = {
      success: true,
      message: "Company updated successfully",
      data: companyToResponse(company),
    };

    res.status(200).json(response);
  },
);

export const deleteCompanyController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find and delete company
    const company = await CompanyModel.findByIdAndDelete(id);

    if (!company) {
      throw notFound("Company not found");
    }

    // 3. Response
    const response: ApiResponse<void> = {
      success: true,
      message: "Company deleted successfully",
      data: undefined,
    };

    res.status(200).json(response);
  },
);
