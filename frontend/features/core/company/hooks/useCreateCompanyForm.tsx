"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createCompanyMutationOptions,
  createCompanySchema,
  CreateCompanyType,
} from "../company.query.options";
import { uploadImageMutationOptions } from "../../blogs/blog.query.options";

export const useCreateCompanyForm = () => {
  const router = useRouter();
  const mutation = useMutation(createCompanyMutationOptions());
  const uploadMutation = useMutation(uploadImageMutationOptions());

  const form = useForm({
    defaultValues: {
      companyName: "",
      description: "",
      logo: null,
    } as CreateCompanyType,
    validators: {
      onChange: createCompanySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync(value);
        toast.success("Company created successfully!");

        router.push("/admin/company");
        router.refresh();
      } catch (err) {
        console.error("Failed to register corporate profile:", err);
        toast.error(
          "Failed to build company profile. Please verify your inputs.",
        );
      }
    },
  });

  const uploadImage = async (file: File) => {
    const response = await uploadMutation.mutateAsync(file);
    if (!response.data) {
      throw new Error("Upload failed");
    }
    return response.data[0];
  };

  return {
    form,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    isSubmitting: mutation.isPending,
    uploadImage,
    isUploading: uploadMutation.isPending,
  };
};

export type UseCreateCompanyFormReturn = ReturnType<
  typeof useCreateCompanyForm
>;
