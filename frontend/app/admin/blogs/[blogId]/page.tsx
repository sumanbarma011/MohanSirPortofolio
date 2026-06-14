import BlogDetailPage from "@/features/core/blogs/components/blog-detail";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  if (!blogId) {
    return notFound();
  }

  return <BlogDetailPage blogId={blogId} />;
}
