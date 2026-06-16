import Link from "next/link";
import { CreateBlogForm } from "./create-blog-form";
import { ArrowLeftCircleIcon } from "lucide-react";

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline mb-8"
        >
          <ArrowLeftCircleIcon />
          Back to Blogs
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create Blog
          </h1>
          <p className="text-muted-foreground">
            Add a new blog post to your portfolio.
          </p>
        </div>

        <CreateBlogForm />
      </div>
    </div>
  );
}
