"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Upload } from "lucide-react";
import { BlogImages } from "./blog-images";
import { CloudinaryImage } from "../blog.types";

type Props = {
  images: CloudinaryImage[];
  onImagesChange: (images: CloudinaryImage[]) => void;
  onUpload: (file: File) => Promise<CloudinaryImage>;
  isUploading: boolean;
  error?: Error | null;
  hideUploadField?: boolean; // Added support for your layout flag
  label?: string;
};

export function ImageUploadField({
  images,
  onImagesChange,
  onUpload,
  isUploading,
  error,
  hideUploadField = false,
  label = "Upload Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploaded = await onUpload(file);
    if (uploaded) {
      onImagesChange([...images, uploaded]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const imageUrls = images.map((img) => img.url);

  return (
    <div className="space-y-3 w-full flex flex-col ">
      {/* 1. Preview Layout Block */}
      {imageUrls.length > 0 && (
        <BlogImages
          title="Upload preview"
          images={imageUrls}
          variant="upload"
          onRemove={handleRemove}
        />
      )}

      {/* 2. Enhanced Dropzone Element (Hidden dynamically based on hideUploadField props) */}
      {!hideUploadField && (
        <div className="w-full max-w-md">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className="w-full h-32 rounded-xl border-2 border-dashed border-border bg-card hover:bg-muted/30 hover:border-primary/50 transition-all duration-200 flex flex-col items-center justify-center gap-2.5 p-4 text-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isUploading ? (
              <div className="p-2.5 bg-muted rounded-full">
                <Spinner className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="p-2.5 bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary rounded-full transition-colors">
                <Upload className="h-5 w-5" />
              </div>
            )}

            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">
                {isUploading ? "Uploading branding asset..." : label}
              </p>
              <p className="text-xs text-muted-foreground">
                Click to browse files (PNG, JPG, WebP)
              </p>
            </div>
          </button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
