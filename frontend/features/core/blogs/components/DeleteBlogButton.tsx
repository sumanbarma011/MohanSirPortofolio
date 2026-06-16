"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryKeys } from "@/lib/QueryKeys";
import { deleteBlogMutationOptions } from "../blog.query.options";
import { ConfirmAlert } from "@/components/AlertConfirmDialog";

interface DeleteBlogButtonProps {
  blogId: string;
  isLoggedIn: boolean;
}

export function DeleteBlogButton({
  blogId,
  isLoggedIn,
}: DeleteBlogButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...deleteBlogMutationOptions(),
    onSuccess: () => {
      toast.success("Blog post has been permanently deleted.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.blog.read] });
      router.push(isLoggedIn ? "/admin/blogs" : "/blogs");
      router.refresh();
    },
    onError: (error) => {
      console.error("Delete operation failure:", error);
      toast.error("Failed to delete the blog post.");
    },
  });

  return (
    <ConfirmAlert
      title="Delete Blog Post?"
      description="You are about to permanently erase this blog entry. This will wipe all comments, image associations, and markdown text nodes forever."
      confirmText="Permanently Erase"
      variant="destructive"
      disabled={isPending}
      onConfirm={() => mutate(blogId)} // Executed securely on confirmation callback pass
    >
      {/* Target child element that opens the modal box */}
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        className="px-6 py-6 font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none transition-colors gap-2"
      >
        {isPending ? (
          <Spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        {isPending ? "Deleting..." : "Delete Blog"}
      </Button>
    </ConfirmAlert>
  );
}
