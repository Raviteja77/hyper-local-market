// services/web/src/lib/mockData/buyerMock.ts
import {
  ShoppingBag,
  Coffee,
  Home,
  Gamepad2,
  Leaf,
  Cpu,
  Smartphone,
  Sparkles,
  Shirt,
  LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  original: number;
  discount: number;
  pack: string;
  tag?: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  image: string;
}

export interface ProductSection {
  title: string;
  products: Product[];
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'cafe', label: 'Cafe', icon: Coffee },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'toys', label: 'Toys', icon: Gamepad2 },
  { id: 'fresh', label: 'Fresh', icon: Leaf },
  { id: 'electronics', label: 'Electronics', icon: Cpu },
  { id: 'mobiles', label: 'Mobiles', icon: Smartphone },
  { id: 'beauty', label: 'Beauty', icon: Sparkles },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
];

export const PROMO_BANNERS = [
  {
    id: '1',
    title: 'Get 30% off on Dairy Products',
    subtitle: 'Limited Time Offer',
    ctaText: 'Shop Now',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#FFFFFF',
  },
  {
    id: '2',
    title: 'Free Delivery on Orders ₹199+',
    subtitle: 'Fast Delivery',
    ctaText: 'Order Now',
    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#FFFFFF',
  },
  {
    id: '3',
    title: 'Fresh Vegetables at Lowest Prices',
    subtitle: 'Farm Fresh',
    ctaText: 'Browse',
    backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#FFFFFF',
  },
];

export const PRODUCT_SECTIONS: ProductSection[] = [
  {
    title: 'Laundry Care',
    products: [
      {
        id: 'laundry-1',
        name: 'Rin Matic Top Load Detergent Liquid | Pouch',
        price: 177,
        original: 249,
        discount: 72,
        pack: '1 pack (2 L)',
        tag: 'Fresh & Fragrant',
        rating: 4.8,
        reviews: 29800,
        isNew: true,
        image: 'https://picsum.photos/seed/laundry-1/200/200',
      },
      {
        id: 'laundry-2',
        name: 'Surf Excel Matic Top Load Detergent Liquid Refill | Tough Dried…',
        price: 268,
        original: 329,
        discount: 61,
        pack: '1 pack (2 L)',
        tag: 'Stain Removal',
        rating: 4.8,
        reviews: 10600,
        isNew: true,
        image: 'https://picsum.photos/seed/laundry-2/200/200',
      },
      {
        id: 'laundry-3',
        name: 'Surf Excel Matic Front Load Detergent Liquid Refill | Tough Dried…',
        price: 308,
        original: 374,
        discount: 66,
        pack: '1 pack (2 L)',
        tag: 'Stain Removal',
        rating: 4.7,
        reviews: 6600,
        image: 'https://picsum.photos/seed/laundry-3/200/200',
      },
      {
        id: 'laundry-4',
        name: 'Surf Excel Matic Front Load Detergent Liquid | Pouch',
        price: 611,
        original: 858,
        discount: 67,
        pack: '1 pack (5 L)',
        tag: 'Stain Removal',
        rating: 4.9,
        reviews: 3800,
        image: 'https://picsum.photos/seed/laundry-4/200/200',
      },
      {
        id: 'laundry-5',
        name: 'Ariel Power Gel Liquid Detergent for Top load washing machine',
        price: 291,
        original: 335,
        discount: 44,
        pack: '1 pack (2 kg)',
        rating: 4.8,
        reviews: 810,
        image: 'https://picsum.photos/seed/laundry-5/200/200',
      },
      {
        id: 'laundry-6',
        name: 'Ariel Power Gel Liquid Detergent for Front load washing machine',
        price: 330,
        original: 389,
        discount: 59,
        pack: '1 pack (2 kg)',
        rating: 5,
        reviews: 484,
        image: 'https://picsum.photos/seed/laundry-6/200/200',
      },
      {
        id: 'laundry-7',
        name: 'Surf Excel Matic Top Load Detergent Liquid Refill | Tough Dried…',
        price: 195,
        original: 225,
        discount: 30,
        pack: '1 pc (1 L)',
        tag: 'Stain Removal',
        rating: 4.7,
        reviews: 10400,
        image: 'https://picsum.photos/seed/laundry-7/200/200',
      },
      {
        id: 'laundry-8',
        name: 'Rin Matic Front Load Detergent Liquid | Pouch',
        price: 202,
        original: 285,
        discount: 83,
        pack: '1 pack (2 L)',
        tag: 'Fresh & Fragrant',
        rating: 4.7,
        reviews: 5500,
        image: 'https://picsum.photos/seed/laundry-8/200/200',
      },
    ],
  },
  {
    title: 'Household Cleaning',
    products: [
      {
        id: 'cleaning-1',
        name: 'Shatraz Disinfectant Toilet Cleaner',
        price: 532,
        original: 1499,
        discount: 67,
        pack: '1 pack',
        rating: 4.5,
        reviews: 2100,
        image: 'https://picsum.photos/seed/cleaning-1/200/200',
      },
      {
        id: 'cleaning-2',
        name: 'Shatraz Citrus & Pink Lily Disinfectant…',
        price: 532,
        original: 1499,
        discount: 67,
        pack: '1 pack',
        rating: 4.4,
        reviews: 1800,
        image: 'https://picsum.photos/seed/cleaning-2/200/200',
      },
      {
        id: 'cleaning-3',
        name: 'Finish Power Essential Dishwasher…',
        price: 1805,
        original: 1995,
        discount: 10,
        pack: '1 pack',
        rating: 4.6,
        reviews: 900,
        image: 'https://picsum.photos/seed/cleaning-3/200/200',
      },
      {
        id: 'cleaning-4',
        name: 'Lizol Kitchen Cleaning Spray…',
        price: 162,
        original: 200,
        discount: 38,
        pack: '1 bottle',
        rating: 4.3,
        reviews: 1200,
        image: 'https://picsum.photos/seed/cleaning-4/200/200',
      },
      {
        id: 'cleaning-5',
        name: 'Happi Planet | Kitchen Cleaner India…',
        price: 203,
        original: 299,
        discount: 96,
        pack: '1 bottle',
        rating: 4.5,
        reviews: 750,
        image: 'https://picsum.photos/seed/cleaning-5/200/200',
      },
      {
        id: 'cleaning-6',
        name: 'Nimyle Herbal Floor Cleaner',
        price: 400,
        original: 900,
        discount: 50,
        pack: '1 bottle',
        rating: 4.7,
        reviews: 3400,
        image: 'https://picsum.photos/seed/cleaning-6/200/200',
      },
      {
        id: 'cleaning-7',
        name: 'Harpic Original Toilet Cleaner Liquid',
        price: 192,
        original: 235,
        discount: 43,
        pack: '1 bottle',
        rating: 4.6,
        reviews: 2800,
        image: 'https://picsum.photos/seed/cleaning-7/200/200',
      },
      {
        id: 'cleaning-8',
        name: 'Purela Rose Floor Cleaner Liquid…',
        price: 403,
        original: 999,
        discount: 96,
        pack: '1 bottle',
        rating: 4.4,
        reviews: 1500,
        image: 'https://picsum.photos/seed/cleaning-8/200/200',
      },
    ],
  },
];
