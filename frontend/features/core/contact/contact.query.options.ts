import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";
import { ApiGet, ApiPost } from "@/providers/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createContactType } from "./contact.schema";
import { ApiResponse } from "@/lib/global.types";
import { ContactResponseType } from "./contact.types";
import { MOCK_CONTACTS_DATA } from "@/mockdata/ContactData";

// for viewer
export const createContactMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.contact.create],
    mutationFn: (data: createContactType) =>
      ApiPost<ApiResponse<ContactResponseType>>(ApiPath.contact.create, data),
  });

// get all contact for admin
export const getAllContactsQueryOptions = queryOptions({
  queryKey: [queryKeys.contact.read],
  // queryFn: () => ApiGet<ContactResponseType>(ApiPath.contact.read),
  queryFn: () => MOCK_CONTACTS_DATA,
});
