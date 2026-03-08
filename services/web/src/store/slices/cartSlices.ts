// services/web/src/store/slices/cartSlice.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  storeId: string;
  storeName: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string | null;
  storeId: string | null; // Cart locked to single store
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discountAmount: number) => void;
  removeCoupon: () => void;
  setDeliveryFee: (fee: number) => void;
  calculateTotals: () => void;
}

type CartStore = CartState & CartActions;

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const calculateTotal = (subtotal: number, deliveryFee: number, discount: number): number => {
  return Math.max(0, subtotal + deliveryFee - discount);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial State
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      couponCode: null,
      storeId: null,

      // Actions
      addItem: (item) =>
        set((state) => {
          // Check if cart is locked to different store
          if (state.storeId && state.storeId !== item.storeId) {
            alert('You can only order from one store at a time. Please clear your cart first.');
            return state;
          }

          const existingItem = state.items.find((i) => i.productId === item.productId);

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          } else {
            newItems = [...state.items, { ...item, quantity: 1 }];
          }

          const subtotal = calculateSubtotal(newItems);
          const total = calculateTotal(subtotal, state.deliveryFee, state.discount);

          return {
            items: newItems,
            subtotal,
            total,
            storeId: item.storeId,
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.productId !== productId);
          const subtotal = calculateSubtotal(newItems);
          const total = calculateTotal(subtotal, state.deliveryFee, state.discount);

          return {
            items: newItems,
            subtotal,
            total,
            storeId: newItems.length === 0 ? null : state.storeId,
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.productId !== productId);
            const subtotal = calculateSubtotal(newItems);
            const total = calculateTotal(subtotal, state.deliveryFee, state.discount);
            return {
              items: newItems,
              subtotal,
              total,
              storeId: newItems.length === 0 ? null : state.storeId,
            };
          }

          const newItems = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          );

          const subtotal = calculateSubtotal(newItems);
          const total = calculateTotal(subtotal, state.deliveryFee, state.discount);

          return {
            items: newItems,
            subtotal,
            total,
          };
        }),

      clearCart: () =>
        set({
          items: [],
          subtotal: 0,
          total: 0,
          discount: 0,
          couponCode: null,
          storeId: null,
        }),

      applyCoupon: (code, discountAmount) =>
        set((state) => {
          const total = calculateTotal(state.subtotal, state.deliveryFee, discountAmount);
          return {
            couponCode: code,
            discount: discountAmount,
            total,
          };
        }),

      removeCoupon: () =>
        set((state) => {
          const total = calculateTotal(state.subtotal, state.deliveryFee, 0);
          return {
            couponCode: null,
            discount: 0,
            total,
          };
        }),

      setDeliveryFee: (fee) =>
        set((state) => {
          const total = calculateTotal(state.subtotal, fee, state.discount);
          return {
            deliveryFee: fee,
            total,
          };
        }),

      calculateTotals: () =>
        set((state) => {
          const subtotal = calculateSubtotal(state.items);
          const total = calculateTotal(subtotal, state.deliveryFee, state.discount);
          return {
            subtotal,
            total,
          };
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
);