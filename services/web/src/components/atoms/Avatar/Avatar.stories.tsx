// services/web/src/components/atoms/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import React from 'react';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    online: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
};

export const InitialsFallback: Story = {
  args: {
    name: 'Jane Smith',
  },
};

export const OnlineIndicator: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    name: 'John Doe',
    online: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar name="John Doe" size="sm" />
      <Avatar name="Jane Smith" size="md" />
      <Avatar name="Bob Johnson" size="lg" />
      <Avatar name="Alice Williams" size="xl" />
    </div>
  ),
};

export const SellerAvatarZepto: Story = {
  render: () => (
    <div className="p-4 bg-gray-50 rounded-lg max-w-xs">
      <div className="flex items-center gap-3">
        <Avatar 
          name="Rajesh Kumar" 
          size="md" 
          online={true}
          src="https://i.pravatar.cc/150?img=3"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">Your seller</p>
          <p className="text-xs text-gray-500">Rajesh Kumar</p>
        </div>
      </div>
    </div>
  ),
};
