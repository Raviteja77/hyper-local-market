// services/web/src/lib/utils/constants.ts

// ============================================
// APP CONFIGURATION
// ============================================

export const APP_NAME = 'HyperLocal';
export const APP_DESCRIPTION = 'Fresh groceries from local stores, delivered fast';
export const APP_VERSION = '1.0.0';

// ============================================
// API CONFIGURATION
// ============================================

export const API_TIMEOUT = 30000; // 30 seconds
export const WEBSOCKET_RECONNECT_INTERVAL = 3000; // 3 seconds
export const WEBSOCKET_PING_INTERVAL = 30000; // 30 seconds

// ============================================
// PAGINATION
// ============================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ============================================
// DELIVERY
// ============================================

export const DEFAULT_DELIVERY_RADIUS = 5; // km
export const MAX_DELIVERY_RADIUS = 10; // km
export const DEFAULT_DELIVERY_FEE = 20; // rupees
export const FREE_DELIVERY_THRESHOLD = 500; // rupees
export const ESTIMATED_DELIVERY_TIME = 15; // minutes

// ============================================
// ORDER
// ============================================

export const MIN_ORDER_AMOUNT = 50; // rupees
export const MAX_ORDER_AMOUNT = 10000; // rupees
export const MAX_ITEMS_PER_ORDER = 50;
export const ORDER_CANCELLATION_TIME = 5; // minutes (after order placed)

// ============================================
// PAYMENT
// ============================================

export const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'Banknote' },
  { id: 'upi', label: 'UPI', icon: 'Smartphone' },
  { id: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
  { id: 'wallet', label: 'Wallet', icon: 'Wallet' },
] as const;

// ============================================
// PRODUCT CATEGORIES
// ============================================

export const PRODUCT_CATEGORIES = [
  { id: 'vegetables', label: 'Vegetables', icon: 'Carrot' },
  { id: 'fruits', label: 'Fruits', icon: 'Apple' },
  { id: 'dairy', label: 'Dairy', icon: 'Milk' },
  { id: 'bakery', label: 'Bakery', icon: 'Croissant' },
  { id: 'beverages', label: 'Beverages', icon: 'Coffee' },
  { id: 'snacks', label: 'Snacks', icon: 'Cookie' },
  { id: 'grains', label: 'Grains', icon: 'Wheat' },
  { id: 'oils', label: 'Oils & Ghee', icon: 'Droplet' },
  { id: 'spices', label: 'Spices', icon: 'Pepper' },
  { id: 'personal_care', label: 'Personal Care', icon: 'Sparkles' },
  { id: 'household', label: 'Household', icon: 'Home' },
  { id: 'other', label: 'Other', icon: 'Package' },
] as const;

// ============================================
// PRODUCT UNITS
// ============================================

export const PRODUCT_UNITS = [
  { id: 'kg', label: 'Kilogram (kg)' },
  { id: 'g', label: 'Gram (g)' },
  { id: 'l', label: 'Liter (l)' },
  { id: 'ml', label: 'Milliliter (ml)' },
  { id: 'piece', label: 'Piece' },
  { id: 'dozen', label: 'Dozen' },
  { id: 'packet', label: 'Packet' },
] as const;

// ============================================
// ORDER STATUS
// ============================================

export const ORDER_STATUSES = [
  { id: 'pending', label: 'Pending', color: '#F59E0B' },
  { id: 'confirmed', label: 'Confirmed', color: '#3B82F6' },
  { id: 'preparing', label: 'Preparing', color: '#8B5CF6' },
  { id: 'ready', label: 'Ready for Pickup', color: '#10B981' },
  { id: 'picked_up', label: 'Picked Up', color: '#10B981' },
  { id: 'out_for_delivery', label: 'Out for Delivery', color: '#3B82F6' },
  { id: 'delivered', label: 'Delivered', color: '#10B981' },
  { id: 'cancelled', label: 'Cancelled', color: '#EF4444' },
] as const;

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES = [
  { id: 'buyer', label: 'Buyer' },
  { id: 'seller', label: 'Seller' },
  { id: 'rider', label: 'Rider' },
  { id: 'admin', label: 'Admin' },
] as const;

