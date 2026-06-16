"use client";

import React, { useState } from "react";
import { User, Lock, Bell, ShieldCheck, Menu } from "lucide-react";
import { ProfileSettingsView } from "./ProfileSettingsView";
import { PasswordSettingsView } from "./PasswordSettingsView";
import { useUpdateAdminForm } from "../../hooks/useUpdateAdminForm";
import { useChangePasswordForm } from "../../hooks/useChangePasswordForm";
import { useAuthStore } from "../../store/userStore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type SettingsTab = "profile" | "password";

// 1. Define explicit types for your extracted pure component
type NavigationLinksProps = {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
  setIsMobileOpen: (open: boolean) => void;
};

// 2. Pure static file-scope component (Never breaks runtime memory states or breaks focus)
const NavigationLinks = ({
  activeTab,
  setActiveTab,
  setIsMobileOpen,
}: NavigationLinksProps) => (
  <nav className="space-y-1">
    <button
      onClick={() => {
        setActiveTab("profile");
        setIsMobileOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all ${
        activeTab === "profile"
          ? "bg-accent text-accent-foreground border-r-4 border-primary"
          : "text-muted-foreground hover:bg-muted/50"
      }`}
    >
      <User className="w-4 h-4" />
      Profile Settings
    </button>

    <button
      onClick={() => {
        setActiveTab("password");
        setIsMobileOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all ${
        activeTab === "password"
          ? "bg-accent text-accent-foreground border-r-4 border-primary"
          : "text-muted-foreground hover:bg-muted/50"
      }`}
    >
      <Lock className="w-4 h-4" />
      Password
    </button>

    <button
      type="button"
      disabled
      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-muted-foreground/50 cursor-not-allowed opacity-50"
    >
      <Bell className="w-4 h-4" /> Notifications
    </button>

    <button
      type="button"
      disabled
      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-muted-foreground/50 cursor-not-allowed opacity-50"
    >
      <ShieldCheck className="w-4 h-4" /> Verification
    </button>
  </nav>
);

export default function ProfileSettingsWrapper() {
  const user = useAuthStore((u) => u.user!);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const profileController = useUpdateAdminForm({ user });
  const passwordController = useChangePasswordForm();

  const tabLabels: Record<SettingsTab, string> = {
    profile: "Profile Settings",
    password: "Password Security",
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Account settings
          </h1>
          <p className="text-sm text-muted-foreground xl:hidden mt-1">
            Currently viewing:{" "}
            <span className="font-semibold text-primary">
              {tabLabels[activeTab]}
            </span>
          </p>
        </div>

        {/* Mobile View Drawer */}
        <div className="xl:hidden">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] sm:w-[320px] p-4 bg-card"
            >
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-lg font-bold text-foreground">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              {/* Pass state handlers safely down to components */}
              <NavigationLinks
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsMobileOpen={setIsMobileOpen}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Desktop Sidebar Panel */}
        <aside className="hidden xl:block w-64 bg-card rounded-lg border border-border p-2 h-fit">
          <NavigationLinks
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsMobileOpen={setIsMobileOpen}
          />
        </aside>

        <main className="flex-1 bg-card rounded-lg border border-border p-4 sm:p-8">
          {activeTab === "profile" ? (
            <ProfileSettingsView
              user={user}
              formController={profileController}
            />
          ) : (
            <PasswordSettingsView formController={passwordController} />
          )}
        </main>
      </div>
    </div>
  );
}
