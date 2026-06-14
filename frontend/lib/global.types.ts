export type ApiResponse<T = null> = {
  status: boolean;
  data: T;
  message: string;
};
export type ApiError = {
  status: boolean;
  errors: string[];
  message: string;
};