// ============================================
// RATING
// ============================================

export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const RATING_PRECISION = 0.1;

// ============================================
// IMAGE UPLOAD
// ============================================

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGES_PER_PRODUCT = 5;

// ============================================
// TOAST NOTIFICATIONS
// ============================================

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

// ============================================
// GEOLOCATION
// ============================================

export const DEFAULT_LOCATION = {
  latitude: 28.6139, // Delhi
  longitude: 77.2090,
};

export const LOCATION_ACCURACY_THRESHOLD = 100; // meters

// ============================================
// SEARCH
// ============================================

export const MIN_SEARCH_LENGTH = 2;
export const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

// ============================================
// SELLER SETTINGS
// ============================================

export const SELLER_SLA = {
  ORDER_ACCEPTANCE_TIME: 5, // minutes
  ORDER_PREPARATION_TIME: 15, // minutes
};

// ============================================
// RIDER SETTINGS
// ============================================

export const RIDER_SETTINGS = {
  LOCATION_UPDATE_INTERVAL: 10000, // 10 seconds
  MAX_ACTIVE_DELIVERIES: 3,
};

export const VEHICLE_TYPES = [
  { id: 'bike', label: 'Bike' },
  { id: 'scooter', label: 'Scooter' },
  { id: 'bicycle', label: 'Bicycle' },
] as const;

// ============================================
// COUPON SETTINGS
// ============================================

export const COUPON_TYPES = [
  { id: 'percentage', label: 'Percentage Discount' },
  { id: 'fixed', label: 'Fixed Amount' },
] as const;

export const DEFAULT_COUPONS = [
  { code: 'SAVE30', discount: 30, type: 'percentage', minAmount: 300 },
  { code: 'FLAT50', discount: 50, type: 'fixed', minAmount: 500 },
  { code: 'FIRST100', discount: 100, type: 'fixed', minAmount: 200 },
] as const;

// ============================================
// TIME SLOTS
// ============================================

export const DELIVERY_TIME_SLOTS = [
  { id: '1', label: '8:00 AM - 10:00 AM', start: '08:00', end: '10:00' },
  { id: '2', label: '10:00 AM - 12:00 PM', start: '10:00', end: '12:00' },
  { id: '3', label: '12:00 PM - 2:00 PM', start: '12:00', end: '14:00' },
  { id: '4', label: '2:00 PM - 4:00 PM', start: '14:00', end: '16:00' },
  { id: '5', label: '4:00 PM - 6:00 PM', start: '16:00', end: '18:00' },
  { id: '6', label: '6:00 PM - 8:00 PM', start: '18:00', end: '20:00' },
] as const;

// ============================================
// CONTACT INFORMATION
// ============================================

export const CONTACT_INFO = {
  email: 'support@hyperlocal.com',
  phone: '+91 1800 123 4567',
  whatsapp: '+91 98765 43210',
  address: '123 Main Street, City, State - 110001',
};

// ============================================
// SOCIAL MEDIA LINKS
// ============================================

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/hyperlocal',
  twitter: 'https://twitter.com/hyperlocal',
  instagram: 'https://instagram.com/hyperlocal',
  linkedin: 'https://linkedin.com/company/hyperlocal',
};

// ============================================
// FOOTER LINKS
// ============================================

export const FOOTER_SECTIONS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'For Partners',
    links: [
      { label: 'Become a Seller', href: '/seller-signup' },
      { label: 'Become a Rider', href: '/rider-signup' },
      { label: 'Partner Guidelines', href: '/partner-guidelines' },
    ],
  },
] as const;

// ============================================
// REGEX PATTERNS
// ============================================

export const REGEX_PATTERNS = {
  PHONE: /^[6-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  VEHICLE_NUMBER: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
  AADHAR: /^\d{12}$/,
} as const;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  ADDRESS_ADDED: 'Address added successfully.',
  ADDRESS_UPDATED: 'Address updated successfully.',
  COUPON_APPLIED: 'Coupon applied successfully!',
  RATING_SUBMITTED: 'Thank you for your feedback!',
} as const;