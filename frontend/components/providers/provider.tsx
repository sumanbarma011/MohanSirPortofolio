"use client";

import { queryClient } from "@/providers/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* to run shadcn toaster */}
        <Toaster duration={500} closeButton richColors position="top-right" />
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export default Providers;
