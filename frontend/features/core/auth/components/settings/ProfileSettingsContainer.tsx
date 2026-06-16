"use client";

import React from "react";
import { useAuthStore } from "@/features/core/auth/store/userStore";
import { ProfileSettingsView } from "./ProfileSettingsView";
import { useUpdateAdminForm } from "../../hooks/useUpdateAdminForm";

export default function ProfileSettingsContainer() {
  const user = useAuthStore((state) => state.user)!; // since if no user the user can't come to this page, so, we ensure the user is always there

  const formController = useUpdateAdminForm({
    user,
    onSuccess: () => {
      console.log(
        "Profile data successfully saved into DB context via mutation.",
      );
    },
  });

  if (!user) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading admin workspace context profile...
      </div>
    );
  }

  return <ProfileSettingsView user={user} formController={formController} />;
}
