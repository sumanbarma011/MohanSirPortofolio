"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { useUser } from "@/features/core/auth/hooks/useUser";
import { useAuthStore } from "@/features/core/auth/store/userStore";
import { UserType } from "@/features/core/auth/auth.types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // 1. Fetch user state synchronously from TanStack cache
  const { data: response, isLoading, isError } = useUser();
  const user = response?.data;

  // 2. Synchronous Route Protection & Store Update (No UseEffects)
  if (!isLoading) {
    if (!user || isError) {
      // Trigger redirect right away mid-render thread
      router.push("/login");

      // Fallback screen while browser pushes to /login
      return <LoadingScreen message="Unauthorized. Redirecting to login..." />;
    }

    // Synchronously update your store using Zustand's direct setState method
    // to prevent hydration or asynchronous layout-lag mismatches
    useAuthStore.setState({ user, isAuthenticated: true });
  }

  // 3. Early loading exit guard if TanStack query is fetching
  if (isLoading || !user) {
    return <LoadingScreen message="Verifying admin session..." />;
  }

  // 4. Safe structural render pass (guarantees user exists for all child routes)
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Button variant="outline" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </header>
        {children ? (
          children
        ) : (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

// Reusable static loader block
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex h-screen flex-col gap-3 items-center justify-center bg-background text-muted-foreground">
      <Spinner className="h-6 w-6 text-primary" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
