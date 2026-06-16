"use client";

import React from "react";
import Image from "next/image";
import { Building2, Calendar, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompanyResponse } from "../company.query.options";

type CompanyListViewProps = {
  companies: CompanyResponse[];
};

export function CompanyListView({ companies = [] }: CompanyListViewProps) {
  // Safe validation check if database registry array is completely empty
  if (companies.length === 0) {
    return (
      <div className="flex flex-col h-[300px] items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <div className="p-3 bg-muted rounded-full text-muted-foreground mb-3">
          <Building2 className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          No companies found
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Get started by building your very first enterprise workspace profile
          node using the creation panel above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => {
        // Safe formatting for the dates
        const formattedDate = new Date(company.createdAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        );

        return (
          <div
            key={company.id}
            className="group flex flex-col justify-between bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Header Container Area: Brand Icon Logo + Status Token */}
              <div className="flex items-start justify-between gap-4">
                <div className="relative h-12 w-12 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  {company.logo?.url ? (
                    <Image
                      src={company.logo.url}
                      alt={`${company.companyName} logo branding`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Status Enums Badge indicators mapped directly to Tailwind color variables */}
                <Badge
                  variant="secondary"
                  className={`gap-1 select-none font-medium ${
                    company.isActive
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}
                >
                  {company.isActive ? (
                    <>
                      <ShieldCheck className="h-3 w-3" /> Active
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-3 w-3" /> Suspended
                    </>
                  )}
                </Badge>
              </div>

              {/* Core Text Body Content Metadata Block */}
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {company.companyName}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px] leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>

            {/* Sub Footer Context Layer */}
            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-border text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created on {formattedDate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
