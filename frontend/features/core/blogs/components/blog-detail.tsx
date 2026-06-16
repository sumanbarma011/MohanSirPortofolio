"use client";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Suspense } from "react";
import { Blog } from "./blog";
import { useAuthStore } from "../../auth/store/userStore";
import { DeleteBlogButton } from "./DeleteBlogButton";
import { Edit2Icon } from "lucide-react";

export default function BlogDetailPage({ blogId }: { blogId: string }) {
  const isLoggedIn = useAuthStore((u) => u.isAuthenticated);
  return (
    <div className="min-h-screen bg-background text-foreground mb-4">
      <div className="px-4 pt-12">
        {/* Back Button */}
        <div className="flex gap-2 justify-between items-center">
          <Link
            href={isLoggedIn ? "/admin/blogs" : "/blogs"}
            className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blogs
          </Link>

          <div className="flex gap-3 items-center">
            {isLoggedIn && (
              <Link href={`/admin/blogs/${blogId}/update`}>
                <Edit2Icon />
              </Link>
            )}

            {/* Render the delete button layout block if the user has active session rules */}
            {isLoggedIn && (
              <DeleteBlogButton blogId={blogId} isLoggedIn={isLoggedIn} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-border">
          <Suspense fallback={<Spinner />}>
            <Blog blogId={blogId} />
          </Suspense>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href={isLoggedIn ? "/admin/blogs" : "/blogs"}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
