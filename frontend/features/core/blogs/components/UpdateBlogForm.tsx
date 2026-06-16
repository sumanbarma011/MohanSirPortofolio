"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateBlogForm, UseUpdateBlogFormProps } from "../blog.hooks";
import { ImageUploadField } from "./image-upload-field";

type UpdateBlogFormProps = UseUpdateBlogFormProps;

export function UpdateBlogForm({
  blogId,
  initialData,
  onSuccess,
}: UpdateBlogFormProps) {
  const {
    form,
    handleSubmit,
    isSubmitting,
    isUploading,
    mutationError,
    uploadImage,
  } = useUpdateBlogForm({ blogId, initialData, onSuccess });

  return (
    <Card className="border border-border bg-card">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title Entry Field */}
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className="text-foreground font-medium"
                >
                  Title
                </Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Blog title"
                  className="bg-background text-foreground border-border"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* Markdown Content Entry Textarea */}
          <form.Field name="content">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className="text-foreground font-medium"
                >
                  Content
                </Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Full blog content markdown..."
                  rows={10}
                  className="bg-background text-foreground border-border resize-y"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* Multiple Cloudinary Media Asset Array Stream */}
          <form.Field name="images">
            {(field) => (
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Gallery Images
                </Label>
                <ImageUploadField
                  images={field.state.value || []}
                  onImagesChange={(images) => field.handleChange(images)}
                  onUpload={uploadImage}
                  isUploading={isUploading}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-xs text-destructive mt-1">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* Mutation Level Exception Messaging Bar */}
          {mutationError && (
            <p className="text-xs font-medium text-destructive">
              {mutationError instanceof Error
                ? mutationError.message
                : "Failed to sync updates to database."}
            </p>
          )}

          {/* Submit Action Interface panel control triggers */}
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDirty,
            ]}
          >
            {([canSubmit, formSubmitting, isDirty]) => (
              <div className="flex justify-end pt-2 border-t border-border">
                <Button
                  type="submit"
                  disabled={
                    !canSubmit || isSubmitting || formSubmitting || !isDirty
                  }
                  className="w-full sm:w-auto gap-2"
                >
                  {isSubmitting && <Spinner className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Saving changes..." : "Save changes"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
