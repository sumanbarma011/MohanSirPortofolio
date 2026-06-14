"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  images: string[];
};

export function BlogImages({ title, images }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <div className="mb-12">
      {/* Main Image */}
      <div className="relative h-[500px] w-full border-2 border-black mb-4">
        <Image
          src={images[selectedImageIndex]}
          alt={`${title} - Image ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-24 border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-black"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
