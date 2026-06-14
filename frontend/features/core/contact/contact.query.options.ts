import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";
import { ApiGet, ApiPost } from "@/providers/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createContactType } from "./contact.schema";
import { ContactResponseType } from "./contact.types";

// for viewer
export const createContactMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.contact.create],
    mutationFn: (data: createContactType) =>
      ApiPost<ContactResponseType>(ApiPath.contact.create, data),
  });

// get all contact for admin
export const getAllContactsQueryOptions = queryOptions({
  queryKey: [queryKeys.contact.read],
  queryFn: () => ApiGet<ContactResponseType[]>(ApiPath.contact.read),
});
