// services/web/src/types/index.ts

// User Types
export type {
  UserRole,
  UserStatus,
  Address,
  User,
  Buyer,
  Seller,
  Rider,
  Admin,
  LoginCredentials,
  RegisterData,
  UpdateProfileData,
  UpdateAddressData,
} from "./user.types";

// Product Types
export type {
  ProductCategory,
  ProductUnit,
  Product,
  StoreProduct,
  InventoryItem,
  ProductSearchFilters,
  ProductSearchResult,
  CategoryInfo,
} from "./product.types";

// Order Types
export type {
  PaymentMethod,
  PaymentStatus,
  OrderItem,
  Order,
  CreateOrderPayload,
  OrderFilters,
  OrderStats,
  OrderTimeline,
  RatingData,
} from "./order.types";

// API Types
export type {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  ValidationError,
  LoginResponse,
  RefreshTokenResponse,
  SendOTPResponse,
  Store,
  NearbyStoresParams,
  Coupon,
  ValidateCouponResponse,
  PaymentIntent,
  PaymentVerification,
  RiderLocation,
  RiderEarnings,
  DashboardStats,
  ChartData,
  WebSocketMessage,
  OrderStatusUpdate,
  NotificationMessage,
} from "./api.types";
