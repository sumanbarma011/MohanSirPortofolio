import { Suspense } from "react";
import { Blogs } from "./blog-list-card";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">
              Our Blogs
            </h1>
            <p className="text-muted-foreground text-lg">
              Insights and stories from M Khatri & Associates
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/blogs/create">Create blog</Link>
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Spinner />}>
            <Blogs />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
