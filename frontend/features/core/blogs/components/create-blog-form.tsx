"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateBlogForm, UseCreateBlogFormProps } from "../blog.hooks";
import { ImageUploadField } from "./image-upload-field";

type Props = UseCreateBlogFormProps;

export function CreateBlogForm(props?: Props) {
  const {
    form,
    handleSubmit,
    isSubmitting,
    isUploading,
    mutationError,
    uploadImage,
  } = useCreateBlogForm(props);

  return (
    <Card className="border border-border">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Blog title"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="content">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Content</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Full blog content"
                  rows={8}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="images">
            {(field) => (
              <div className="space-y-2">
                <ImageUploadField
                  images={field.state.value}
                  onImagesChange={(images) => field.handleChange(images)}
                  onUpload={uploadImage}
                  isUploading={isUploading}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          {mutationError && (
            <p className="text-sm text-destructive">
              {mutationError instanceof Error
                ? mutationError.message
                : "Failed to create blog post"}
            </p>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, formSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || formSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create blog"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
