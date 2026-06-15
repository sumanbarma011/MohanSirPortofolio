"use client";

import * as React from "react";
import {
  ChartAreaIcon,
  MessageSquareIcon,
  NotebookPenIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/features/core/auth/store/userStore";

const data = {
  teams: [
    {
      name: "Mohan Khatri",
      plan: "CA",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: ChartAreaIcon,
      isActive: true,
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: NotebookPenIcon,
      isActive: true,
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: NotebookPenIcon,
      isActive: true,
    },
    {
      title: "Messages",
      url: "/admin/messages",
      icon: MessageSquareIcon,
      isActive: true,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isPending = false;
  const user = useAuthStore((u) => u.user);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="w-full h-full rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-62.5" />
              <Skeleton className="h-4 w-62.5" />
            </div>
          </div>
        ) : (
          <NavUser
            user={{
              email: user?.email ?? "No Name",
              name: user?.name ?? "No Name",
              image: user?.image ?? "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
