import { ApiPath } from "@/lib/ApiPath";
import { ApiResponse } from "@/lib/global.types";
import { extractApiError } from "@/lib/utils";
import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL ?? "http://localhost:5000",
  withCredentials: true,
});

// handle refresh if 401
axiosInstance.interceptors.response.use(
  (res) => res, // Success path is fine
  async (error) => {
    // 1. Grab the config of the failed request safely
    const config = error.config;

    // 2. Check error.response (not config.response)
    if (error.response?.status === 401 && !config._retry) {
      // 3. Set the retry flag immediately so this specific request never loops
      config._retry = true;

      try {
        // 4. Hit your backend refresh endpoint
        const res = await axiosInstance.get(ApiPath.auth.refresh);

        // 5. Check if the backend successfully rotated the token
        // (Usually backends return the new token string, adjust to your API payload)
        const isNewToken = res.data.success as boolean;

        if (isNewToken) {
          // 6. Re-execute the original request with the new token and return it
          return axiosInstance(config);
        }
      } catch (refreshError) {
        // If the refresh token itself is not present, move the user  to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // CRITICAL: If the error wasn't a 401, you MUST pass the error back down.
    // Otherwise, TanStack Query will think the API succeeded with 'undefined'.
    return Promise.reject(error);
  },
);

// GET Method
export const ApiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<T>>(url, config);
    return res.data;
  } catch (error) {
    throw extractApiError(error);
  }
};

// POST Method
export const ApiPost = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const res = await axiosInstance.post<ApiResponse<T>>(url, data, config);
    return res.data;
  } catch (error) {
    throw extractApiError(error);
  }
};

// PUT Method
export const ApiPut = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const res = await axiosInstance.put<ApiResponse<T>>(url, data, config);
    return res.data;
  } catch (error) {
    throw extractApiError(error);
  }
};

// PATCH Method
export const ApiPatch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const res = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return res.data;
  } catch (error) {
    throw extractApiError(error);
  }
};

// DELETE Method
export const ApiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const res = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return res.data;
  } catch (error) {
    throw extractApiError(error);
  }
};
