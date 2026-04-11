'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageData {
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: ImageData[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[var(--color-sand)] flex items-center justify-center">
        <span className="text-[var(--color-taupe-light)]">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[3/4] bg-[var(--color-sand)] overflow-hidden">
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].altText || 'Product image'}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-24 flex-shrink-0 overflow-hidden transition-all ${
                selectedIndex === index 
                  ? 'ring-2 ring-[var(--color-charcoal)]' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Product thumbnail ${index + 1}`}
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