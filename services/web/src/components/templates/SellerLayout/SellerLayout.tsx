'use client';

import React, { useState } from 'react';
import { Avatar, Badge, Icon, IconName, Typography } from '../../atoms';

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  badge?: number;
}

export interface SellerLayoutProps {
  children: React.ReactNode;
  storeName?: string;
  storeAvatar?: string;
  isOnline?: boolean;
  pendingOrders?: number;
  menuItems?: MenuItem[];
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
  onToggleOnline?: (online: boolean) => void;
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/seller/dashboard' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingBag', href: '/seller/orders' },
  { id: 'inventory', label: 'Inventory', icon: 'Package', href: '/seller/inventory' },
  { id: 'earnings', label: 'Earnings', icon: 'DollarSign', href: '/seller/earnings' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/seller/settings' },
];

export const SellerLayout: React.FC<SellerLayoutProps> = ({
  children,
  storeName = 'My Store',
  storeAvatar,
  isOnline = true,
  pendingOrders = 0,
  menuItems = defaultMenuItems,
  activeMenuItem = 'dashboard',
  onMenuItemClick,
  onToggleOnline,
  className = '',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = (itemId: string) => {
    onMenuItemClick?.(itemId);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Icon name={isSidebarOpen ? 'X' : 'Menu'} size={24} />
          </button>

          {/* Store Info */}
          <div className="flex items-center gap-3">
            <Avatar src={storeAvatar} alt={storeName} size="md" />
            <div className="hidden sm:block">
              <Typography variant="body" weight="semibold">
                {storeName}
              </Typography>
              <Typography variant="small" color="muted">
                Seller Dashboard
              </Typography>
            </div>
          </div>

          {/* Online Toggle */}
          <div className="flex items-center gap-3">
            <Typography variant="small" color="muted" className="hidden sm:block">
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

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col pt-4">
            {/* Pending Orders Alert */}
            {pendingOrders > 0 && (
              <div className="mx-4 mb-4 p-3 bg-warning bg-opacity-10 border border-warning rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} color="#F59E0B" />
                  <Typography variant="small" weight="medium" color="default">
                    {pendingOrders} pending order{pendingOrders !== 1 ? 's' : ''}
                  </Typography>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <nav className="flex-1 px-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = item.id === activeMenuItem;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      color={isActive ? 'white' : '#374151'}
                    />
                    <Typography
                      variant="body"
                      weight={isActive ? 'semibold' : 'medium'}
                      className={isActive ? 'text-white' : 'text-gray-700'}
                    >
                      {item.label}
                    </Typography>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge
                        variant={isActive ? 'secondary' : 'danger'}
                        size="sm"
                        rounded
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Help & Logout */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="HelpCircle" size={20} color="#374151" />
                <Typography variant="body" weight="medium">
                  Help & Support
                </Typography>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-danger hover:bg-red-50 rounded-lg transition-colors mt-1">
                <Icon name="LogOut" size={20} color="#EF4444" />
                <Typography variant="body" weight="medium" color="error">
                  Logout
                </Typography>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};