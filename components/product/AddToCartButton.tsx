'use client';

import { useState } from 'react';
import { useCartStore } from '@/store';
import { createCart, addToCart } from '@/lib/shopify/client';
import { Button } from '@/components/ui/Button';

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string;
  options: { name: string; value: string }[];
  image: string | null;
}

interface AddToCartButtonProps {
  variants: Variant[];
  availabilityModel: string | null;
  leadTime: string | null;
}

export function AddToCartButton({ variants, availabilityModel, leadTime }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const { cartId, setCartId, setIsOpen } = useCartStore();

  const sizes = [...new Set(variants.map(v => v.options.find(o => o.name === 'Size')?.value || '').filter(Boolean))] as string[];
  const colors = [...new Set(variants.map(v => v.options.find(o => o.name === 'Color')?.value || '').filter(Boolean))] as string[];

  const selectedVariant = variants.find(v => {
    const size = v.options.find(o => o.name === 'Size')?.value;
    const color = v.options.find(o => o.name === 'Color')?.value;
    return size === selectedSize && color === selectedColor;
  });

  const handleAddToCart = async () => {
    const variant = selectedVariant || variants[0];
    if (!variant || !variant.availableForSale) return;

    setLoading(true);
    try {
      if (cartId) {
        await addToCart(cartId, variant.id, 1);
      } else {
        const cart = await createCart(variant.id, 1);
        if (cart) {
          setCartId((cart as { id: string }).id);
        }
      }
      setAdded(true);
      setIsOpen(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !selectedVariant?.availableForSale || (sizes.length > 0 && !selectedSize);

  return (
    <div className="space-y-4">
      {colors.length > 1 && (
        <div>
          <h4 className="text-sm font-medium text-[var(--color-charcoal)] mb-3">Color</h4>
          <div className="flex gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-sm border transition-all ${
                  selectedColor === color || (!selectedColor && colors.length === 1)
                    ? 'bg-[var(--color-charcoal)] text-white border-[var(--color-charcoal)]'
                    : 'bg-transparent text-[var(--color-charcoal)] border-[var(--color-beige)] hover:border-[var(--color-charcoal)]'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-[var(--color-charcoal)]">Size</h4>
            <button className="text-sm text-[var(--color-taupe)] hover:text-[var(--color-rose-clay)]">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => {
              const variant = variants.find(v => 
                v.options.some(o => o.name === 'Size' && o.value === size)
              );
              const isAvailable = variant?.availableForSale;
              
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 text-sm border transition-all ${
                    selectedSize === size
                      ? 'bg-[var(--color-charcoal)] text-white border-[var(--color-charcoal)]'
                      : isAvailable
                        ? 'bg-transparent text-[var(--color-charcoal)] border-[var(--color-beige)] hover:border-[var(--color-charcoal)]'
                        : 'bg-[var(--color-sand)] text-[var(--color-taupe-light)] border-[var(--color-beige)] cursor-not-allowed line-through'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isDisabled || loading}
        variant="primary"
        className="w-full"
      >
        {loading ? 'Adding...' : added ? 'Added to Bag' : 'Add to Bag'}
      </Button>

      {availabilityModel === 'made_to_order' && leadTime && (
        <p className="text-sm text-[var(--color-taupe)] text-center">
          <span className="font-medium">Note:</span> This is a made-to-order piece. {leadTime}
        </p>
      )}
    </div>
  );
}