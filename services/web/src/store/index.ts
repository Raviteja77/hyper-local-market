// services/web/src/store/index.ts

import { useAuthStore } from './slices/authSlice';
import { useCartStore } from './slices/cartSlices';
import { useOrderStore } from './slices/orderSlice';
import { useUIStore } from './slices/uiSlice';

// Export all stores
export { useAuthStore } from './slices/authSlice';
export type { User, UserRole } from './slices/authSlice';

export { useCartStore } from './slices/cartSlices';
export type { CartItem } from './slices/cartSlices';

export { useOrderStore } from './slices/orderSlice';
export type { Order, OrderItem } from './slices/orderSlice';

export { useUIStore } from './slices/uiSlice';
export type { Toast, ToastType, Modal } from './slices/uiSlice';

// Utility hook to reset all stores (useful for logout)
export const useResetStores = () => {
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const { clearOrders } = useOrderStore();
  const { closeAllModals, clearToasts } = useUIStore();

  return () => {
    logout();
    clearCart();
    clearOrders();
    closeAllModals();
    clearToasts();
  };
};