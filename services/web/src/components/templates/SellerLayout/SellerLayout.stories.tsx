// services/web/src/components/templates/SellerLayout/SellerLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SellerLayout } from './SellerLayout';
import { Typography } from '../../atoms';

const meta: Meta<typeof SellerLayout> = {
  title: 'Templates/SellerLayout',
  component: SellerLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SellerLayout>;

export const Dashboard: Story = {
  args: {
    storeName: 'Sharma Kirana Store',
    storeAvatar: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    isOnline: true,
    activeMenuItem: 'dashboard',
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onToggleOnline: (online) => console.log('Toggle online:', online),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-4">
          Dashboard
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Today's Orders</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">24</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Revenue</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">₹3,450</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Pending Orders</Typography>
            <Typography variant="h3" weight="bold" color="secondary" className="mt-2">5</Typography>
          </div>
        </div>
      </div>
    ),
  },
};

export const Orders: Story = {
  args: {
    storeName: 'Fresh Mart',
    isOnline: true,
    activeMenuItem: 'orders',
    pendingOrders: 5,
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onToggleOnline: (online) => console.log('Toggle online:', online),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-4">
          Orders
        </Typography>
        <Typography variant="body" color="muted">
          Order management content here...
        </Typography>
      </div>
    ),
  },
};

export const Inventory: Story = {
  args: {
    storeName: 'Quick Shop',
    isOnline: true,
    activeMenuItem: 'inventory',
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onToggleOnline: (online) => console.log('Toggle online:', online),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-4">
          Inventory Management
        </Typography>
        <Typography variant="body" color="muted">
          Inventory content here...
        </Typography>
      </div>
    ),
  },
};

export const Offline: Story = {
  args: {
    storeName: 'Corner Store',
    isOnline: false,
    activeMenuItem: 'dashboard',
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onToggleOnline: (online) => console.log('Toggle online:', online),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-4">
          Store Offline
        </Typography>
        <Typography variant="body" color="muted">
          Your store is currently offline. Toggle online to start receiving orders.
        </Typography>
      </div>
    ),
  },
};

export const WithManyPendingOrders: Story = {
  args: {
    storeName: 'City Grocers',
    isOnline: true,
    activeMenuItem: 'orders',
    pendingOrders: 12,
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/seller/dashboard' },
      { id: 'orders', label: 'Orders', icon: 'ShoppingBag', href: '/seller/orders', badge: 12 },
      { id: 'inventory', label: 'Inventory', icon: 'Package', href: '/seller/inventory' },
      { id: 'earnings', label: 'Earnings', icon: 'DollarSign', href: '/seller/earnings' },
      { id: 'settings', label: 'Settings', icon: 'Settings', href: '/seller/settings' },
    ],
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onToggleOnline: (online) => console.log('Toggle online:', online),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-4">
          Pending Orders
        </Typography>
        <Typography variant="body" color="muted">
          You have 12 orders waiting for confirmation.
        </Typography>
      </div>
    ),
  },
};