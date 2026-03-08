// services/web/src/types/api.types.ts

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Paginated Response
export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Error Response
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth API Types
export interface LoginResponse {
  user: any;
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

// Store API Types
export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  image?: string;

  // Location
  latitude: number;
  longitude: number;
  distance?: number; // Distance from user in km

  // Status
  isOnline: boolean;
  isOpen: boolean;

  // Timings
  openTime: string;
  closeTime: string;

  // Stats
  rating: number;
  totalReviews: number;
  totalOrders: number;

  // Delivery
  estimatedDeliveryTime?: number; // in minutes
  minimumOrderAmount?: number;
  deliveryFee?: number;

  // Categories available
  categories?: string[];
}

export interface NearbyStoresParams {
  latitude: number;
  longitude: number;
  radius?: number; // in km, default 5
}

// Coupon API Types
export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderAmount: number;
  maximumDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface ValidateCouponResponse {
  valid: boolean;
  discount: number;
  message: string;
}

// Payment API Types
export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface PaymentVerification {
  success: boolean;
  transactionId: string;
  message: string;
}

// Rider API Types
export interface RiderLocation {
  riderId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
}

export interface RiderEarnings {
  totalEarnings: number;
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  pendingPayout: number;
  completedDeliveries: number;
}

// Admin API Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalStores: number;
  totalRiders: number;
  activeOrders: number;

  // Growth metrics
  ordersGrowth: number;
  revenueGrowth: number;
  usersGrowth: number;

  // Charts data
  ordersChart?: ChartData[];
  revenueChart?: ChartData[];
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

// WebSocket Message Types
export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: string;
  timestamp: string;
  riderName?: string;
  riderPhone?: string;
  estimatedTime?: string;
}

export interface NotificationMessage {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
