"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blogs } from "./blog-list-card";
import { BlogPost } from "../blog.types";
import { useAuthStore } from "../../auth/store/userStore";

interface BlogListProps {
  blogs?: BlogPost[];
}
export default function BlogListingPage({ blogs }: BlogListProps) {
  const isLoggedIn = useAuthStore((u) => u.isAuthenticated);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">
              Our Blogs
            </h1>
            <p className="text-muted-foreground text-lg">
              Insights and stories from M Khatri & Associates
            </p>
          </div>
          {isLoggedIn && (
            <Button variant="outline" asChild>
              <Link href="/admin/blogs/create">Create blog</Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Blogs blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
