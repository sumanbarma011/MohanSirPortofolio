import BlogDetailPage from "@/features/core/blogs/components/blog-detail";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  // 1. Await the params object itself
  const resolvedParams = await params;
  console.log(resolvedParams);
  const id = resolvedParams?.blogId;

  if (!id) {
    return notFound();
  }

  return <BlogDetailPage blogId={id} />;
}
