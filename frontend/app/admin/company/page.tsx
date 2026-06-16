"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CompanyResponse,
  getAllCompaniesQueryOptions,
} from "@/features/core/company/company.query.options";
import { CompanyListView } from "@/features/core/company/components/CompanyListView";

export default function CompaniesPage() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useQuery(getAllCompaniesQueryOptions);

  // 1. Loading Skeleton Grid Layout
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-muted" />
            <Skeleton className="h-4 w-72 bg-muted" />
          </div>
          <Skeleton className="h-10 w-36 bg-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-48 w-full bg-muted rounded-xl border"
            />
          ))}
        </div>
      </div>
    );
  }

  // 2. Query Exception Handling Stream
  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-destructive/30 bg-destructive/5 text-center p-4">
          <p className="text-sm font-semibold text-destructive">
            Failed to aggregate company streams
          </p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Check network connections or workspace permission levels.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry Fetch
          </Button>
        </div>
      </div>
    );
  }

  const companies: CompanyResponse[] = response?.data ?? [];

  console.log(companies, "all companies are ");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* Dynamic Upper Control Dashboard Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Companies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your registered corporate workspace environments and active
            verification states.
          </p>
        </div>
        <Button
          asChild
          className="gap-2 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/admin/company/create">
            <Plus className="h-4 w-4" /> Add Company
          </Link>
        </Button>
      </div>

      {/* Render presentational markup list pass */}
      <CompanyListView companies={companies ?? []} />
    </div>
  );
}
