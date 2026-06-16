"use client";
import { useQuery } from "@tanstack/react-query";
import { BlogImages } from "./blog-images";
import { getSpecificBlogsQueryOptions } from "../blog.query.options";
import { BlogPost } from "../blog.types";

const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <header className="mb-10">
        <div className="h-4 w-24 bg-muted rounded mb-4" /> {/* Date */}
        <div className="h-12 w-3/4 bg-muted rounded mb-3" />{" "}
        {/* Title Line 1 */}
        <div className="h-12 w-1/2 bg-muted rounded mb-6" />{" "}
        {/* Title Line 2 */}
        {/* Author Block Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded" /> {/* Avatar */}
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-muted rounded" /> {/* Author ID */}
            <div className="h-3 w-24 bg-muted rounded" /> {/* Updated Date */}
          </div>
        </div>
      </header>

      {/* Image Gallery Skeleton Placeholder */}
      <div className="w-full h-64 bg-muted rounded-lg mb-10" />

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded pt-4" />
        <div className="h-4 w-4/5 bg-muted rounded" />
      </div>
    </div>
  );
}

export function Blog({ blogId }: { blogId: string }) {
  // 1. Fetch data using your TanStack query options
  const { data, isLoading, isError } = useQuery(
    getSpecificBlogsQueryOptions(blogId),
  );

  // 2. Handle Loading / Skeleton State
  if (isLoading) {
    return <BlogSkeleton />;
  }

  // 3. Handle Error State
  if (isError) {
    return <p className="text-destructive">Error loading blog post.</p>;
  }

  const blog: BlogPost | null = data?.data ?? null;

  // 4. Handle Empty/Not Found State
  if (!blog) {
    return <p className="text-muted-foreground">Blog record not found.</p>;
  }

  return (
    <>
      {/* Article Header */}
      <header className="mb-4 text-foreground">
        <time className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
          {formatDate(blog.createdAt)}
        </time>
        <h1 className="text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-muted-foreground">
          {/* Avatar using secondary semantic color mapping */}
          <div className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center font-bold rounded">
            {blog.author?.name && blog.author?.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Author Name: {blog.author?.name ?? "No Name"}
            </p>
            <p className="text-sm">Updated: {formatDate(blog.updatedAt)}</p>
          </div>
        </div>
      </header>

      {/* Featured Image Gallery */}
      {blog.images && blog.images.length > 0 && (
        <BlogImages
          images={blog.images as unknown as string[]}
          title={blog.title}
        />
      )}

      {/* Article Content */}
      <article className="mb-3 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
        <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
          {blog.content}
        </div>
      </article>
    </>
  );
}
