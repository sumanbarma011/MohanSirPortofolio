"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FileText, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSpecificBlogsQueryOptions } from "@/features/core/blogs/blog.query.options";
import { UpdateBlogForm } from "@/features/core/blogs/components/UpdateBlogForm";

export default function UpdateBlogPage() {
  const router = useRouter();
  const params = useParams();

  const blogId = params.blogId as string;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(getSpecificBlogsQueryOptions(blogId));

  // Safely extract the data payload envelope matching your custom Axios instance structure
  const blogData = response?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-muted" />
          <Skeleton className="h-4 w-72 bg-muted" />
        </div>
        <Skeleton className="h-[450px] w-full bg-muted rounded-xl border border-border" />
      </div>
    );
  }

  if (isError || !blogData) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-center space-y-4">
        <h2 className="text-sm font-semibold text-destructive">
          Failed to load blog post configurations
        </h2>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Edit Blog Post
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Modify content layers, update text components or adjust galleries.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 border-border text-foreground bg-card shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" /> Cancel
        </Button>
      </div>

      {/* Mount form and cleanly transform the author object to its scalar ID string to match Zod target schemas */}
      <UpdateBlogForm
        blogId={blogId}
        initialData={{
          title: blogData.title,
          content: blogData.content,
          author: blogData.author?._id ?? "", // Extracted ID string from UserType object context mapping safely
          images: blogData.images ?? [],
        }}
      />
    </div>
  );
}
