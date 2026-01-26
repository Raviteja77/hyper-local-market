// services/web/src/components/atoms/Icon/Icon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 4, step: 0.5 },
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Search: Story = {
  args: {
    name: 'Search',
  },
};

export const ShoppingCart: Story = {
  args: {
    name: 'ShoppingCart',
  },
};

export const User: Story = {
  args: {
    name: 'User',
  },
};

export const MapPin: Story = {
  args: {
    name: 'MapPin',
  },
};

export const Bell: Story = {
  args: {
    name: 'Bell',
  },
};

export const Heart: Story = {
  args: {
    name: 'Heart',
  },
};

export const Menu: Story = {
  args: {
    name: 'Menu',
  },
};

export const X: Story = {
  args: {
    name: 'X',
  },
};

export const Large: Story = {
  args: {
    name: 'Star',
    size: 48,
  },
};

export const Colored: Story = {
  args: {
    name: 'Heart',
    color: '#EF4444',
    size: 32,
  },
};

export const Thin: Story = {
  args: {
    name: 'Circle',
    strokeWidth: 1,
    size: 32,
  },
};

export const Thick: Story = {
  args: {
    name: 'Circle',
    strokeWidth: 4,
    size: 32,
  },
};