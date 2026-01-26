// services/web/src/store/slices/orderSlice.ts
import { create } from 'zustand';
import { OrderStatus } from '@/components/molecules';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  storeId: string;
  storeName: string;
  storeAddress: string;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
  };
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  estimatedTime?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

interface OrderActions {
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  setCurrentOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
}

type OrderStore = OrderState & OrderActions;

export const useOrderStore = create<OrderStore>((set, get) => ({
  // Initial State
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  // Actions
  setOrders: (orders) =>
    set({
      orders,
      error: null,
    }),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
      currentOrder: order,
      error: null,
    })),

  setCurrentOrder: (order) =>
    set({
      currentOrder: order,
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.orderId === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
      currentOrder:
        state.currentOrder?.orderId === orderId
          ? { ...state.currentOrder, status, updatedAt: new Date().toISOString() }
          : state.currentOrder,
    })),

  updateOrder: (orderId, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.orderId === orderId
          ? { ...order, ...updates, updatedAt: new Date().toISOString() }
          : order
      ),
      currentOrder:
        state.currentOrder?.orderId === orderId
          ? { ...state.currentOrder, ...updates, updatedAt: new Date().toISOString() }
          : state.currentOrder,
    })),

  removeOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.orderId !== orderId),
      currentOrder:
        state.currentOrder?.orderId === orderId ? null : state.currentOrder,
    })),

  clearOrders: () =>
    set({
      orders: [],
      currentOrder: null,
      error: null,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.orderId === orderId);
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },
}));