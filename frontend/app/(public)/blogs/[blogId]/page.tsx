import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailPage from "@/features/core/blogs/components/blog-detail";
import { ApiPath } from "@/lib/ApiPath";
import { ApiGet } from "@/providers/axiosInstance";
import { BlogPost } from "@/features/core/blogs/blog.types";
import { ApiResponse } from "@/lib/global.types";

interface PageProps {
  params: Promise<{ blogId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.blogId;

  if (!id) return {};

  try {
    // Fetch the target blog using your specific lookup endpoint path
    // Assuming your endpoint expects an interpolation sequence like: `${ApiPath.blog.specificBlog}/${id}`
    // If your ApiPath is a function, call it accordingly: ApiPath.blog.specificBlog(id)
    const response = await ApiGet<BlogPost>(
      `${ApiPath.blog.specificBlog}${id}`,
    );

    // Unpack data wrapper envelope if present
    const blog =
      response && "data" in response
        ? ((response as ApiResponse<BlogPost>).data as BlogPost)
        : (response as BlogPost);

    if (!blog || !blog.title) return {};

    const cleanExcerpt = blog.content
      ? blog.content.replace(/<[^>]*>/g, "").substring(0, 155) + "..."
      : "Read our comprehensive industry analysis breakdown and expert operational guidelines.";

    const coverImageUrl =
      blog.images?.[0]?.url || blog.images?.[0]?.url || "/fallback-blog-og.jpg";

    return {
      title: `${blog.title} | Insights & Knowledge`,
      description: cleanExcerpt,
      openGraph: {
        title: blog.title,
        description: cleanExcerpt,
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.author?.name || "Expert Auditing Team"],
        images: [
          {
            url: coverImageUrl,
            width: 1200,
            height: 630,
            alt: `Cover visualization graphic for ${blog.title}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: cleanExcerpt,
        images: [coverImageUrl],
      },
    };
  } catch (error) {
    // Graceful error fallback config profiles to keep crawlers active if lookups break
    return {
      title: "Article Analysis | Insights & Knowledge Base",
      description:
        "Read detailed analytical reviews compiled by our business strategy team.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.blogId;

  if (!id) {
    return notFound();
  }

  return <BlogDetailPage blogId={id} />;
}
