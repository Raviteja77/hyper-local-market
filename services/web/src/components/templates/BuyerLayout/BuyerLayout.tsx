'use client';

// services/web/src/components/templates/BuyerLayout/BuyerLayout.tsx
import React, { useState } from 'react';
import { Home, Search, ShoppingBag as ShoppingBagIcon, User } from 'lucide-react';
import { CartSidebar, Footer, Navbar } from '../../organisms';
import { Badge, Typography } from '../../atoms';
import { useCartStore } from '@/store';
import { useRouter } from 'next/navigation';

export interface BuyerLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string;
  cartItems?: any[]; // Keep for backward compatibility but will use store
  cartSubtotal?: number;
  cartDeliveryFee?: number;
  cartDiscount?: number;
  showFooter?: boolean;
  onSearch?: (query: string) => void;
  onCartCheckout?: () => void;
  onCartUpdateQuantity?: (itemId: string, quantity: number) => void;
  onCartRemoveItem?: (itemId: string) => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  // Navbar props passed through
  address?: string;
  cartCount?: number;
  notificationCount?: number;
  onAddressClick?: () => void;
  onCartClick?: () => void;
  // Bottom nav
  activeRoute?: 'home' | 'search' | 'cart' | 'profile';
  onNavClick?: (route: string) => void;
  className?: string;
}

export const BuyerLayout: React.FC<BuyerLayoutProps> = ({
  children,
  userName,
  userAvatar,
  cartItems: _cartItems, // Ignore prop, use store instead
  cartSubtotal: _cartSubtotal,
  cartDeliveryFee: _cartDeliveryFee,
  cartDiscount: _cartDiscount,
  showFooter = true,
  onSearch,
  onCartCheckout = () => {},
  onCartUpdateQuantity = () => {},
  onCartRemoveItem = () => {},
  onLoginClick,
  onProfileClick,
  onLogoClick,
  address,
  cartCount,
  notificationCount,
  onAddressClick,
  onCartClick,
  activeRoute = 'home',
  onNavClick = () => {},
  className = '',
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Conditionally use router only in Next.js environment
  let router: ReturnType<typeof useRouter> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter();
  } catch (error) {
    // Router not available (e.g., in Storybook), that's ok
    router = null;
  }
  
  // Get cart data from store
  const { 
    items: cartItems, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    updateQuantity,
    removeItem,
  } = useCartStore();
  
  // Use cartCount if provided, otherwise fall back to cartItems length
  const totalCartCount = cartCount ?? cartItems.length;

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
    setIsCartOpen(true);
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else if (router && typeof window !== 'undefined') {
      router.push('/login');
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    onCartUpdateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    // Find the cart item to get the actual cart item id
    const item = cartItems.find(i => i.productId === productId);
    if (item) {
      removeItem(productId);
      onCartRemoveItem(item.id);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Navbar - Sticky at top */}
      <div className="sticky top-0 z-40">
        <Navbar
          isLoggedIn={!!userName}
          userName={userName}
          userAvatar={userAvatar}
          cartItemCount={totalCartCount}
          currentAddress={address}
          onSearch={onSearch}
          onCartClick={handleCartClick}
          onLoginClick={onLoginClick}
          onProfileClick={onProfileClick}
          onLogoClick={onLogoClick}
          onLocationClick={onAddressClick}
        />
      </div>

      {/* Main Content - Scrollable with padding-bottom to clear bottom nav */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-md mx-auto md:max-w-7xl">
          {children}
        </div>
      </main>

      {/* Footer - Hidden on mobile when bottom nav is shown */}
      {showFooter && <Footer className="hidden md:block" />}

      {/* Bottom Navigation Bar - Mobile only (hidden on md+) */}
      {/* Height: 72px (h-18 defined in tailwind.config.ts) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg h-18 z-30 border-t border-gray-200">
        <div className="max-w-md mx-auto h-full flex items-center justify-around px-4">
          {/* Home */}
          <button
            onClick={() => onNavClick('home')}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
          >
            <Home
              size={24}
              className={activeRoute === 'home' ? 'text-primary' : 'text-gray-400'}
              fill={activeRoute === 'home' ? 'currentColor' : 'none'}
            />
            <Typography
              variant="caption"
              className={`text-xs ${activeRoute === 'home' ? 'text-primary' : 'text-gray-400'}`}
            >
              Home
            </Typography>
          </button>

          {/* Search */}
          <button
            onClick={() => onNavClick('search')}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
          >
            <Search
              size={24}
              className={activeRoute === 'search' ? 'text-primary' : 'text-gray-400'}
            />
            <Typography
              variant="caption"
              className={`text-xs ${activeRoute === 'search' ? 'text-primary' : 'text-gray-400'}`}
            >
              Search
            </Typography>
          </button>

          {/* Shopping Bag (Cart) */}
          <button
            onClick={() => {
              onNavClick('cart');
              handleCartClick();
            }}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 relative"
          >
            <div className="relative">
              <ShoppingBagIcon
                size={24}
                className={activeRoute === 'cart' ? 'text-primary' : 'text-gray-400'}
              />
              {totalCartCount > 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="error">
                    {totalCartCount > 9 ? '9+' : totalCartCount}
                  </Badge>
                </div>
              )}
            </div>
            <Typography
              variant="caption"
              className={`text-xs ${activeRoute === 'cart' ? 'text-primary' : 'text-gray-400'}`}
            >
              Cart
            </Typography>
          </button>

          {/* Profile */}
          <button
            onClick={() => onNavClick('profile')}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
          >
            <User
              size={24}
              className={activeRoute === 'profile' ? 'text-primary' : 'text-gray-400'}
              fill={activeRoute === 'profile' ? 'currentColor' : 'none'}
            />
            <Typography
              variant="caption"
              className={`text-xs ${activeRoute === 'profile' ? 'text-primary' : 'text-gray-400'}`}
            >
              Profile
            </Typography>
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        items={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        isAuthenticated={!!userName}
        onLoginClick={handleLoginClick}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          onCartCheckout();
        }}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};