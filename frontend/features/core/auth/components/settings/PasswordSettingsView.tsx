"use client";

import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { UseChangePasswordFormReturn } from "../../hooks/useChangePasswordForm";

type PasswordSettingsViewProps = {
  formController: UseChangePasswordFormReturn;
};

export function PasswordSettingsView({
  formController,
}: PasswordSettingsViewProps) {
  const { form, handleSubmit, isSubmitting } = formController;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Update Password</h3>
        <p className="text-sm text-muted-foreground">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {/* Current Password Field */}
        <form.Field name="currentPassword">
          {(field) => (
            <div className="space-y-1.5">
              <Label
                htmlFor={field.name}
                className="font-semibold text-foreground"
              >
                Current Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="Enter current password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-background text-foreground"
              />
              {field.state.meta.errors && (
                <p className="text-xs text-destructive mt-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* New Password Field */}
        <form.Field name="newPassword">
          {(field) => (
            <div className="space-y-1.5">
              <Label
                htmlFor={field.name}
                className="font-semibold text-foreground"
              >
                New Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="Enter new secure password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-background text-foreground"
              />
              {field.state.meta.errors && (
                <p className="text-xs text-destructive mt-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}
