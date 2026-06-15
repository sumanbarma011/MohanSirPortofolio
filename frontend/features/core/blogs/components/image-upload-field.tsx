"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
};

export function ImageUploadField({
  images,
  onImagesChange,
  onUpload,
  isUploading,
  error,
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
    <div className="space-y-3">
      <Label>Images</Label>

      {imageUrls.length > 0 && (
        <BlogImages
          title="Upload preview"
          images={imageUrls}
          variant="upload"
          onRemove={handleRemove}
        />
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          className="gap-2"
        >
          {isUploading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isUploading ? "Uploading..." : "Upload image"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
