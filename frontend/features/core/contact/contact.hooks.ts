import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createContactSchema, createContactType } from "./contact.schema";
import { ApiResponse } from "@/lib/global.types";
import { ContactResponseType } from "./contact.types";
import { createContactMutationOptions } from "./contact.query.options";

export interface UseContactFormProps {
  onSuccess?: (data: ApiResponse<ContactResponseType>) => void;
  onError?: (error: Error) => void;
}

export const useContactForm = (props?: UseContactFormProps) => {
  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation(createContactMutationOptions());

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      service: [],
      message: "",
      phone: "",
      subject: "",
    } as createContactType,
    validators: {
      onChange: createContactSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          form.reset();
        },
        onError: (err) => {
          props?.onError?.(
            err instanceof Error ? err : new Error("Mutation failed"),
          );
        },
      });
    },
  });

  // Return everything the page needs to render and manage the form
  return {
    form,
    isSubmitting: isPending,
    mutationError,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
  };
};

export type UseContactFormReturn = ReturnType<typeof useContactForm>;
