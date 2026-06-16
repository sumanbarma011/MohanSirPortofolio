"use client";

import React from "react";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { UseCreateCompanyFormReturn } from "../hooks/useCreateCompanyForm";
import { ImageUploadField } from "../../blogs/components/image-upload-field";
import { SingleImageUploadField } from "@/components/SingleImageUploadFile";

type CreateCompanyViewProps = {
  formController: UseCreateCompanyFormReturn;
};

export function CreateCompanyView({ formController }: CreateCompanyViewProps) {
  const { form, handleSubmit, isSubmitting } = formController;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 bg-background">
      {/* Structural Header Title Block */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Company</h1>
          <p className="text-sm text-muted-foreground">
            Register a new corporate workspace entity profile inside your
            environment tracker.
          </p>
        </div>
      </div>

      {/* Main Core Setup Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Identity Field */}
          <form.Field name="logo">
            {(field) => (
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-semibold text-foreground">
                    Company Branding Logo
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This logo represents your workspace node across tables and
                    navigation menus.
                  </p>
                </div>

                <div className="pt-1 flex justify-center">
                  <SingleImageUploadField
                    value={field.state.value}
                    onChange={(uploaded) => field.handleChange(uploaded)}
                    isUploading={false} // Connect this to your real loading mutation state if available
                    onUpload={async (file) => {
                      // Replace with your actual uploading action endpoint query function logic
                      return {
                        url: URL.createObjectURL(file),
                        cloudinaryId: "temp_id",
                      };
                    }}
                  />
                </div>

                {field.state.meta.errors && (
                  <p className="text-xs font-medium text-destructive mt-1.5 flex items-center gap-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Legal Company Name */}
          <form.Field name="companyName">
            {(field) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor={field.name}
                  className="font-semibold text-foreground"
                >
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. Acme Corporation"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background text-foreground border-border"
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Business Profile Description Summary */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor={field.name}
                  className="font-semibold text-foreground"
                >
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder="Provide a high-level summary overview of this corporate business entity..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background text-foreground border-border resize-none"
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Submission Control Panel */}
          <div className="flex justify-end pt-2 border-t border-border">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Spinner className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Create Company Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
