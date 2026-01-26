// services/web/src/components/molecules/SearchBar/SearchBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithoutButton: Story = {
  args: {
    placeholder: 'Search...',
    showButton: false,
    onSearch: (query) => console.log('Search:', query),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Search...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Search products, stores...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for groceries, vegetables, fruits...',
    onSearch: (query) => console.log('Search:', query),
  },
};