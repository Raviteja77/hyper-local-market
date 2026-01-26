// services/web/src/components/organisms/InventoryManager/InventoryManager.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InventoryManager } from './InventoryManager';

const mockInventory = [
  {
    id: '1',
    name: 'Organic Fresh Milk',
    category: 'Dairy',
    price: 65,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200',
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    price: 40,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
  },
  {
    id: '3',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 30,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200',
  },
  {
    id: '4',
    name: 'Premium Rice',
    category: 'Grains',
    price: 120,
    inStock: true,
  },
  {
    id: '5',
    name: 'Fresh Bananas',
    category: 'Fruits',
    price: 50,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200',
  },
  {
    id: '6',
    name: 'Greek Yogurt',
    category: 'Dairy',
    price: 85,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200',
  },
  {
    id: '7',
    name: 'Olive Oil',
    category: 'Oils',
    price: 450,
    inStock: true,
  },
  {
    id: '8',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    price: 25,
    inStock: false,
  },
];

const meta: Meta<typeof InventoryManager> = {
  title: 'Organisms/InventoryManager',
  component: InventoryManager,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InventoryManager>;

export const Default: Story = {
  args: {
    items: mockInventory,
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
  },
};

export const WithPriceEdit: Story = {
  args: {
    items: mockInventory,
    showPriceEdit: true,
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
    onUpdatePrice: (id, price) => console.log('Update price:', id, price),
  },
};

export const FewItems: Story = {
  args: {
    items: mockInventory.slice(0, 3),
    showPriceEdit: true,
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
    onUpdatePrice: (id, price) => console.log('Update price:', id, price),
  },
};

export const AllOutOfStock: Story = {
  args: {
    items: mockInventory.map((item) => ({ ...item, inStock: false })),
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
  },
};

export const AllInStock: Story = {
  args: {
    items: mockInventory.map((item) => ({ ...item, inStock: true })),
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
  },
};

export const CustomTitle: Story = {
  args: {
    items: mockInventory,
    title: 'Store Inventory',
    showPriceEdit: true,
    onToggleStock: (id, inStock) => console.log('Toggle stock:', id, inStock),
    onUpdatePrice: (id, price) => console.log('Update price:', id, price),
  },
};