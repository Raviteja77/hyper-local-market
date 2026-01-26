// services/web/src/components/templates/BuyerLayout/BuyerLayout.tsx
import React, { useState } from 'react';
import { CartSidebar, CartItem, Footer, Navbar } from '../../organisms';

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
  className = '',
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Navbar */}
      <Navbar
        isLoggedIn={!!userName}
        userName={userName}
        userAvatar={userAvatar}
        cartItemCount={cartItems.length}
        onSearch={onSearch}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
        onLogoClick={onLogoClick}
      />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

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