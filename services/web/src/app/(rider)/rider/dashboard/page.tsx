// src/app/(rider)/rider/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { Button, Icon, Typography, Badge } from '@/components/atoms';

export default function RiderDashboardPage() {
  const [isOnline, setIsOnline] = useState(true); // This would sync with layout state in a real app

  // Mock active order
  const activeOrder = {
    id: 'ORD-12345',
    storeName: 'Sharma Kirana Store',
    storeAddress: 'Shop 12, MG Road, Sector 5',
    customerName: 'John Doe',
    customerAddress: 'Flat 4B, Green Valley Apts',
    distance: '2.5 km',
    earning: 45,
    status: 'picked_up' as const, // 'assigned', 'picked_up'
    items: ['Milk x2', 'Bread x1']
  };

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Icon name="Bike" size={48} color="#9CA3AF" />
        </div>
        <Typography variant="h2" weight="bold" className="mb-2">
          You are Offline
        </Typography>
        <Typography variant="body" color="muted" className="mb-8 max-w-xs">
          Go online to start receiving delivery requests and earning money.
        </Typography>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => setIsOnline(true)}
          className="w-full max-w-xs"
        >
          Go Online
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-xl h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-50" />
        <div className="text-center z-10">
          <Icon name="MapPin" size={48} color="#EF4444" className="mx-auto mb-2" />
          <Typography variant="body" color="muted">Map View Integration</Typography>
        </div>
      </div>

      {/* Active Delivery Card */}
      <div>
        <Typography variant="h3" weight="bold" className="mb-4">
          Current Delivery
        </Typography>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <Badge variant="delivery">Picked Up</Badge>
              <Typography variant="caption" color="muted">#{activeOrder.id}</Typography>
            </div>
            <Typography variant="h4" weight="bold" color="primary">₹{activeOrder.earning}</Typography>
          </div>

          {/* Route */}
          <div className="p-4 space-y-6">
            <div className="relative pl-8 border-l-2 border-gray-200 space-y-8">
              {/* Pickup */}
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white bg-gray-300" />
                <Typography variant="caption" color="muted" className="mb-1">PICKUP</Typography>
                <Typography variant="body" weight="semibold">{activeOrder.storeName}</Typography>
                <Typography variant="caption" color="muted">{activeOrder.storeAddress}</Typography>
              </div>

              {/* Drop */}
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white bg-primary" />
                <Typography variant="caption" color="muted" className="mb-1">DROP</Typography>
                <Typography variant="body" weight="semibold">{activeOrder.customerName}</Typography>
                <Typography variant="caption" color="muted">{activeOrder.customerAddress}</Typography>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                <Icon name="Phone" size={18} />
                Call Customer
              </Button>
              <Button variant="primary" fullWidth className="flex items-center justify-center gap-2">
                <Icon name="CheckCircle" size={18} />
                Mark Delivered
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <Typography variant="caption" color="muted">Today's Trips</Typography>
          <Typography variant="h2" weight="bold">8</Typography>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <Typography variant="caption" color="muted">Online Time</Typography>
          <Typography variant="h2" weight="bold">4h 12m</Typography>
        </div>
      </div>
    </div>
  );
}
