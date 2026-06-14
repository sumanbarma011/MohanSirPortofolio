import { create } from "zustand";

import { toast } from "sonner";
import { LoginType } from "../auth.schema";
import { ApiResponse } from "@/lib/global.types";
import { ApiGet, ApiPost } from "@/providers/axiosInstance";
import { UserType } from "../auth.types";
import { ApiPath } from "@/lib/ApiPath";
import { redirect } from "next/navigation";

interface AuthState {
  user: UserType | null;
  login: (loginData: LoginType) => Promise<UserType>;
  logout: () => void;
  setUser: (userData: UserType | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  setUser: (data) => {
    if (!data) return;
    set({ user: data });
  },

  login: async (loginData) => {
    const res = await ApiPost<UserType>(ApiPath.auth.login, loginData);
    set({ user: res.data });
    return res.data as UserType;
  },

  logout: async () => {
    try {
      const res = await ApiGet<ApiResponse<undefined>>(ApiPath.auth.logout);
      toast(res.data.message || "Logout succesfully");
    } catch {
      // console.error("Backend logout failed to respond cleanly:", error);
    } finally {
      set({ user: null });

      return redirect("/");
    }
  },
}));
