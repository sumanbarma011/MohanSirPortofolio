import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";
import { ApiGet } from "@/providers/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../auth.types";

export const useUser = () =>
  useQuery({
    queryKey: [queryKeys.auth.me],
    queryFn: () => ApiGet<UserType>(ApiPath.auth.me),
  });
