// services/web/src/lib/api/endpoints.ts
import { api } from './client';
import { User } from '@/store';
import { Order } from '@/store/slices/orderSlice';

// ============================================
// AUTH ENDPOINTS
// ============================================

export const authAPI = {
  // Send OTP
  sendOTP: (phone: string) =>
    api.post('/auth/send-otp/', { phone }),

  // Verify OTP and login
  verifyOTP: (phone: string, otp: string) =>
    api.post<{ user: User; access: string; refresh: string }>('/auth/verify-otp/', {
      phone,
      otp,
    }),

  // Buyer registration
  buyerSignup: (data: { full_name: string; email?: string; phone: string; password: string }) =>
    api.post<{ user: User; access: string; refresh: string }>('/users/signup/buyer/', data),

  // Refresh token
  refreshToken: (refresh: string) =>
    api.post<{ access: string }>('/auth/refresh/', { refresh }),

  // Get current user
  getCurrentUser: () => api.get<User>('/auth/me/'),

  // Update profile
  updateProfile: (data: Partial<User>) =>
    api.patch<User>('/auth/me/', data),

  // Logout
  logout: () => api.post('/auth/logout/'),
};

// ============================================
// PRODUCT ENDPOINTS
// ============================================

export const productAPI = {
  // Get all products
  getProducts: (params?: { category?: string; search?: string; storeId?: string }) =>
    api.get('/products/', { params }),

  // Get product by ID
  getProduct: (id: string) => api.get(`/products/${id}/`),

  // Search products
  searchProducts: (query: string, storeId?: string) =>
    api.get('/products/search/', { params: { q: query, store_id: storeId } }),
};

// ============================================
// STORE ENDPOINTS
// ============================================

export const storeAPI = {
  // Get nearby stores
  getNearbyStores: (latitude: number, longitude: number, radius?: number) =>
    api.get('/stores/nearby/', {
      params: { lat: latitude, lon: longitude, radius: radius || 5 },
    }),

  // Get store by ID
  getStore: (id: string) => api.get(`/stores/${id}/`),

  // Get store inventory
  getStoreInventory: (storeId: string, params?: { category?: string; search?: string }) =>
    api.get(`/stores/${storeId}/inventory/`, { params }),

  // Update store status (seller)
  updateStoreStatus: (storeId: string, isOnline: boolean) =>
    api.patch(`/stores/${storeId}/`, { is_online: isOnline }),
};

// ============================================
// INVENTORY ENDPOINTS (Seller)
// ============================================

export const inventoryAPI = {
  // Get seller's inventory
  getMyInventory: () => api.get('/inventory/'),

  // Toggle product stock
  toggleStock: (productId: string, inStock: boolean) =>
    api.patch(`/inventory/${productId}/`, { in_stock: inStock }),

  // Update product price
  updatePrice: (productId: string, price: number) =>
    api.patch(`/inventory/${productId}/`, { price }),

  // Bulk update inventory
  bulkUpdate: (updates: Array<{ product_id: string; in_stock?: boolean; price?: number }>) =>
    api.post('/inventory/bulk-update/', { updates }),
};

// ============================================
// ORDER ENDPOINTS
// ============================================

export const orderAPI = {
  // Create order
  createOrder: (data: {
    store_id: string;
    items: Array<{ product_id: string; quantity: number }>;
    delivery_address: {
      name: string;
      phone: string;
      address: string;
    };
    coupon_code?: string;
  }) => api.post<Order>('/orders/', data),

  // Get user's orders
  getMyOrders: (params?: { status?: string }) =>
    api.get<Order[]>('/orders/', { params }),

  // Get order by ID
  getOrder: (orderId: string) => api.get<Order>(`/orders/${orderId}/`),

  // Cancel order
  cancelOrder: (orderId: string, reason?: string) =>
    api.post(`/orders/${orderId}/cancel/`, { reason }),

  // Rate order
  rateOrder: (orderId: string, rating: number, review?: string) =>
    api.post(`/orders/${orderId}/rate/`, { rating, review }),

  // Seller: Get store orders
  getStoreOrders: (params?: { status?: string }) =>
    api.get<Order[]>('/orders/store/', { params }),

  // Seller: Accept order
  acceptOrder: (orderId: string) =>
    api.post(`/orders/${orderId}/accept/`),

  // Seller: Reject order
  rejectOrder: (orderId: string, reason?: string) =>
    api.post(`/orders/${orderId}/reject/`, { reason }),

  // Seller: Mark as ready
  markReady: (orderId: string) =>
    api.post(`/orders/${orderId}/ready/`),

  // Rider: Get assigned orders
  getRiderOrders: (params?: { status?: string }) =>
    api.get<Order[]>('/orders/rider/', { params }),

  // Rider: Accept delivery
  acceptDelivery: (orderId: string) =>
    api.post(`/orders/${orderId}/accept-delivery/`),

  // Rider: Mark picked up
  markPickedUp: (orderId: string) =>
    api.post(`/orders/${orderId}/picked-up/`),

  // Rider: Mark delivered
  markDelivered: (orderId: string, otp: string) =>
    api.post(`/orders/${orderId}/delivered/`, { otp }),
};

// ============================================
// PAYMENT ENDPOINTS
// ============================================

interface PaymentIntentResponse {
  razorpay_key_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (orderId: string) =>
    api.post<PaymentIntentResponse>('/payments/create-intent/', { order_id: orderId }),

  // Verify payment
  verifyPayment: (paymentId: string, signature: string) =>
    api.post('/payments/verify/', { payment_id: paymentId, signature }),

  // Get payment history
  getPaymentHistory: () => api.get('/payments/'),
};

// ============================================
// COUPON ENDPOINTS
// ============================================

export const couponAPI = {
  // Validate coupon
  validateCoupon: (code: string, orderAmount: number) =>
    api.post<{ valid: boolean; discount: number; message: string }>('/coupons/validate/', {
      code,
      order_amount: orderAmount,
    }),

  // Apply coupon
  applyCoupon: (code: string) =>
    api.post('/coupons/apply/', { code }),
};

// ============================================
// RIDER ENDPOINTS
// ============================================

export const riderAPI = {
  // Toggle online status
  toggleOnline: (isOnline: boolean) =>
    api.post('/riders/toggle-online/', { is_online: isOnline }),

  // Update location
  updateLocation: (latitude: number, longitude: number) =>
    api.post('/riders/update-location/', { lat: latitude, lon: longitude }),

  // Get earnings
  getEarnings: (params?: { start_date?: string; end_date?: string }) =>
    api.get('/riders/earnings/', { params }),
};

// ============================================
// ADMIN ENDPOINTS
// ============================================

export const adminAPI = {
  // Get dashboard stats
  getDashboardStats: () => api.get('/admin/stats/'),

  // Get all users
  getUsers: (params?: { role?: string; search?: string; page?: number }) =>
    api.get('/admin/users/', { params }),

  // Get all stores
  getStores: (params?: { status?: string; search?: string; page?: number }) =>
    api.get('/admin/stores/', { params }),

  // Get all riders
  getRiders: (params?: { status?: string; search?: string; page?: number }) =>
    api.get('/admin/riders/', { params }),

  // Get all orders
  getOrders: (params?: { status?: string; search?: string; page?: number }) =>
    api.get('/admin/orders/', { params }),
};