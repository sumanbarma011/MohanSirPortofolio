"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner"; // Or your preferred notification package
import { changePasswordMutationOptions } from "../auth.query.options";
import { changePasswordSchema, ChangePasswordType } from "../auth.schema";

export const useChangePasswordForm = () => {
  const mutation = useMutation(changePasswordMutationOptions());

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    } as ChangePasswordType,
    validators: {
      onChange: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync(value);
        toast.success("Password updated successfully!");
        form.reset();
      } catch (err) {
        console.error("Password update failure:", err);
        toast.error(
          "Failed to change password. Please verify your current password.",
        );
      }
    },
  });

  return {
    form,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
};

export type UseChangePasswordFormReturn = ReturnType<
  typeof useChangePasswordForm
>;
