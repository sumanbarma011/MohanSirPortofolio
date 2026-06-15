import { ApiPath } from "@/lib/ApiPath";
import { queryKeys } from "@/lib/QueryKeys";
import { ApiGet } from "@/providers/axiosInstance";
import { queryOptions } from "@tanstack/react-query";

export const getAllSkillQueryOptions = queryOptions({
  queryKey: [queryKeys.skills.get],
  queryFn: () => ApiGet(ApiPath.skills.get),
});
