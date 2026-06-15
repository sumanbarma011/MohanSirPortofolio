import { ApiResponse } from "@/lib/global.types";
import { queryKeys } from "@/lib/QueryKeys";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createBlogMutationOptions,
  uploadImageMutationOptions,
} from "./blog.query.options";
import { createBlogSchema, CreateBlogType } from "./blog.schema";
import { queryClient } from "@/providers/query-client";

export interface UseCreateBlogFormProps {
  onSuccess?: () => void;
}

export const useCreateBlogForm = (props?: UseCreateBlogFormProps) => {
  const router = useRouter();

  const uploadMutation = useMutation(uploadImageMutationOptions());

  const createMutation = useMutation({
    ...createBlogMutationOptions(),
    // onMutate: async (newBlog: CreateBlogType) => {
    //   return ;
    //   await queryClient.cancelQueries({ queryKey: [queryKeys.blog.read] });
    //   const previous = queryClient.getQueryData<ApiResponse<BlogPost[]>>([
    //     queryKeys.blog.read,
    //   ]);

    //   const optimisticPost: Omit<BlogPost,"author"> = {
    //     id: `temp-${Date.now()}`,
    //     title: newBlog.title,
    //     content: newBlog.content,
    //     images: newBlog.images,
    //     Slug: newBlog.title
    //       .toLowerCase()
    //       .replace(/[^a-z0-9]+/g, "-")
    //       .replace(/(^-|-$)/g, ""),
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //   };

    //   queryClient.setQueryData<ApiResponse<Omit<BlogPost, author>>>(
    //     [queryKeys.blog.read],
    //     (old) => ({
    //       ...(old ?? { status: true, message: "", data: [] }),
    //       data: [optimisticPost, ...(old?.data ?? [])],
    //     }),
    //   );

    //   return { previous };
    // },
    // onError: (_err, _vars, context) => {
    //   if (context?.previous) {
    //     queryClient.setQueryData([queryKeys.blog.read], context.previous);
    //   }
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.blog.read] });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      author: "",
      images: [],
    } as CreateBlogType,
    validators: {
      onChange: createBlogSchema,
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync(value);
      if (props?.onSuccess) {
        props.onSuccess();
      } else {
        router.push("/admin/blogs");
      }
    },
  });

  const uploadImage = async (file: File) => {
    const response = await uploadMutation.mutateAsync(file);
    console.log(response, "the response of cloudinary is: ");
    if (!response.data) {
      throw new Error("Upload failed");
    }
    console.log("the res of cloudinary is: ", response.data);
    return response.data[0];
  };

  return {
    form,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    isSubmitting: createMutation.isPending,
    isUploading: uploadMutation.isPending,
    mutationError: createMutation.error,
    uploadImage,
  };
};

export type UseCreateBlogFormReturn = ReturnType<typeof useCreateBlogForm>;
