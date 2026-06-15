import { Request, Response } from "express";
import { createServiceSchema, updateServiceSchema } from "./service.schema";
import { ServiceModel } from "./service.model";
import { catchAsync } from "../../utils/async.handler";
import { notFound } from "../../utils/types/app.error";
import { ApiResponse } from "../../utils/types/app.response.type";
import {
  ServiceResponse,
  ServiceGetResponse,
  ServiceListResponse,
} from "./service.types";

// Helper to convert service to response
const serviceToResponse = (service: any): ServiceResponse => {
  return {
    id: service._id.toString(),
    name: service.name,
    description: service.description,
    isActive: service.isActive,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  };
};

export const createServiceController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate body
    const parsed = createServiceSchema.parse(req.body);

    // 2. Create service
    const service = await ServiceModel.create(parsed);

    // 3. Response
    const response: ServiceGetResponse = {
      success: true,
      message: "Service created successfully",
      data: serviceToResponse(service),
    };

    res.status(201).json(response);
  },
);

export const getAllServicesController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch all services
    const services = await ServiceModel.find().sort({ createdAt: -1 });

    // 2. Response
    const response: ServiceListResponse = {
      success: true,
      message: "Services retrieved successfully",
      data: services.map(serviceToResponse),
    };

    res.status(200).json(response);
  },
);

export const getActiveServicesController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch only active services
    const services = await ServiceModel.find({ isActive: true }).sort({
      createdAt: -1,
    });

    // 2. Response
    const response: ServiceListResponse = {
      success: true,
      message: "Active services retrieved successfully",
      data: services.map(serviceToResponse),
    };

    res.status(200).json(response);
  },
);

export const getServiceByIdController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find service
    const service = await ServiceModel.findById(id);

    if (!service) {
      throw notFound("Service not found");
    }

    // 3. Response
    const response: ServiceGetResponse = {
      success: true,
      message: "Service retrieved successfully",
      data: serviceToResponse(service),
    };

    res.status(200).json(response);
  },
);

export const updateServiceController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID and body
    const { id } = req.params;
    const parsed = updateServiceSchema.parse(req.body);

    // 2. Find and update service
    const service = await ServiceModel.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      throw notFound("Service not found");
    }

    // 3. Response
    const response: ServiceGetResponse = {
      success: true,
      message: "Service updated successfully",
      data: serviceToResponse(service),
    };

    res.status(200).json(response);
  },
);

export const deleteServiceController = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Validate ID
    const { id } = req.params;

    // 2. Find and delete service
    const service = await ServiceModel.findByIdAndDelete(id);

    if (!service) {
      throw notFound("Service not found");
    }

    // 3. Response
    const response: ApiResponse<void> = {
      success: true,
      message: "Service deleted successfully",
      data: undefined,
    };

    res.status(200).json(response);
  },
);
// Get Services for Contact Form (Public - No Auth)
export const getServicesForContactController = catchAsync(
  async (_req: Request, res: Response) => {
    // 1. Fetch only active services
    const services = await ServiceModel.find({ isActive: true })
      .select("id name")
      .sort({ name: 1 });

    // 2. Transform to contact-friendly format
    const servicesForContact = services.map((service) => ({
      id: service.id,
      name: service.name,
    }));

    // 3. Response
    const response: ApiResponse<{ id: string; name: string }[]> = {
      success: true,
      message: "Services retrieved successfully",
      data: servicesForContact,
    };

    res.status(200).json(response);
  },
);
