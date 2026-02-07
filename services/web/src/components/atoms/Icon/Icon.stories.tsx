// services/web/src/components/atoms/Icon/Icon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import React from 'react';
import { 
  ShoppingCart, 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Plus, 
  Minus, 
  X, 
  ArrowLeft, 
  Heart, 
  Truck, 
  Bell, 
  User,
  Home,
  ShoppingBag
} from 'lucide-react';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'gray', 'success', 'error', 'warning', 'current'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: ShoppingCart,
  },
};

export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-7 gap-4">
      <Icon icon={ShoppingCart} />
      <Icon icon={Search} />
      <Icon icon={MapPin} />
      <Icon icon={Clock} />
      <Icon icon={Star} />
      <Icon icon={ChevronRight} />
      <Icon icon={Plus} />
      <Icon icon={Minus} />
      <Icon icon={X} />
      <Icon icon={ArrowLeft} />
      <Icon icon={Heart} />
      <Icon icon={Truck} />
      <Icon icon={Bell} />
      <Icon icon={User} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon icon={ShoppingCart} size="xs" />
      <Icon icon={ShoppingCart} />
      <Icon icon={ShoppingCart} size="md" />
      <Icon icon={ShoppingCart} size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon icon={ShoppingCart} color="primary" />
      <Icon icon={ShoppingCart} color="gray" />
      <Icon icon={ShoppingCart} color="success" />
      <Icon icon={ShoppingCart} color="error" />
      <Icon icon={ShoppingCart} color="warning" />
    </div>
  ),
};

export const ZeptoNavIcons: Story = {
  render: () => (
    <div className="flex gap-1 p-3 bg-gray-100-full w-fit">
      <div className="p-2 hover:bg-white-full transition-colors cursor-pointer">
        <Icon icon={Home} size="md" color="gray" />
      </div>
      <div className="p-2 hover:bg-white-full transition-colors cursor-pointer">
        <Icon icon={Search} size="md" color="gray" />
      </div>
      <div className="p-2 hover:bg-white-full transition-colors cursor-pointer">
        <Icon icon={ShoppingBag} size="md" color="gray" />
      </div>
      <div className="p-2 hover:bg-white-full transition-colors cursor-pointer">
        <Icon icon={User} size="md" color="gray" />
      </div>
    </div>
  ),
};
