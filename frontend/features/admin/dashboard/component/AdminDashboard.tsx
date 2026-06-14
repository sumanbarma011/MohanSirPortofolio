"use client";

import dynamic from "next/dynamic";
import AdminDashboardChartSuspense, {
  AdminDashboardPieChartSuspense,
} from "@/features/admin/components/SuspenseAdminDashboard";
import { BlogData } from "@/mockdata/BlogData";

// Dynamically import heavy graph components with chunk splitting
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
  return (
    <section className="space-y-6 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <AdminDashboardPieChart blogsCount={BlogData?.length || 0} />
        <AdminDashboardChartSuspenseWrapper />
      </div>
    </section>
  );
}

// Separate inline wrapper to enforce proper fallback boundaries for the Area Chart
function AdminDashboardChartSuspenseWrapper() {
  return <ChartAreaAdminDashboard blogs={BlogData || []} />;
}
