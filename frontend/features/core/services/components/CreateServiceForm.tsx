"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { UseServiceFormReturn } from "../services.hooks";

interface CreateServiceFormProps {
  formState: UseServiceFormReturn;
}

export const CreateServiceForm: React.FC<CreateServiceFormProps> = ({
  formState,
}) => {
  const { form, handleSubmit, isSubmitting, mutationError } = formState;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Dynamic Error State Notification */}
      {mutationError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-sm text-center">
          <p className="font-semibold">Creation Interrupted</p>
          <p className="text-destructive/90 mt-0.5">
            {mutationError.message || "Something went wrong."}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-card border border-border rounded-2xl shadow-sm"
      >
        {/* Name Input Field */}
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-foreground"
              >
                Service Name
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isSubmitting}
                placeholder="e.g., Financial Audit"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all text-sm"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs font-medium text-destructive">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Description Textarea Field */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-foreground"
              >
                Description
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                disabled={isSubmitting}
                placeholder="Describe the compliance parameters..."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all text-sm resize-none"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs font-medium text-destructive">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg shadow-sm disabled:opacity-50 transition-all text-sm w-full sm:w-auto"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Creating Service..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
};
