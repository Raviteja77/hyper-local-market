// services/web/src/types/order.types.ts
import { OrderStatus } from '@/components/molecules';
import { Address } from './user.types';

export type PaymentMethod = 'cod' | 'upi' | 'card' | 'wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

export interface Order {
  id: string;
  orderId: string;
  
  // Status
  status: OrderStatus;
  
  // User Info
  userId: string;
  userName: string;
  userPhone: string;
  
  // Store Info
  storeId: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  
  // Items
  items: OrderItem[];
  
  // Pricing
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  
  // Delivery
  deliveryAddress: Address;
  estimatedTime?: string;
  deliveryInstructions?: string;
  
  // Rider Info
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  
  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  
  // Coupon
  couponCode?: string;
  couponDiscount?: number;
  
  // OTP for delivery confirmation
  deliveryOtp?: string;
  
  // Rating
  rating?: number;
  review?: string;
  
  // Cancellation
  cancellationReason?: string;
  cancelledBy?: 'buyer' | 'seller' | 'admin';
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

export interface CreateOrderPayload {
  storeId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  deliveryInstructions?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  storeId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  preparing: number;
  ready: number;
  pickedUp: number;
  outForDelivery: number;
  delivered: number;
  cancelled: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  description?: string;
}

export interface RatingData {
  orderId: string;
  rating: number;
  review?: string;
  ratingFor: 'store' | 'rider' | 'both';
}