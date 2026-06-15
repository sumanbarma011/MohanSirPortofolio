"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import AdminDashboardChartSuspense, {
  AdminDashboardPieChartSuspense,
} from "@/features/admin/components/SuspenseAdminDashboard";
import { getAllBlogsQueryOptions } from "@/features/core/blogs/blog.query.options";
import { BlogPost } from "@/features/core/blogs/blog.types";

// Dynamic Code Splitting Imports for Performance Optimization
const AdminDashboardPieChart = dynamic(
  () =>
    import("@/features/admin/components/graphcomponents/DashboardPieChart").then(
      (mod) => mod.AdminDashboardPieChart,
    ),
  { loading: () => <AdminDashboardPieChartSuspense />, ssr: false },
);

const ChartAreaAdminDashboard = dynamic(
  () =>
    import("@/features/admin/components/graphcomponents/AdminDashboardChart").then(
      (mod) => mod.ChartAreaAdminDashboard,
    ),
  { loading: () => <AdminDashboardChartSuspense />, ssr: false },
);

export default function AdminDashboard() {
  // Execute standard server query lookup
  const {
    data: dynamicBlogs,
    isLoading,
    isError,
  } = useQuery(getAllBlogsQueryOptions);

  const blogs: BlogPost[] = dynamicBlogs?.data ?? [];

  if (isLoading) {
    return (
      <section className="space-y-6 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <AdminDashboardPieChartSuspense />
          <AdminDashboardChartSuspense />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="p-6">
        <div className="flex h-[350px] items-center justify-center rounded-xl border border-dashed border-destructive/30 bg-destructive/5 text-center">
          <div>
            <p className="text-sm font-semibold text-destructive">
              Failed to aggregate data points
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check database stream configurations or try refreshing.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <AdminDashboardPieChart blogsCount={blogs.length} />

        <AdminDashboardChartSuspenseWrapper blogs={blogs} />
      </div>
    </section>
  );
}

// Typing definitions matching wrapper properties
interface DynamicChartProps {
  blogs: BlogPost[];
}

// Separate inline wrapper enforcing fallback boundaries for the Area Chart component mapping
function AdminDashboardChartSuspenseWrapper({ blogs }: DynamicChartProps) {
  return <ChartAreaAdminDashboard blogs={blogs} />;
}
