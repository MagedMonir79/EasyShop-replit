import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../utils/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      
      removeItem: (productId: number) => {
        const { items } = get();
        set({
          items: items.filter(item => item.product.id !== productId),
        });
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => {
            const price = typeof item.product.price === 'string' 
              ? parseFloat(item.product.price) 
              : item.product.price;
            return total + price * item.quantity;
          },
          0
        );
      },
    }),
    {
      name: 'easyshop-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
