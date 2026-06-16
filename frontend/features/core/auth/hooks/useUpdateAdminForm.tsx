"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/QueryKeys";
import { UserType } from "../auth.types";
import { uploadImageMutationOptions } from "../../blogs/blog.query.options";
import { updateMutationQueryOptions } from "../auth.query.options";
import { updateAdminSchema, UpdateAdminType } from "../auth.schema";

interface UseUpdateAdminFormProps {
  user: UserType;
  onSuccess?: () => void;
}

export const useUpdateAdminForm = ({
  user,
  onSuccess,
}: UseUpdateAdminFormProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Mutations
  const uploadMutation = useMutation(uploadImageMutationOptions());
  const updateMutation = useMutation({
    ...updateMutationQueryOptions,
    onSettled: () => {
      // Invalidate auth/user queries to trigger header/profile refetching
      queryClient.invalidateQueries({ queryKey: [queryKeys.auth.update] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      images: user.images
        ? { url: user.images.url, cloudinaryId: user.images.url }
        : null,
    } as UpdateAdminType,
    validators: {
      onChange: updateAdminSchema,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync(value);
      setIsEditing(false); // Drop back out to view mode dynamically
      if (onSuccess) onSuccess();
    },
  });

  // Image Upload Logic Integration
  const uploadImage = async (file: File) => {
    const response = await uploadMutation.mutateAsync(file);
    if (!response.data) {
      throw new Error("Upload failed");
    }
    const uploadedImage = response.data[0]; // Returns CloudinaryImage

    // Explicitly update TanStack Form state field for images
    form.setFieldValue("images", {
      url: uploadedImage.url,
      cloudinaryId: uploadedImage.cloudinaryId,
    });

    return uploadedImage;
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return {
    form,
    isEditing,
    setIsEditing,
    handleCancel,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    isSubmitting: updateMutation.isPending,
    isUploading: uploadMutation.isPending,
    mutationError: updateMutation.error,
    uploadImage,
  };
};

export type UseUpdateAdminFormReturn = ReturnType<typeof useUpdateAdminForm>;
