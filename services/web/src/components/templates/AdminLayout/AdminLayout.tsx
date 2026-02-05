'use client';

import React, { useState } from 'react';
import { Avatar, Badge, IconName, Input, Typography } from '../../atoms';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  Bell, 
  LayoutDashboard, 
  Users, 
  Store, 
  Bike, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  type LucideIcon
} from 'lucide-react';

export interface AdminMenuItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  badge?: number;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  adminName?: string;
  adminAvatar?: string;
  menuItems?: AdminMenuItem[];
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
  onSearch?: (query: string) => void;
  showNotifications?: boolean;
  notificationCount?: number;
  className?: string;
}

const defaultMenuItems: AdminMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/admin/dashboard' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingBag', href: '/admin/orders' },
  { id: 'users', label: 'Users', icon: 'Users', href: '/admin/users' },
  { id: 'stores', label: 'Stores', icon: 'Store', href: '/admin/stores' },
  { id: 'riders', label: 'Riders', icon: 'Bike', href: '/admin/riders' },
  { id: 'products', label: 'Products', icon: 'Package', href: '/admin/products' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', href: '/admin/analytics' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/admin/settings' },
];

const getIconComponent = (iconName: IconName): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Store,
    Bike,
    Package,
    BarChart3,
    Settings,
  };
  return iconMap[iconName] || LayoutDashboard;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  adminName = 'Admin',
  adminAvatar,
  menuItems = defaultMenuItems,
  activeMenuItem = 'dashboard',
  onMenuItemClick,
  onSearch,
  showNotifications = true,
  notificationCount = 0,
  className = '',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuClick = (itemId: string) => {
    onMenuItemClick?.(itemId);
    setIsSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag size={28} color="#10B981" />
              <Typography variant="h4" weight="bold" color="primary" className="hidden sm:block">
                HyperLocal Admin
              </Typography>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search size={20} color="#6B7280" />
              </div>
              <Input
                type="search"
                placeholder="Search orders, users, stores..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            {showNotifications && (
              <button className="relative p-2 hover:bg-gray-100-lg transition-colors">
                <Bell size={24} color="#374151" />
                {notificationCount > 0 && (
                  <div className="absolute top-1 right-1">
                    <Badge variant="error">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </Badge>
                  </div>
                )}
              </button>
            )}

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <Avatar src={adminAvatar} alt={adminName} />
              <Typography variant="caption" weight="medium" className="hidden sm:block">
                {adminName}
              </Typography>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search size={18} color="#6B7280" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              fullWidth
             
              className="pl-10"
            />
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
          <div className="h-full flex flex-col pt-4 pb-4">
            {/* Menu Items */}
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = item.id === activeMenuItem;
                const IconComponent = getIconComponent(item.icon);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent
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
                       
                       
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="px-2 pt-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-danger hover:bg-red-50-lg transition-colors">
                <LogOut size={20} color="#EF4444" />
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