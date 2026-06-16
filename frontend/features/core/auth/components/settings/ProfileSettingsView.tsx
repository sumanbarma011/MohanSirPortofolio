"use client";

import React, { useRef } from "react";
import Image from "next/image"; // Next.js image optimization
import {
  Camera,
  Lock,
  Bell,
  ShieldCheck,
  Edit3,
  Save,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UseUpdateAdminFormReturn } from "../../hooks/useUpdateAdminForm";
import { UserType } from "../../auth.types";

type PresenterProps = {
  user: UserType;
  formController: UseUpdateAdminFormReturn;
};

export function ProfileSettingsView({ user, formController }: PresenterProps) {
  const {
    form,
    isEditing,
    setIsEditing,
    handleCancel,
    handleSubmit,
    isSubmitting,
    isUploading,
    uploadImage,
  } = formController;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadImage(file);
    } catch (err) {
      console.error("Avatar image upload context error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Account settings</h1>

        {/* Read-Only Mode Switcher Bar */}
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Spinner className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Area Container */}
        <main className="flex-1 bg-card rounded-lg border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <form.Field name="images">
              {(field) => {
                const currentImgUrl =
                  field.state.value?.url ||
                  user.images?.url ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256";
                return (
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-28 h-28">
                      <Image
                        src={currentImgUrl}
                        alt="Profile avatar"
                        fill
                        priority
                        className="rounded-full object-cover border border-border"
                        sizes="(max-w-768px) 112px, 112px"
                      />
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                          {isUploading ? (
                            <Spinner className="w-4 h-4" />
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex items-center gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          Upload New
                        </Button>
                        {field.state.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => field.handleChange(null)}
                          >
                            Delete avatar
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Name Field */}
              <form.Field name="name">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      disabled={!isEditing}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email Field */}
              <form.Field name="email">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      disabled={!isEditing}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all"
                    />
                    {field.state.meta.errors && (
                      <p className="text-xs text-destructive mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Mobile Placeholder */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Mobile Number <span className="text-destructive">*</span>
                </label>
                <div className="flex rounded-lg border border-input bg-muted text-muted-foreground cursor-not-allowed overflow-hidden">
                  <div className="flex items-center gap-1 px-3 bg-secondary border-r border-input text-sm select-none">
                    <span>🇳🇬</span>
                  </div>
                  <input
                    type="tel"
                    disabled
                    placeholder="0806 123 7890"
                    className="w-full px-3.5 py-2.5 bg-transparent focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* ID Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  ID
                </label>
                <input
                  type="text"
                  readOnly
                  value={user._id}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-muted text-muted-foreground cursor-not-allowed font-mono text-sm"
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
