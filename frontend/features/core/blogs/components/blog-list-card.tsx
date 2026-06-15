"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBlogsQueryOptions } from "../blog.query.options";
import { BlogPost } from "../blog.types";

export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

type BlogListCardProps = {
  blog: BlogPost;
};

export function BlogListCard({ blog }: BlogListCardProps) {
  const imageUrls = blog.images.map((img) => img.url);

  return (
    <article className="border-2 border-border overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground">
      {imageUrls.length > 0 && (
        <div className="relative h-64 w-full bg-muted">
          <Image
            src={imageUrls[0]}
            alt={blog.title}
            fill
            className="object-cover"
          />
          {imageUrls.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-secondary text-secondary-foreground px-3 py-1 text-sm font-semibold rounded">
              +{imageUrls.length - 1} more
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <time className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
          {formatDate(blog.createdAt)}
        </time>

        <h2 className="text-2xl font-bold text-foreground mt-3 mb-3 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-sm text-muted-foreground mb-2">
          By {blog?.author?.name}
        </p>

        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {truncateText(blog.content)}
        </p>

        <Link
          href={`/admin/blogs/${blog.id}`}
          className="inline-block px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors"
        >
          See More →
        </Link>
      </div>
    </article>
  );
}

export function Blogs() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery(
    getAllBlogsQueryOptions,
  );

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-2 border-border overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Failed to fetch blogs</h3>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected server error occurred."}
          </p>
        </div>
        <Button onClick={() => refetch()} className="gap-2">
          <RefreshCw
            className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  const blogs = Array.isArray(data?.data) ? data.data : [];

  if (blogs.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="border-2 border-border inline-block p-12">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            No blogs yet
          </h3>
          <p className="text-muted-foreground">
            Create your first blog post to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {blogs.map((blog) => (
        <BlogListCard key={blog.id} blog={blog} />
      ))}
    </>
  );
}
