"use client";

import * as React from "react";
import { ChartAreaIcon, ClockIcon, NotebookPenIcon } from "lucide-react";

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
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isPending = false;
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
              email: "mock@gmail.com",
              name: "mock name",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
