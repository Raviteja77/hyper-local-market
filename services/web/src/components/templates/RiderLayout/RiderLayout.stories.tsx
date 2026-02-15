// services/web/src/components/templates/RiderLayout/RiderLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RiderLayout } from './RiderLayout';
import { Typography } from '../../atoms';

const meta: Meta<typeof RiderLayout> = {
  title: 'Templates/RiderLayout',
  component: RiderLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof RiderLayout>;

export const Online: Story = {
  args: {
    riderName: 'Rajesh Kumar',
    riderAvatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
    activeDeliveries: 2,
    todayEarnings: 450,
    onToggleOnline: (online) => console.log('Toggle online:', online),
    onNavigationClick: (section) => console.log('Navigate to:', section),
    children: (
      <div className="p-4 md:p-8">
        <Typography variant="h2" weight="bold" className="mb-6">
          Active Deliveries
        </Typography>
        <div className="grid gap-4">
          <div className="bg-white p-6-lg shadow-sm border border-gray-200">
            <Typography variant="body" weight="semibold" className="mb-2">
              Order #12345
            </Typography>
            <Typography variant="caption" color="muted">
              Pickup: Sharma Kirana Store
            </Typography>
            <Typography variant="caption" color="muted">
              Delivery: 123 Main Street
            </Typography>
          </div>
        </div>
      </div>
    ),
  },
};

export const Offline: Story = {
  args: {
    riderName: 'Amit Singh',
    riderAvatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: false,
    activeDeliveries: 0,
    todayEarnings: 0,
    onToggleOnline: (online) => console.log('Toggle online:', online),
    onNavigationClick: (section) => console.log('Navigate to:', section),
    children: (
      <div className="p-4 md:p-8">
        <div className="bg-white p-8-lg shadow-sm border border-gray-200 text-center">
          <Typography variant="h3" weight="bold" className="mb-2">
            You&apos;re Offline
          </Typography>
          <Typography variant="body" color="muted" className="mb-4">
            Go online to start receiving delivery requests
          </Typography>
        </div>
      </div>
    ),
  },
};

export const HighEarnings: Story = {
  args: {
    riderName: 'Vikram Mehta',
    riderAvatar: 'https://i.pravatar.cc/150?img=3',
    isOnline: true,
    activeDeliveries: 1,
    todayEarnings: 1250,
    onToggleOnline: (online) => console.log('Toggle online:', online),
    onNavigationClick: (section) => console.log('Navigate to:', section),
    children: (
      <div className="p-4 md:p-8">
        <Typography variant="h2" weight="bold" className="mb-6">
          Today&apos;s Summary
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Deliveries</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">15</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Earnings</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">₹1,250</Typography>
          </div>
          <div className="bg-white p-6-lg shadow-sm">
            <Typography variant="caption" color="muted">Distance</Typography>
            <Typography variant="h3" weight="bold" color="primary" className="mt-2">45 km</Typography>
          </div>
        </div>
      </div>
    ),
  },
};

export const ManyActiveDeliveries: Story = {
  args: {
    riderName: 'Suresh Yadav',
    riderAvatar: 'https://i.pravatar.cc/150?img=4',
    isOnline: true,
    activeDeliveries: 5,
    todayEarnings: 680,
    onToggleOnline: (online) => console.log('Toggle online:', online),
    onNavigationClick: (section) => console.log('Navigate to:', section),
    children: (
      <div className="p-4 md:p-8">
        <Typography variant="h2" weight="bold" className="mb-6">
          Active Deliveries (5)
        </Typography>
        <Typography variant="body" color="muted">
          Multiple delivery orders in progress...
        </Typography>
      </div>
    ),
  },
};

export const WithoutHeader: Story = {
  args: {
    riderName: 'Manoj Kumar',
    isOnline: true,
    showHeader: false,
    children: (
      <div className="p-4 md:p-8">
        <Typography variant="h2" weight="bold" className="mb-4">
          Map View
        </Typography>
        <div className="bg-gray-200-lg h-96 flex items-center justify-center">
          <Typography variant="body" color="muted">
            Map content here
          </Typography>
        </div>
      </div>
    ),
  },
};