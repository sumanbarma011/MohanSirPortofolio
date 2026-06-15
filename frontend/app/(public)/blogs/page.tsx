import { Metadata } from "next";
import BlogListingPage from "@/features/core/blogs/components/blogs-list";
import { ApiPath } from "@/lib/ApiPath";
import { ApiGet } from "@/providers/axiosInstance";
import { BlogPost } from "@/features/core/blogs/blog.types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await ApiGet<BlogPost[]>(ApiPath.blog.read);
    const blogs = Array.isArray(response) ? response : [];

    const latestCoverImage =
      blogs[0]?.images?.[0]?.url || "/default-og-image.jpg";
    const totalBlogsCount = blogs.length;

    return {
      title: "Insights & Knowledge Base | Latest Articles",
      description: `Explore our directory of ${totalBlogsCount} practical industry guides on taxation, auditing, compliance, financial reporting, and sustainable business growth.`,
      openGraph: {
        title: "Insights & Knowledge Base | Latest Articles",
        description:
          "Stay ahead of regulatory updates with practical industry insights from our expert auditing team.",
        type: "website",
        images: [
          {
            url: latestCoverImage,
            width: 1200,
            height: 630,
            alt: "Insights & Knowledge Base Cover Image Preview",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Insights & Knowledge Base | Latest Articles",
        description:
          "Stay ahead of regulatory updates with practical industry insights.",
        images: [latestCoverImage],
      },
    };
  } catch {
    return {
      title: "Insights & Knowledge Base | Articles & Updates",
      description:
        "Practical insights on taxation, auditing, compliance, financial reporting, and business growth.",
    };
  }
}

export default async function Page() {
  const response = await ApiGet<BlogPost[]>(ApiPath.blog.read).catch(
    () => null,
  );

  const initialBlogs: BlogPost[] = response
    ? Array.isArray(response)
      ? response
      : response.data || []
    : [];

  return <BlogListingPage blogs={initialBlogs} />;
}
