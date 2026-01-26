// services/web/src/components/atoms/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
  },
};

export const Fallback: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const CustomFallback: Story = {
  args: {
    alt: 'Store',
    fallback: 'SK',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'User',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?img=4',
    alt: 'User',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'User',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.com/image.jpg',
    alt: 'Broken User',
  },
};