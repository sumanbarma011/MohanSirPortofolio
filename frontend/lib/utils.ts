import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { ApiError } from "./global.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses Axios errors to match your specific backend ApiError type.
 */
export const extractApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as Partial<ApiError>;
    return {
      status: false,
      message:
        data.message ||
        error.message ||
        "An unexpected network error occurred.",
      errors: data.errors || [],
    };
  }

  return {
    status: false,
    message:
      error instanceof Error ? error.message : "An unknown error occurred.",
    errors: [],
  };
};
