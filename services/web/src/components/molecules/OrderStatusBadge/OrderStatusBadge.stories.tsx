// services/web/src/components/molecules/OrderStatusBadge/OrderStatusBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { OrderStatusBadge } from './OrderStatusBadge';

const meta: Meta<typeof OrderStatusBadge> = {
  title: 'Molecules/OrderStatusBadge',
  component: OrderStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrderStatusBadge>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Confirmed: Story = {
  args: {
    status: 'confirmed',
  },
};

export const Preparing: Story = {
  args: {
    status: 'preparing',
  },
};

export const Ready: Story = {
  args: {
    status: 'ready',
  },
};

export const PickedUp: Story = {
  args: {
    status: 'picked_up',
  },
};

export const OutForDelivery: Story = {
  args: {
    status: 'out_for_delivery',
  },
};

export const Delivered: Story = {
  args: {
    status: 'delivered',
  },
};

export const Cancelled: Story = {
  args: {
    status: 'cancelled',
  },
};

export const WithoutIcon: Story = {
  args: {
    status: 'delivered',
    showIcon: false,
  },
};

export const Small: Story = {
  args: {
    status: 'confirmed',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    status: 'out_for_delivery',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <OrderStatusBadge status="pending" />
      <OrderStatusBadge status="confirmed" />
      <OrderStatusBadge status="preparing" />
      <OrderStatusBadge status="ready" />
      <OrderStatusBadge status="picked_up" />
      <OrderStatusBadge status="out_for_delivery" />
      <OrderStatusBadge status="delivered" />
      <OrderStatusBadge status="cancelled" />
    </div>
  ),
};