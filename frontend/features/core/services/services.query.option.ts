import { ApiGet, ApiPost } from "@/providers/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { Service } from "./service.types";
import { ApiPath } from "@/lib/ApiPath";
import { CreateServiceInput } from "./service.schema";

export const getAllServicesQueryOptions = queryOptions({
  queryKey: [ApiPath.services.getAll],
  queryFn: () => ApiGet<Service[]>(ApiPath.services.getAll),
});

export const createServicesMutationOptions = mutationOptions({
  mutationKey: [ApiPath.services.create],
  mutationFn: (newService: CreateServiceInput) =>
    ApiPost<Service>(ApiPath.services.create, newService),
});
