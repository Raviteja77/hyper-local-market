'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SellerLayout } from '@/components/templates';

export default function SellerRouteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(true);

  // Determine active menu item based on URL
  const getActiveMenuItem = () => {
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/earnings')) return 'earnings';
    if (pathname.includes('/inventory')) return 'inventory';
    return 'dashboard';
  };

  return (
    <SellerLayout
      storeName="Sharma Kirana Store"
      storeAvatar="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200"
      isOnline={isOnline}
      onToggleOnline={setIsOnline}
      activeMenuItem={getActiveMenuItem()}
      pendingOrders={5} // This will be connected to global store later
    >
      {children}
    </SellerLayout>
  );
}
