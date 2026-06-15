"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllServicesQueryOptions } from "../services.query.option";
import Link from "next/link";
import { Loader2, Plus, ShieldCheck } from "lucide-react";
import { Service } from "../service.types";

export const ServicesSection = () => {
  const { data, isLoading, isError, error } = useQuery(
    getAllServicesQueryOptions,
  );
  const services: Service[] = data?.data ?? [];

  return (
    <section className="p-6 max-w-7xl mx-auto bg-background text-foreground">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-border pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Our Services
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view all financial compliance solutions.
          </p>
        </div>

        <Link
          href="/admin/services/create"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">
            Loading compliance services...
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-sm max-w-xl mx-auto text-center">
          <p className="font-semibold">Failed to load services</p>
          <p className="text-destructive/90 mt-1">
            {(error as Error)?.message || "An unexpected error occurred."}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && services?.length === 0 && (
        <div className="text-center py-16 bg-muted/40 rounded-2xl border-2 border-dashed border-border">
          <p className="text-muted-foreground font-medium">
            No services found.
          </p>
        </div>
      )}

      {/* Grid Container for Services */}
      {!isLoading && !isError && services && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Active/Inactive Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      service.isActive
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground border-transparent"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Service Icon & Title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="pr-16">
                    {/* Keep text clear of status badge */}
                    <h3 className="font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action: Manage specific Service ID */}
              <div className="pt-4 border-t border-border/60">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                >
                  Manage Service &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
