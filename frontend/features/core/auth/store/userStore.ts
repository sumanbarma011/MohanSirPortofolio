import { create } from "zustand";
import { toast } from "sonner";
import { LoginType } from "../auth.schema";
import { ApiResponse } from "@/lib/global.types";
import { ApiGet, ApiPost } from "@/providers/axiosInstance";
import { UserType } from "../auth.types";
import { ApiPath } from "@/lib/ApiPath";
interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (loginData: LoginType) => Promise<UserType>;
  logout: () => Promise<void>;
  setUser: (userData: UserType | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false, // Initial state defaults to false

  setUser: (data) => {
    set({
      user: data,
      isAuthenticated: !!data,
    });
  },

  login: async (loginData) => {
    const res = await ApiPost<UserType>(ApiPath.auth.login, loginData);

    set({
      user: res.data,
      isAuthenticated: true,
    });

    return res.data as UserType;
  },

  logout: async () => {
    try {
      const res = await ApiGet<ApiResponse<undefined>>(ApiPath.auth.logout);
      toast(res.data.message || "Logout successfully");
    } catch (error) {
    } finally {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
      // Clear state variables back to unauthenticated baselines
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
