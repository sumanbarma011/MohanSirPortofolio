"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryKeys } from "@/lib/QueryKeys";
import { deleteCompanyMutationOptions } from "../company.query.options"; // Adjust import path
import { ConfirmAlert } from "@/components/AlertConfirmDialog";

interface DeleteCompanyButtonProps {
  companyId: string;
  /** Optional string text label. If empty or omitted, button defaults strictly to an icon-only style */
  label?: string;
  /** Optional callback executed right after successful cache eviction (e.g. redirecting) */
  onSuccess?: () => void;
}

export function DeleteCompanyButton({
  companyId,
  label,
  onSuccess,
}: DeleteCompanyButtonProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...deleteCompanyMutationOptions(),
    onSuccess: () => {
      toast.success("Company profile permanently dropped from database.");

      // Force refresh company collection listings
      queryClient.invalidateQueries({ queryKey: [queryKeys.company.getAll] });

      // Run optional layout or redirection cycles if passed
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error("Company teardown pipeline exception:", error);
      toast.error("Failed to eliminate the corporate entry node.");
    },
  });

  return (
    <ConfirmAlert
      title="Delete Company Profile?"
      description="You are about to permanently erase this corporate workspace. This action will completely revoke access tokens and wipe sub-associated structural configurations forever."
      confirmText="Erase Entity"
      variant="destructive"
      disabled={isPending}
      onConfirm={() => mutate(companyId)}
    >
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        // Conditional sizing: icon-only uses a tight box square, text uses standard horizontal layout padding
        size={label ? "default" : "icon"}
        className={`bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
          label ? "px-4 py-2" : "h-9 w-9"
        }`}
      >
        {isPending ? (
          <Spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}

        {/* Render text nodes cleanly only if explicit label property values exist */}
        {label && !isPending && (
          <span className="text-sm font-semibold">{label}</span>
        )}
        {label && isPending && (
          <span className="text-sm font-semibold">Deleting...</span>
        )}
      </Button>
    </ConfirmAlert>
  );
}
