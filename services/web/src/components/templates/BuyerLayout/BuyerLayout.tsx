'use client';

// services/web/src/components/templates/BuyerLayout/BuyerLayout.tsx
import React, { useState } from 'react';
import { Home, Search, ShoppingBag as ShoppingBagIcon, User } from 'lucide-react';
import { CartSidebar, CartItem, Footer, Navbar } from '../../organisms';
import { Badge, Typography } from '../../atoms';

export interface BuyerLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string;
  cartItems?: CartItem[];
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
  cartItems = [],
  cartSubtotal = 0,
  cartDeliveryFee = 0,
  cartDiscount = 0,
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
  
  // Use cartCount if provided, otherwise fall back to cartItems length
  const totalCartCount = cartCount ?? cartItems.length;

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
    setIsCartOpen(true);
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
          onSearch={onSearch}
          onCartClick={handleCartClick}
          onLoginClick={onLoginClick}
          onProfileClick={onProfileClick}
          onLogoClick={onLogoClick}
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
                  <Badge variant="danger" size="sm" rounded>
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
        subtotal={cartSubtotal}
        deliveryFee={cartDeliveryFee}
        discount={cartDiscount}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          onCartCheckout();
        }}
        onUpdateQuantity={onCartUpdateQuantity}
        onRemoveItem={onCartRemoveItem}
      />
    </div>
  );
};