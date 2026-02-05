// services/web/src/components/templates/AdminLayout/AdminLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AdminLayout } from './AdminLayout';
import { Typography } from '../../atoms';

const meta: Meta<typeof AdminLayout> = {
  title: 'Templates/AdminLayout',
  component: AdminLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminLayout>;

export const Dashboard: Story = {
  args: {
    adminName: 'Admin User',
    adminAvatar: 'https://i.pravatar.cc/150?img=5',
    activeMenuItem: 'dashboard',
    notificationCount: 5,
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onSearch: (query) => console.log('Search:', query),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-6">
          Dashboard Overview
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6-lg shadow-sm border border-gray-200">
            <Typography variant="caption" color="muted">Total Orders</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">1,234</Typography>
            <Typography variant="caption" color="success" className="mt-1">↑ 12% from last month</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm border border-gray-200">
            <Typography variant="caption" color="muted">Active Users</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">5,678</Typography>
            <Typography variant="caption" color="success" className="mt-1">↑ 8% from last month</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm border border-gray-200">
            <Typography variant="caption" color="muted">Total Stores</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">234</Typography>
            <Typography variant="caption" color="success" className="mt-1">↑ 5% from last month</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm border border-gray-200">
            <Typography variant="caption" color="muted">Revenue</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">₹2.4M</Typography>
            <Typography variant="caption" color="success" className="mt-1">↑ 15% from last month</Typography>
          </div>
        </div>
      </div>
    ),
  },
};

export const Orders: Story = {
  args: {
    adminName: 'Sarah Admin',
    adminAvatar: 'https://i.pravatar.cc/150?img=6',
    activeMenuItem: 'orders',
    notificationCount: 12,
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/admin/dashboard' },
      { id: 'orders', label: 'Orders', icon: 'ShoppingBag', href: '/admin/orders', badge: 12 },
      { id: 'users', label: 'Users', icon: 'Users', href: '/admin/users' },
      { id: 'stores', label: 'Stores', icon: 'Store', href: '/admin/stores' },
      { id: 'riders', label: 'Riders', icon: 'Bike', href: '/admin/riders' },
      { id: 'products', label: 'Products', icon: 'Package', href: '/admin/products' },
      { id: 'analytics', label: 'Analytics', icon: 'BarChart3', href: '/admin/analytics' },
      { id: 'settings', label: 'Settings', icon: 'Settings', href: '/admin/settings' },
    ],
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onSearch: (query) => console.log('Search:', query),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-6">
          Order Management
        </Typography>
        <Typography variant="body" color="muted">
          12 pending orders require attention
        </Typography>
      </div>
    ),
  },
};

export const Users: Story = {
  args: {
    adminName: 'John Admin',
    activeMenuItem: 'users',
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onSearch: (query) => console.log('Search:', query),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-6">
          User Management
        </Typography>
        <div className="bg-white-lg shadow-sm border border-gray-200 p-6">
          <Typography variant="body" color="muted">
            User list and management tools
          </Typography>
        </div>
      </div>
    ),
  },
};

export const Analytics: Story = {
  args: {
    adminName: 'Analytics Admin',
    activeMenuItem: 'analytics',
    notificationCount: 3,
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onSearch: (query) => console.log('Search:', query),
    children: (
      <div>
        <Typography variant="h2" weight="bold" className="mb-6">
          Analytics & Reports
        </Typography>
        <div className="bg-white-lg shadow-sm border border-gray-200 p-6 h-96 flex items-center justify-center">
          <Typography variant="body" color="muted">
            Charts and analytics content
          </Typography>
        </div>
      </div>
    ),
  },
};

export const WithoutNotifications: Story = {
  args: {
    adminName: 'Simple Admin',
    activeMenuItem: 'dashboard',
    showNotifications: false,
    onMenuItemClick: (id) => console.log('Menu clicked:', id),
    onSearch: (query) => console.log('Search:', query),
    children: (
      <div>
        <Typography variant="h2" weight="bold">
          Dashboard
        </Typography>
      </div>
    ),
  },
};