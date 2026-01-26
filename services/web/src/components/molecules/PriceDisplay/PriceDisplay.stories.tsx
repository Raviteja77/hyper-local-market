// services/web/src/components/molecules/PriceDisplay/PriceDisplay.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showDiscount: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
  args: {
    price: 299,
  },
};

export const WithDiscount: Story = {
  args: {
    price: 199,
    originalPrice: 299,
  },
};

export const LargeDiscount: Story = {
  args: {
    price: 99,
    originalPrice: 249,
  },
};

export const Small: Story = {
  args: {
    price: 49,
    originalPrice: 99,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    price: 149,
    originalPrice: 199,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    price: 399,
    originalPrice: 599,
    size: 'lg',
  },
};

export const WithoutDiscountLabel: Story = {
  args: {
    price: 179,
    originalPrice: 299,
    showDiscount: false,
  },
};

export const HighPrice: Story = {
  args: {
    price: 1999,
    originalPrice: 2999,
  },
};

export const SmallPrice: Story = {
  args: {
    price: 25,
    originalPrice: 50,
  },
};