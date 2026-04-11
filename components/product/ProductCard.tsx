'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/store';
import { formatPrice } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  handle: string;
  title: string;
  price: string;
  compareAtPrice?: string | null;
  image: string | null;
  availabilityModel?: string | null;
  index?: number;
}

export function ProductCard({
  id,
  handle,
  title,
  price,
  compareAtPrice,
  image,
  availabilityModel,
  index = 0,
}: ProductCardProps) {
  const { items, addItem, removeItem } = useWishlistStore();
  const isInWishlist = items.some((item) => item.id === id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeItem(id);
    } else {
      addItem({ id, handle, title, price, image: image || null, availabilityModel: availabilityModel || null });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/products/${handle}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-sand)] mb-4">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-taupe-light)]">
              <span className="text-sm">No Image</span>
            </div>
          )}
          
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <Heart
              size={18}
              className={cn(
                'transition-colors',
                isInWishlist ? 'fill-[var(--color-coral)] text-[var(--color-coral)]' : 'text-[var(--color-charcoal)]'
              )}
            />
          </button>

          {availabilityModel && (
            <div className="absolute bottom-4 left-4">
              <span
                className={cn(
                  'px-3 py-1 text-xs font-medium tracking-wider uppercase',
                  availabilityModel === 'ready_to_ship'
                    ? 'bg-[var(--color-sage)] text-white'
                    : 'bg-[var(--color-gold)] text-white'
                )}
              >
                {availabilityModel === 'ready_to_ship' ? 'Ready to Ship' : 'Made to Order'}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg text-[var(--color-charcoal)] group-hover:text-[var(--color-rose-clay)] transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-taupe)] font-medium">
              ₹{formatPrice(price)}
            </span>
            {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
              <span className="text-[var(--color-taupe-light)] line-through text-sm">
                ₹{formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}