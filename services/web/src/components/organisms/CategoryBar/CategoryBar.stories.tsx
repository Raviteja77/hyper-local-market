import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CategoryBar } from './CategoryBar';
import {
  Apple,
  Milk,
  Beef,
  Carrot,
  Coffee,
  IceCream,
  Pizza,
  Salad,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wine,
} from 'lucide-react';

const meta: Meta<typeof CategoryBar> = {
  title: 'Organisms/CategoryBar',
  component: CategoryBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBar>;

const sampleCategories = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'fruits', label: 'Fruits', icon: Apple },
  { id: 'vegetables', label: 'Vegetables', icon: Carrot },
  { id: 'dairy', label: 'Dairy', icon: Milk },
  { id: 'meat', label: 'Meat', icon: Beef },
  { id: 'beverages', label: 'Beverages', icon: Coffee },
];

const manyCategoriesData = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'fruits', label: 'Fruits', icon: Apple },
  { id: 'vegetables', label: 'Vegetables', icon: Carrot },
  { id: 'dairy', label: 'Dairy', icon: Milk },
  { id: 'meat', label: 'Meat', icon: Beef },
  { id: 'beverages', label: 'Beverages', icon: Coffee },
  { id: 'frozen', label: 'Frozen', icon: IceCream },
  { id: 'bakery', label: 'Bakery', icon: Pizza },
  { id: 'salads', label: 'Salads', icon: Salad },
  { id: 'prepared', label: 'Prepared Meals', icon: Utensils },
  { id: 'wine', label: 'Wine & Spirits', icon: Wine },
  { id: 'specialty', label: 'Specialty', icon: Sparkles },
];

export const Default: Story = {
  args: {
    categories: sampleCategories,
    onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId),
  },
};

export const WithActiveCategory: Story = {
  args: {
    categories: sampleCategories,
    activeCategory: 'fruits',
    onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId),
  },
};

export const ManyCategories: Story = {
  args: {
    categories: manyCategoriesData,
    activeCategory: 'dairy',
    onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId),
  },
};

export const ScrollableWithActive: Story = {
  args: {
    categories: manyCategoriesData,
    activeCategory: 'prepared',
    onCategoryClick: (categoryId) => console.log('Category clicked:', categoryId),
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = React.useState('all');
    
    return (
      <div>
        <CategoryBar
          categories={manyCategoriesData}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
        <div className="p-6">
          <p className="text-gray-700">
            Active Category: <strong>{activeCategory}</strong>
          </p>
        </div>
      </div>
    );
  },
};
