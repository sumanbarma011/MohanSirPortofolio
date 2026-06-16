"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmAlertProps {
  /** The clickable element that opens the modal (e.g., your Delete Button) */
  children: React.ReactNode;
  /** Title header text inside the modal box */
  title?: string;
  /** Explanatory paragraph text highlighting risk variables */
  description?: string;
  /** Label for the destructive confirm action button */
  confirmText?: string;
  /** Label for the safety fallback exit button */
  cancelText?: string;
  /** Callback fired immediately when the user confirms */
  onConfirm: () => void;
  /** Styles the execution action specifically for dangerous sequences */
  variant?: "default" | "destructive";
  /** Optional flag to disable triggers during background actions */
  disabled?: boolean;
}

export function ConfirmAlert({
  children,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently modify your remote server database entries.",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
  disabled = false,
}: ConfirmAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card border border-border max-w-[95vw] sm:max-w-[420px] rounded-xl">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle className="text-foreground text-lg font-bold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-sm mt-2 leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4">
          <AlertDialogCancel className="border-border bg-background hover:bg-muted text-foreground font-medium rounded-lg px-4 py-2 mt-0">
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              // Prevent standard browser synthetic bubbling behaviors
              e.stopPropagation();
              onConfirm();
            }}
            className={`font-semibold rounded-lg px-4 py-2 text-white ${
              variant === "destructive"
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
