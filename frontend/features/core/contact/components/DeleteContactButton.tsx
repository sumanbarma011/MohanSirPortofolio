"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryKeys } from "@/lib/QueryKeys";
import { ConfirmAlert } from "@/components/AlertConfirmDialog"; // Verify your folder path
import { deleteContactMutationOptions } from "../contact.query.options"; // Verify your folder path

interface DeleteContactButtonProps {
  // contactid
  contactId: string;
  /** Optional text label. If left undefined, the button behaves strictly as an icon-only element */
  label?: string;
  /** Optional callback fired right after cache streams finish invalidating */
  onSuccess?: () => void;
}

export function DeleteContactButton({
  contactId,
  label,
  onSuccess,
}: DeleteContactButtonProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...deleteContactMutationOptions(),
    onSuccess: () => {
      toast.success("Contact message permanently removed.");

      // Clear out the stale contact read data entries instantly
      queryClient.invalidateQueries({ queryKey: [queryKeys.contact.read] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.contact.read] });

      // Run optional downstream handler routines if available
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error("Contact deletion pipeline error:", error);
      toast.error("Failed to eliminate the contact request data.");
    },
  });

  return (
    <ConfirmAlert
      title="Delete Contact Entry?"
      description="You are about to clear this submission. This will purge all associated metadata details, email logs, and customer inquiry strings forever."
      confirmText="Delete Message"
      variant="destructive"
      disabled={isPending}
      onConfirm={() => mutate(contactId)}
    >
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        // "icon" shapes it into a square frame; "default" allows fluid label padding rules
        size={label ? "default" : "icon"}
        className={`bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-colors gap-2 h-11 ${
          label ? "px-6 font-semibold" : "w-11"
        }`}
      >
        {isPending ? (
          <Spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}

        {/* Display string segments only when explicit label properties exist */}
        {label && <span>{isPending ? "Discarding..." : label}</span>}
      </Button>
    </ConfirmAlert>
  );
}
