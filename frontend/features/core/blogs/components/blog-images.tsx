"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export type CloudinaryImage = {
  url: string;
  cloudinaryId: string;
};

type Props = {
  title: string;
  // Accepts either an array of strings or an array of CloudinaryImage objects
  images: string[] | CloudinaryImage[];
  variant?: "display" | "upload";
  onRemove?: (index: number) => void;
};

export function BlogImages({
  title,
  images,
  variant = "display",
  onRemove,
}: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Helper function to extract the string URL safely based on the array type
  const getImageUrl = (img: string | CloudinaryImage): string => {
    if (typeof img === "string") return img;
    return img?.url || "";
  };

  // Guard rails: Adjust selected index if an item is deleted out from under it
  useEffect(() => {
    if (selectedImageIndex >= images.length && images.length > 0) {
      setTimeout(() => {
        setSelectedImageIndex(images.length - 1);
      }, 0);
    }
  }, [images.length, selectedImageIndex]);

  if (!images || images.length === 0) {
    return null;
  }

  const showMainImage = variant === "display" || images.length > 0;
  const currentMainImageUrl = getImageUrl(images[selectedImageIndex]);

  return (
    <div className={variant === "display" ? "mb-12" : "mb-4"}>
      {/* Main Preview Block */}
      {showMainImage && currentMainImageUrl && (
        <div
          className={`relative w-full border-2 border-border mb-4 ${
            variant === "upload" ? "h-48" : "h-[500px] border-black"
          }`}
        >
          <Image
            src={currentMainImageUrl}
            alt={`${title} - Image ${selectedImageIndex + 1}`}
            fill
            className="object-cover"
          />
          {variant === "upload" && onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => onRemove(selectedImageIndex)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Thumbnails Grid */}
      {(images.length > 1 || (variant === "upload" && images.length >= 1)) && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((image, index) => {
            const thumbnailUrl = getImageUrl(image);
            if (!thumbnailUrl) return null;

            return (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-24 w-full border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <Image
                    src={thumbnailUrl}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
                {variant === "upload" && onRemove && images.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => onRemove(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
