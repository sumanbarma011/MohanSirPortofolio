import { queryKeys } from "@/lib/QueryKeys";
import { ApiPost, ApiPut } from "@/providers/axiosInstance";
import { mutationOptions } from "@tanstack/react-query";
import { UserType } from "./auth.types";
import { ApiPath } from "@/lib/ApiPath";
import { ChangePasswordType } from "./auth.schema";

export const updateMutationQueryOptions = mutationOptions({
  mutationKey: [queryKeys.auth.update],
  mutationFn: (data: Partial<UserType>) =>
    ApiPut<UserType>(ApiPath.auth.update, data),
});

export const changePasswordMutationOptions = () =>
  mutationOptions({
    mutationKey: [queryKeys.auth.changePassword],
    mutationFn: (data: ChangePasswordType) =>
      ApiPost<null>(ApiPath.auth.changePassword, data),
  });
