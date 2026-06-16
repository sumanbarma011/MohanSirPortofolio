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
  /** Optional text label. If omitted, the button defaults strictly to an icon-only square button */
  label?: string;
}

export function DeleteBlogButton({
  blogId,
  isLoggedIn,
  label,
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
      onConfirm={() => mutate(blogId)}
    >
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        // Dynamically shift sizing models: "icon" sets up a balanced square container, "default" allows normal paddings
        size={label ? "default" : "icon"}
        className={`bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-colors gap-2 h-11 ${
          label ? "px-6 font-semibold" : "w-11"
        }`}
      >
        {isPending ? (
          <Spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}

        {/* Render text definitions safely only when label is present */}
        {label && <span>{isPending ? "Deleting..." : label}</span>}
      </Button>
    </ConfirmAlert>
  );
}
