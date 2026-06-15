import { queryKeys } from "@/lib/QueryKeys";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryClient } from "@/providers/query-client";
import { createServiceSchema, CreateServiceInput } from "./service.schema";
import { createServicesMutationOptions } from "./services.query.option";

export interface UseServiceFormProps {
  onSuccess?: () => void;
}

export const useServiceForm = (props?: UseServiceFormProps) => {
  const router = useRouter();

  const createMutation = useMutation({
    ...createServicesMutationOptions,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.services.get] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    } as CreateServiceInput,
    validators: {
      onChange: createServiceSchema,
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync(value);
      if (props?.onSuccess) {
        props.onSuccess();
      } else {
        router.push("/admin/services");
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
    isSubmitting: createMutation.isPending,
    mutationError: createMutation.error,
  };
};

export type UseServiceFormReturn = ReturnType<typeof useServiceForm>;
