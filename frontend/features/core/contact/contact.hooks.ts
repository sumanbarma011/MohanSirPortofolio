import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createContactSchema, createContactType } from "./contact.schema";
import { ApiResponse } from "@/lib/global.types";
import { ContactResponseType } from "./contact.types";
import { createContactMutationOptions } from "./contact.query.options";
import { useContactStore } from "./contact.store";

export interface UseContactFormProps {
  onSuccess?: (data: ApiResponse<ContactResponseType>) => void;
  onError?: (error: Error) => void;
}

export const useContactForm = (props?: UseContactFormProps) => {
  const setSubmittedData = useContactStore((state) => state.setSubmittedData);

  const {
    mutateAsync,
    isPending,
    error: mutationError,
  } = useMutation(createContactMutationOptions());

  const form = useForm({
    defaultValues: {
      name: "Roshan Pokharel",
      email: "email@gmail.com",
      service: ["ADVISORY"],
      message: "Hello how are you mohan",
      phone: "9867473181",
      subject: "Hello",
    } as createContactType,
    validators: {
      onChange: createContactSchema,
    },
    onSubmit: async ({ value }) => {
      const responseData = await mutateAsync(value);

      setSubmittedData(responseData.data);
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
