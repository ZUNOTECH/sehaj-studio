'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store';
import { createCart, addToCart, updateCartQuantity, removeCartLine } from '@/lib/shopify/client';
import { formatPrice } from '@/lib/shopify/types';
import { Button } from '@/components/ui/Button';

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: { url: string; altText: string | null } | null;
    };
    price: { amount: string; currencyCode: string };
  };
}

export function CartDrawer() {
  const { cartId, isOpen, setCartId, setIsOpen } = useCartStore();
  const [cart, setCart] = useState<{
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: { subtotalAmount: { amount: string; currencyCode: string } };
    lines: { edges: { node: CartItem }[] };
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!cartId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/cart?cartId=${cartId}`);
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    if (isOpen && cartId) {
      fetchCart();
    }
  }, [isOpen, cartId, fetchCart]);

  const handleAddItem = async (variantId: string) => {
    try {
      let updatedCart;
      if (cartId) {
        updatedCart = await addToCart(cartId, variantId, 1);
      } else {
        updatedCart = await createCart(variantId, 1);
      }
      if (updatedCart) {
        setCart(updatedCart as typeof cart);
        if (!cartId) {
          setCartId((updatedCart as { id: string }).id);
        }
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    try {
      const updatedCart = await updateCartQuantity(cartId, lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart as typeof cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    if (!cartId) return;
    try {
      const updatedCart = await removeCartLine(cartId, lineId);
      if (updatedCart) {
        setCart(updatedCart as typeof cart);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--color-charcoal)]/40 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-cream)] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-beige)]">
              <h2 className="font-serif text-xl">Shopping Bag</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[var(--color-taupe)] hover:text-[var(--color-charcoal)] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!cartId || loading ? (
                <div className="flex flex-col items-center justify-center h-full text-[var(--color-taupe)]">
                  <ShoppingBag size={48} className="mb-4 opacity-50" />
                  <p>Your bag is empty</p>
                </div>
              ) : cart?.lines.edges.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[var(--color-taupe)]">
                  <ShoppingBag size={48} className="mb-4 opacity-50" />
                  <p>Your bag is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart?.lines.edges.map(({ node: item }) => (
                    <div key={item.id} className="flex gap-4">
                      <Link
                        href={`/products/${item.merchandise.product.handle}`}
                        onClick={() => setIsOpen(false)}
                        className="relative w-24 h-32 bg-[var(--color-sand)] flex-shrink-0"
                      >
                        {item.merchandise.product.featuredImage?.url && (
                          <Image
                            src={item.merchandise.product.featuredImage.url}
                            alt={item.merchandise.product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </Link>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.merchandise.product.handle}`}
                          onClick={() => setIsOpen(false)}
                          className="font-serif text-base text-[var(--color-charcoal)] hover:text-[var(--color-rose-clay)]"
                        >
                          {item.merchandise.product.title}
                        </Link>
                        <p className="text-sm text-[var(--color-taupe)] mt-1">
                          {item.merchandise.selectedOptions
                            .map((opt) => opt.value)
                            .join(' / ')}
                        </p>
                        <p className="text-sm font-medium text-[var(--color-charcoal)] mt-2">
                          ₹{formatPrice(item.merchandise.price.amount)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[var(--color-beige)]">
                            <button
                              onClick={() =>
                                item.quantity > 1
                                  ? handleUpdateQuantity(item.id, item.quantity - 1)
                                  : handleRemoveItem(item.id)
                              }
                              className="p-1 px-2 text-[var(--color-taupe)] hover:text-[var(--color-charcoal)]"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 text-[var(--color-taupe)] hover:text-[var(--color-charcoal)]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[var(--color-taupe)] hover:text-[var(--color-coral)] text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart && cart.lines.edges.length > 0 && (
              <div className="p-6 border-t border-[var(--color-beige)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-taupe)]">Subtotal</span>
                  <span className="text-lg font-medium text-[var(--color-charcoal)]">
                    ₹{formatPrice(cart.cost.subtotalAmount.amount)}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-taupe-light)]">
                  Shipping and taxes calculated at checkout
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}