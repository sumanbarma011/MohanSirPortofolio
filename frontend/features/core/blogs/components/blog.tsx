import { BlogImages } from "./blog-images";
import { BlogData } from "@/mockdata/BlogData";

const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export async function Blog({ blogId }: { blogId: string }) {
  const blog = BlogData.filter((b) => b.id === blogId)[0];
  return blog ? (
    <>
      {/* Article Header */}
      <header className="mb-10 text-foreground">
        <time className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
          {formatDate(blog.createdAt)}
        </time>
        <h1 className="text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-muted-foreground">
          {/* Avatar using secondary semantic color mapping */}
          <div className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center font-bold rounded">
            {blog.authorId.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Author ID: {blog.authorId}
            </p>
            <p className="text-sm">Updated: {formatDate(blog.updatedAt)}</p>
          </div>
        </div>
      </header>

      {/* Featured Image Gallery */}
      {blog.images && blog.images.length > 0 && (
        <BlogImages images={blog.images} title={blog.title} />
      )}

      {/* Article Content */}
      <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
        <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
          {blog.description}
        </div>
      </article>
    </>
  ) : (
    <p>Blog record not found.</p>
  );
}
