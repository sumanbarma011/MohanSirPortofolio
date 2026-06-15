import { Request, Response } from "express";
import { createAreaOfWorkSchema, updateAreaOfWorkSchema } from "./area.of.work.schema";
import { AreaOfWorkModel } from "./area.of.work.model";
import { catchAsync } from "../../utils/async.handler";
import { notFound } from "../../utils/types/app.error";
import { ApiResponse } from "../../utils/types/app.response.type";
import {
  AreaOfWorkResponse,
  AreaOfWorkGetResponse,
  AreaOfWorkListResponse,
} from "./area.of.work.types";

// Helper to convert area to response
const areaToResponse = (area: any): AreaOfWorkResponse => {
  return {
    id: area._id.toString(),
    title: area.title,
    description: area.description,
    isActive: area.isActive,
    createdAt: area.createdAt,
    updatedAt: area.updatedAt,
  };
};

export const createAreaOfWorkController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate body
    const parsed = createAreaOfWorkSchema.parse(req.body);

    // 2. Create area
    const area = await AreaOfWorkModel.create(parsed);

    // 3. Response
    const response: AreaOfWorkGetResponse = {
      success: true,
      message: "Area of work created successfully",
      data: areaToResponse(area),
    };

    res.status(201).json(response);
  },
);

export const getAllAreasOfWorkController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch all areas
    const areas = await AreaOfWorkModel.find().sort({ createdAt: -1 });

    // 2. Response
    const response: AreaOfWorkListResponse = {
      success: true,
      message: "Areas of work retrieved successfully",
      data: areas.map(areaToResponse),
    };

    res.status(200).json(response);
  },
);

export const getActiveAreasOfWorkController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch only active areas
    const areas = await AreaOfWorkModel.find({ isActive: true }).sort({ createdAt: -1 });

    // 2. Response
    const response: AreaOfWorkListResponse = {
      success: true,
      message: "Active areas of work retrieved successfully",
      data: areas.map(areaToResponse),
    };

    res.status(200).json(response);
  },
);

export const getAreaOfWorkByIdController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find area
    const area = await AreaOfWorkModel.findById(id);

    if (!area) {
      throw notFound("Area of work not found");
    }

    // 3. Response
    const response: AreaOfWorkGetResponse = {
      success: true,
      message: "Area of work retrieved successfully",
      data: areaToResponse(area),
    };

    res.status(200).json(response);
  },
);

export const updateAreaOfWorkController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID and body
    const { id } = req.params;
    const parsed = updateAreaOfWorkSchema.parse(req.body);

    // 2. Find and update area
    const area = await AreaOfWorkModel.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    });

    if (!area) {
      throw notFound("Area of work not found");
    }

    // 3. Response
    const response: AreaOfWorkGetResponse = {
      success: true,
      message: "Area of work updated successfully",
      data: areaToResponse(area),
    };

    res.status(200).json(response);
  },
);

export const deleteAreaOfWorkController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find and delete area
    const area = await AreaOfWorkModel.findByIdAndDelete(id);

    if (!area) {
      throw notFound("Area of work not found");
    }

    // 3. Response
    const response: ApiResponse<void> = {
      success: true,
      message: "Area of work deleted successfully",
      data: undefined,
    };

    res.status(200).json(response);
  },
);