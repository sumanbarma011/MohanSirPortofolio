"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Building2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type CloudinaryImage = {
  url: string;
  cloudinaryId: string;
};

interface SingleImageProps {
  value: CloudinaryImage | null | undefined;
  onChange: (image: CloudinaryImage | null) => void;
  onUpload: (file: File) => Promise<CloudinaryImage>;
  isUploading: boolean;
}

export function SingleImageUploadField({
  value,
  onChange,
  onUpload,
  isUploading,
}: SingleImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploaded = await onUpload(file);
      if (uploaded) onChange(uploaded);
    } catch (err) {
      console.error("Upload failure:", err);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-sm">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {value?.url ? (
        /* Elevated Active Preview Card Container */
        <div className="relative group aspect-video w-full rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center shadow-sm">
          <Image
            src={value.url}
            alt="Branding Logo Preview"
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-102"
          />
          {/* Subtle Hover Action Overlay Screen */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
            <button
              type="button"
              onClick={() => onChange(null)}
              className="p-2.5 rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 scale-90 group-hover:scale-100 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Modern Minimalist Drag/Click Interactive Dropzone Box */
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-card hover:bg-muted/30 transition-all duration-200 flex flex-col items-center justify-center gap-3 p-5 text-center group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isUploading ? (
            <div className="p-3 bg-muted rounded-full animate-spin">
              <Spinner className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="p-3 bg-muted rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <UploadCloud className="h-5 w-5" />
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {isUploading ? "Uploading logo..." : "Upload logo"}
            </p>
            <p className="text-xs text-muted-foreground">
              Click to browse files (PNG, JPEG, WebP)
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
