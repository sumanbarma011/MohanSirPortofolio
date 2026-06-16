"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import AdminDashboardChartSuspense, {
  AdminDashboardPieChartSuspense,
} from "@/features/admin/components/SuspenseAdminDashboard";
import { getAllBlogsQueryOptions } from "@/features/core/blogs/blog.query.options";
import { BlogPost } from "@/features/core/blogs/blog.types";
import { Skeleton } from "@/components/ui/skeleton";

// --- InfoCard Component (Refactored with Theme Variables) ---
interface InfoCardProps {
  heading: string;
  count: string | number;
  onClick?: () => void;
}

function InfoCard({ heading, count = 1, onClick }: InfoCardProps) {
  return (
    <div
      onClick={onClick}
      className={`shadow-sm border border-border bg-card rounded-xl p-6 flex-1 min-w-[200px] flex flex-col items-start justify-center gap-2 ${
        onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
      }`}
    >
      <h4 className="text-sm font-medium text-muted-foreground">{heading}</h4>
      <p
        className={`font-bold text-3xl tracking-tight ${
          heading === "Passed Checks"
            ? "text-[#23B5A9]"
            : heading === "Vulnerabilities"
              ? "text-[#F56A2E]"
              : "text-foreground"
        }`}
      >
        {heading === "Passed Checks" ? `${count}%` : count}
      </p>
    </div>
  );
}

// --- Dynamic Chart Code Splitting Optimization ---
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

// --- Main Dashboard Core Container ---
export default function AdminDashboard() {
  const {
    data: dynamicBlogs,
    isLoading,
    isError,
  } = useQuery(getAllBlogsQueryOptions);

  const blogs: BlogPost[] = dynamicBlogs?.data ?? [];

  // Derived dashboard metrics (Placeholder calculation values matching your types)
  const totalBlogs = blogs.length;
  const passedChecksPercentage = totalBlogs > 0 ? 94 : 0;
  const currentVulnerabilities = totalBlogs > 0 ? 3 : 0;

  // Handle Loading States Gracefully
  if (isLoading) {
    return (
      <section className="space-y-6 p-4 sm:p-6">
        {/* Info Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-28 w-full bg-muted rounded-xl" />
          <Skeleton className="h-28 w-full bg-muted rounded-xl" />
          <Skeleton className="h-28 w-full bg-muted rounded-xl" />
        </div>
        {/* Graph Visualizers Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminDashboardPieChartSuspense />
          <AdminDashboardChartSuspense />
        </div>
      </section>
    );
  }

  // Handle Query Stream Error Responses cleanly
  if (isError) {
    return (
      <section className="p-4 sm:p-6">
        <div className="flex h-[350px] items-center justify-center rounded-xl border border-dashed border-destructive/30 bg-destructive/5 text-center p-4">
          <div>
            <p className="text-sm font-semibold text-destructive">
              Failed to aggregate dashboard metrics
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check active database connection streams or try refreshing the
              dashboard pane.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 p-4 sm:p-6 max-w-[1600px] mx-auto w-full">
      {/* 1. Responsive Key Performance Metrics InfoCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <InfoCard heading="Total Content Blogs" count={totalBlogs} />
        <InfoCard heading="Passed Checks" count={passedChecksPercentage} />
        <InfoCard heading="Vulnerabilities" count={currentVulnerabilities} />
      </div>

      {/* 2. Primary Layout Analytics Graphs Split View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Side: Pie Chart Breakdown Wrapper */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <AdminDashboardPieChart blogsCount={totalBlogs} />
        </div>

        {/* Right Side: Historical Area Chart Activity Visualizer */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <AdminDashboardChartSuspenseWrapper blogs={blogs} />
        </div>
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
