// services/web/src/lib/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { useOrderStore, Order } from '@/store';
import { useAuthStore } from '@/store';
import { orderAPI } from '@/lib/api/endpoints';
import { OrderStatus } from '@/components/molecules';
import { useRouter } from 'next/navigation';

interface CreateOrderData {
  storeId: string;
  items: Array<{ productId: string; quantity: number }>;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
  };
  couponCode?: string;
}

export const useOrders = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();
  
  const {
    orders,
    currentOrder,
    setOrders,
    addOrder,
    setCurrentOrder,
    updateOrderStatus,
    updateOrder,
    removeOrder,
    clearOrders,
    getOrderById,
    getOrdersByStatus,
    setLoading: setStoreLoading,
    setError: setStoreError,
  } = useOrderStore();

  // Fetch user's orders
  const fetchOrders = async (status?: OrderStatus): Promise<boolean> => {
    setIsLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      let response: Order[];

      if (user?.role === 'seller') {
        response = await orderAPI.getStoreOrders({ status });
      } else if (user?.role === 'rider') {
        response = await orderAPI.getRiderOrders({ status });
      } else {
        response = await orderAPI.getMyOrders({ status });
      }

      setOrders(response);
      setIsLoading(false);
      setStoreLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
      setStoreError(errorMessage);
      setIsLoading(false);
      setStoreLoading(false);
      return false;
    }
  };

  // Fetch single order by ID
  const fetchOrder = async (orderId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await orderAPI.getOrder(orderId);
      setCurrentOrder(response);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch order';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Create new order
  const createOrder = async (data: CreateOrderData): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedData = {
        store_id: data.storeId,
        items: data.items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
        delivery_address: data.deliveryAddress,
        coupon_code: data.couponCode,
      };

      const response = await orderAPI.createOrder(formattedData);
      addOrder(response);
      setIsLoading(false);

      // Navigate to order details
      router.push(`/orders/${response.orderId}`);

      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create order';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  // Cancel order
  const cancelOrder = async (orderId: string, reason?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.cancelOrder(orderId, reason);
      updateOrderStatus(orderId, 'cancelled');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to cancel order';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Rate order
  const rateOrder = async (orderId: string, rating: number, review?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.rateOrder(orderId, rating, review);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to rate order';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // ============================================
  // SELLER ACTIONS
  // ============================================

  // Accept order (Seller)
  const acceptOrder = async (orderId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.acceptOrder(orderId);
      updateOrderStatus(orderId, 'confirmed');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to accept order';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Reject order (Seller)
  const rejectOrder = async (orderId: string, reason?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.rejectOrder(orderId, reason);
      updateOrderStatus(orderId, 'cancelled');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to reject order';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Mark order as ready (Seller)
  const markAsReady = async (orderId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.markReady(orderId);
      updateOrderStatus(orderId, 'ready');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to mark order as ready';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // ============================================
  // RIDER ACTIONS
  // ============================================

  // Accept delivery (Rider)
  const acceptDelivery = async (orderId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.acceptDelivery(orderId);
      updateOrderStatus(orderId, 'picked_up');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to accept delivery';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Mark as picked up (Rider)
  const markPickedUp = async (orderId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.markPickedUp(orderId);
      updateOrderStatus(orderId, 'out_for_delivery');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to mark as picked up';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Mark as delivered (Rider)
  const markDelivered = async (orderId: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await orderAPI.markDelivered(orderId, otp);
      updateOrderStatus(orderId, 'delivered');
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to mark as delivered';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // ============================================
  // HELPERS
  // ============================================

  // Get orders by status
  const getFilteredOrders = (status: OrderStatus): Order[] => {
    return getOrdersByStatus(status);
  };

  // Get pending orders count
  const getPendingCount = (): number => {
    return getOrdersByStatus('pending').length;
  };

  // Clear error
  const clearError = () => {
    setError(null);
    setStoreError(null);
  };

  return {
    // State
    orders,
    currentOrder,
    isLoading,
    error,

    // Buyer Actions
    fetchOrders,
    fetchOrder,
    createOrder,
    cancelOrder,
    rateOrder,

    // Seller Actions
    acceptOrder,
    rejectOrder,
    markAsReady,

    // Rider Actions
    acceptDelivery,
    markPickedUp,
    markDelivered,

    // Store Actions
    setCurrentOrder,
    updateOrderStatus,
    updateOrder,
    removeOrder,
    clearOrders,

    // Getters
    getOrderById,
    getFilteredOrders,
    getPendingCount,

    // Helpers
    clearError,
  };
};