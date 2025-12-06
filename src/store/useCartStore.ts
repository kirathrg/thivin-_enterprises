import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id);
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, quantity }],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          return {
            cartItems: state.cartItems.filter((item) => item.id !== productId),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter((item) => item.id !== productId),
            };
          }
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Selectors for computed values
export const selectCartTotal = (state: CartState) =>
  state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemCount = (state: CartState) =>
  state.cartItems.reduce((count, item) => count + item.quantity, 0);
