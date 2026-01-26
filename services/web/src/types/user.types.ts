// services/web/src/types/user.types.ts

export type UserRole = 'buyer' | 'seller' | 'rider' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

export interface Address {
  id?: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export interface User {
  id: string;
  role: UserRole;
  status: UserStatus;
  
  // Basic Info
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  
  // Addresses
  addresses?: Address[];
  defaultAddressId?: string;
  
  // Location
  currentLatitude?: number;
  currentLongitude?: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface Buyer extends User {
  role: 'buyer';
  
  // Buyer specific
  totalOrders: number;
  favoriteStores?: string[];
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
  };
}

export interface Seller extends User {
  role: 'seller';
  
  // Store Info
  storeId: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeImage?: string;
  
  // Store Settings
  isOnline: boolean;
  storeTimings?: {
    openTime: string;
    closeTime: string;
    isOpen24Hours: boolean;
  };
  
  // Business Info
  gstNumber?: string;
  fssaiNumber?: string;
  
  // Stats
  totalOrders: number;
  completedOrders: number;
  rating: number;
  totalReviews: number;
  reliabilityScore: number;
  
  // Financials
  totalEarnings: number;
  pendingPayout: number;
  lastPayoutDate?: string;
}

export interface Rider extends User {
  role: 'rider';
  
  // Rider Info
  vehicleType: 'bike' | 'scooter' | 'bicycle';
  vehicleNumber: string;
  drivingLicense: string;
  
  // Status
  isOnline: boolean;
  currentLatitude?: number;
  currentLongitude?: number;
  
  // Stats
  totalDeliveries: number;
  completedDeliveries: number;
  rating: number;
  totalReviews: number;
  reliabilityScore: number;
  
  // Current Delivery
  currentOrderId?: string;
  isOnDelivery: boolean;
  
  // Financials
  totalEarnings: number;
  todayEarnings: number;
  pendingPayout: number;
  lastPayoutDate?: string;
  
  // KYC
  aadharNumber?: string;
  panNumber?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  isKycVerified: boolean;
}

export interface Admin extends User {
  role: 'admin';
  
  // Admin Permissions
  permissions: string[];
  isSuperAdmin: boolean;
}

export interface LoginCredentials {
  phone: string;
  otp?: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UpdateAddressData extends Partial<Address> {
  id?: string;
}