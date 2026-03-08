// services/web/src/types/product.types.ts

export type ProductCategory = 
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'bakery'
  | 'beverages'
  | 'snacks'
  | 'grains'
  | 'oils'
  | 'spices'
  | 'personal_care'
  | 'household'
  | 'other';

export type ProductUnit = 'kg' | 'g' | 'l' | 'ml' | 'piece' | 'dozen' | 'packet';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  
  // Pricing
  price: number;
  mrp?: number;
  discount?: number;
  
  // Unit
  unit: ProductUnit;
  quantity: number;
  
  // Media
  image?: string;
  images?: string[];
  
  // Metadata
  brand?: string;
  barcode?: string;
  sku?: string;
  
  // Tags
  tags?: string[];
  isOrganic?: boolean;
  isFeatured?: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface StoreProduct extends Product {
  // Store-specific data
  storeId: string;
  storeName: string;
  inStock: boolean;
  stockQuantity?: number;
  
  // Store pricing (can override default price)
  storePrice?: number;
  storeDiscount?: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  storeId: string;
  
  // Product details (denormalized for quick access)
  name: string;
  category: ProductCategory;
  image?: string;
  
  // Inventory
  inStock: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
  
  // Pricing
  price: number;
  mrp?: number;
  discount?: number;
  
  // Metadata
  lastUpdated: string;
}

export interface ProductSearchFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isOrganic?: boolean;
  storeId?: string;
  search?: string;
}

export interface ProductSearchResult {
  products: StoreProduct[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  icon: string;
  productCount: number;
}