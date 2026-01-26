// services/web/src/lib/hooks/useCart.ts
import { useState } from 'react';
import { useCartStore, CartItem } from '@/store';
import { useUIStore } from '@/store';
import { couponAPI } from '@/lib/api/endpoints';

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    storeId,
    addItem: addItemToStore,
    removeItem: removeItemFromStore,
    updateQuantity: updateQuantityInStore,
    clearCart: clearCartInStore,
    applyCoupon: applyCouponToStore,
    removeCoupon: removeCouponFromStore,
    setDeliveryFee: setDeliveryFeeInStore,
    calculateTotals,
  } = useCartStore();

  const { openCart, closeCart } = useUIStore();

  // Add item to cart
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    try {
      addItemToStore(item);
      openCart(); // Optionally open cart sidebar
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to add item to cart');
      return false;
    }
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    try {
      removeItemFromStore(productId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to remove item from cart');
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        return removeItem(productId);
      }
      updateQuantityInStore(productId, quantity);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update quantity');
      return false;
    }
  };

  // Increment item quantity
  const incrementQuantity = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      return updateQuantity(productId, item.quantity + 1);
    }
    return false;
  };

  // Decrement item quantity
  const decrementQuantity = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      return updateQuantity(productId, item.quantity - 1);
    }
    return false;
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      clearCartInStore();
      closeCart();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to clear cart');
      return false;
    }
  };

  // Apply coupon code
  const applyCoupon = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await couponAPI.validateCoupon(code, subtotal);

      if (response.valid) {
        applyCouponToStore(code, response.discount);
        setIsLoading(false);
        return true;
      } else {
        setError(response.message || 'Invalid coupon code');
        setIsLoading(false);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to apply coupon';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    try {
      removeCouponFromStore();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to remove coupon');
      return false;
    }
  };

  // Set delivery fee (can be calculated based on distance)
  const setDeliveryFee = (fee: number) => {
    try {
      setDeliveryFeeInStore(fee);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to set delivery fee');
      return false;
    }
  };

  // Get item by product ID
  const getItem = (productId: string): CartItem | undefined => {
    return items.find((item) => item.productId === productId);
  };

  // Check if product is in cart
  const isInCart = (productId: string): boolean => {
    return items.some((item) => item.productId === productId);
  };

  // Get item quantity
  const getItemQuantity = (productId: string): number => {
    const item = items.find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  };

  // Get total items count
  const getTotalItems = (): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Check if cart is empty
  const isEmpty = (): boolean => {
    return items.length === 0;
  };

  // Validate cart before checkout
  const validateCart = (): { valid: boolean; message?: string } => {
    if (items.length === 0) {
      return { valid: false, message: 'Cart is empty' };
    }

    if (!storeId) {
      return { valid: false, message: 'No store selected' };
    }

    // Add more validation as needed
    return { valid: true };
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return {
    // State
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    storeId,
    isLoading,
    error,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    setDeliveryFee,
    calculateTotals,

    // Getters
    getItem,
    isInCart,
    getItemQuantity,
    getTotalItems,
    isEmpty,

    // Validation
    validateCart,

    // Helpers
    clearError,
  };
};