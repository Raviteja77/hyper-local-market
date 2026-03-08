// services/web/src/components/organisms/OrderTracker/OrderTracker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { OrderTracker } from './OrderTracker';

const meta: Meta<typeof OrderTracker> = {
  title: 'Organisms/OrderTracker',
  component: OrderTracker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderTracker>;

export const Pending: Story = {
  args: {
    currentStatus: 'pending',
    orderId: 'ORD-12345',
    estimatedTime: '15 mins',
  },
};

export const Confirmed: Story = {
  args: {
    currentStatus: 'confirmed',
    orderId: 'ORD-12345',
    estimatedTime: '12 mins',
  },
};

export const Preparing: Story = {
  args: {
    currentStatus: 'preparing',
    orderId: 'ORD-12345',
    estimatedTime: '10 mins',
  },
};

export const OutForDelivery: Story = {
  args: {
    currentStatus: 'out_for_delivery',
    orderId: 'ORD-12345',
    estimatedTime: '5 mins',
    riderName: 'Rajesh Kumar',
    riderPhone: '+91 98765 43210',
  },
};

export const Delivered: Story = {
  args: {
    currentStatus: 'delivered',
    orderId: 'ORD-12345',
  },
};

export const Cancelled: Story = {
  args: {
    currentStatus: 'cancelled',
    orderId: 'ORD-12345',
  },
};

export const WithTimestamps: Story = {
  args: {
    currentStatus: 'out_for_delivery',
    orderId: 'ORD-67890',
    estimatedTime: '8 mins',
    riderName: 'Amit Singh',
    riderPhone: '+91 98765 43210',
    steps: [
      { status: 'pending', label: 'Order Placed', timestamp: 'Today, 10:30 AM' },
      { status: 'confirmed', label: 'Confirmed', timestamp: 'Today, 10:31 AM' },
      { status: 'preparing', label: 'Preparing', timestamp: 'Today, 10:35 AM' },
      { status: 'ready', label: 'Ready for Pickup', timestamp: 'Today, 10:45 AM' },
      { status: 'picked_up', label: 'Picked Up', timestamp: 'Today, 10:50 AM' },
      { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: 'Today, 10:55 AM' },
      { status: 'delivered', label: 'Delivered' },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    currentStatus: 'preparing',
    orderId: 'ORD-54321',
    estimatedTime: '10 mins',
    steps: [
      { status: 'pending', label: 'Order Placed', timestamp: 'Today, 2:15 PM', description: 'Your order has been received' },
      { status: 'confirmed', label: 'Confirmed', timestamp: 'Today, 2:16 PM', description: 'Store accepted your order' },
      { status: 'preparing', label: 'Preparing', description: 'Your items are being packed' },
      { status: 'ready', label: 'Ready for Pickup' },
      { status: 'picked_up', label: 'Picked Up' },
      { status: 'out_for_delivery', label: 'Out for Delivery' },
      { status: 'delivered', label: 'Delivered' },
    ],
  },
};