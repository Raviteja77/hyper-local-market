// services/web/src/components/molecules/RatingStars/RatingStars.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { RatingStars } from './RatingStars';

const meta: Meta<typeof RatingStars> = {
  title: 'Molecules/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showValue: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RatingStars>;

export const Default: Story = {
  args: {
    rating: 4.5,
  },
};

export const WithValue: Story = {
  args: {
    rating: 4.5,
    showValue: true,
  },
};

export const WithCount: Story = {
  args: {
    rating: 4.2,
    showValue: true,
    showCount: true,
    count: 128,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5,
    showValue: true,
  },
};

export const LowRating: Story = {
  args: {
    rating: 2,
    showValue: true,
  },
};

export const PartialRating: Story = {
  args: {
    rating: 3.7,
    showValue: true,
  },
};

export const Small: Story = {
  args: {
    rating: 4.5,
    size: 'sm',
    showValue: true,
  },
};

export const Large: Story = {
  args: {
    rating: 4.5,
    size: 'lg',
    showValue: true,
    showCount: true,
    count: 256,
  },
};

export const Interactive: Story = {
  args: {
    rating: 3,
    interactive: true,
    showValue: true,
    onChange: (rating) => console.log('New rating:', rating),
  },
};

export const NoRating: Story = {
  args: {
    rating: 0,
    showValue: true,
  },
};