import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string | null;
  availabilityModel: string | null;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().isInWishlist(item.id)) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'sehaj-wishlist',
    }
  )
);

interface CartState {
  cartId: string | null;
  isOpen: boolean;
  setCartId: (id: string | null) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      isOpen: false,
      setCartId: (id) => set({ cartId: id }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'sehaj-cart',
    }
  )
);