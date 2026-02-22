'use client';

import React from 'react';
import { Avatar, Badge, Typography } from '../../atoms';
import { Bike, DollarSign, LayoutDashboard, Package } from 'lucide-react';

export interface RiderLayoutProps {
  children: React.ReactNode;
  riderName?: string;
  riderAvatar?: string;
  isOnline?: boolean;
  activeDeliveries?: number;
  todayEarnings?: number;
  onToggleOnline?: (online: boolean) => void;
  onNavigationClick?: (section: 'dashboard' | 'orders' | 'earnings') => void;
  showHeader?: boolean;
  className?: string;
}

export const RiderLayout: React.FC<RiderLayoutProps> = ({
  children,
  riderName = 'Rider',
  riderAvatar,
  isOnline = false,
  activeDeliveries = 0,
  todayEarnings = 0,
  onToggleOnline,
  onNavigationClick,
  showHeader = true,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Top Bar */}
      {showHeader && (
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Rider Info */}
            <div className="flex items-center gap-3">
              <Avatar src={riderAvatar} name={riderName} size="md" />
              <div>
                <Typography variant="body" weight="semibold">
                  {riderName}
                </Typography>
                <Typography variant="caption" color="muted">
                  Delivery Partner
                </Typography>
              </div>
            </div>

            {/* Stats & Toggle */}
            <div className="flex items-center gap-4">
              {/* Active Deliveries */}
              {activeDeliveries > 0 && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary bg-opacity-10-lg">
                  <Bike size={18} color="#10B981" />
                  <Typography variant="caption" weight="medium" color="primary">
                    {activeDeliveries} Active
                  </Typography>
                </div>
              )}

              {/* Today's Earnings */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <DollarSign size={18} color="#374151" />
                <Typography variant="caption" weight="medium">
                  ₹{todayEarnings.toFixed(0)}
                </Typography>
              </div>

              {/* Online Toggle */}
              <div className="flex items-center gap-2">
                <Typography variant="caption" color="muted" className="hidden sm:block">
                  {isOnline ? 'Online' : 'Offline'}
                </Typography>
                <button
                  onClick={() => onToggleOnline?.(!isOnline)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isOnline ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isOnline ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Stats Bar */}
          <div className="sm:hidden border-t border-gray-200 px-4 py-2 flex items-center justify-between">
            {activeDeliveries > 0 && (
              <div className="flex items-center gap-2">
                <Bike size={16} color="#10B981" />
                <Typography variant="caption" weight="medium" color="primary">
                  {activeDeliveries} Active
                </Typography>
              </div>
            )}
            <div className="flex items-center gap-2">
              <DollarSign size={16} color="#374151" />
              <Typography variant="caption" weight="medium">
                ₹{todayEarnings.toFixed(0)} Today
              </Typography>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => onNavigationClick?.('dashboard')}
            className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard size={20} color="#374151" />
            <Typography variant="caption" color="muted">
              Dashboard
            </Typography>
          </button>
          <button
            onClick={() => onNavigationClick?.('orders')}
            className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors relative"
          >
            <Package size={20} color="#374151" />
            {activeDeliveries > 0 && (
              <div className="absolute top-2 right-1/2 translate-x-6">
                <Badge variant="error">
                  {activeDeliveries}
                </Badge>
              </div>
            )}
            <Typography variant="caption" color="muted">
              Orders
            </Typography>
          </button>
          <button
            onClick={() => onNavigationClick?.('earnings')}
            className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
          >
            <DollarSign size={20} color="#374151" />
            <Typography variant="caption" color="muted">
              Earnings
            </Typography>
          </button>
        </div>
      </nav>
    </div>
  );
};