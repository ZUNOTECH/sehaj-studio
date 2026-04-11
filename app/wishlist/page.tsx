'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store';
import { formatPrice } from '@/lib/shopify/types';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-[var(--color-sand)]">
        <div className="container text-center">
          <h1 className="font-serif text-4xl text-[var(--color-charcoal)]">My Wishlist</h1>
          <p className="mt-2 text-[var(--color-taupe)]">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-ivory)]">
        <div className="container">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={48} className="mx-auto text-[var(--color-taupe-light)] mb-4" />
              <h2 className="font-serif text-2xl text-[var(--color-charcoal)] mb-2">Your wishlist is empty</h2>
              <p className="text-[var(--color-taupe)] mb-8">Save your favorite pieces to revisit later.</p>
              <Link href="/collections/all">
                <Button variant="primary">Explore Collection</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <Link href={`/products/${item.handle}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-sand)] mb-4">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-taupe-light)]">
                          No Image
                        </div>
                      )}
                      
                      {item.availabilityModel && (
                        <div className="absolute bottom-4 left-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium tracking-wider uppercase ${
                              item.availabilityModel === 'ready_to_ship'
                                ? 'bg-[var(--color-sage)] text-white'
                                : 'bg-[var(--color-gold)] text-white'
                            }`}
                          >
                            {item.availabilityModel === 'ready_to_ship' ? 'Ready to Ship' : 'Made to Order'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-lg text-[var(--color-charcoal)]">{item.title}</h3>
                    <p className="text-[var(--color-taupe)] mt-1">₹{formatPrice(item.price)}</p>
                  </Link>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <X size={18} className="text-[var(--color-charcoal)]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}