// src/app/(rider)/rider/layout.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { RiderLayout } from '@/components/templates';

export default function RiderRouteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState(false);

  // Mock data - connect to store later
  const riderData = {
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?img=11",
    activeDeliveries: 1,
    todayEarnings: 450
  };

  const handleNavigation = (section: 'dashboard' | 'orders' | 'earnings') => {
    router.push(`/rider/${section}`);
  };

  return (
    <RiderLayout
      riderName={riderData.name}
      riderAvatar={riderData.avatar}
      isOnline={isOnline}
      activeDeliveries={riderData.activeDeliveries}
      todayEarnings={riderData.todayEarnings}
      onToggleOnline={setIsOnline}
      onNavigationClick={handleNavigation}
    >
      {children}
    </RiderLayout>
  );
}
