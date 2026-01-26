// services/web/src/components/organisms/CartSidebar/CartSidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CartSidebar } from './CartSidebar';

const mockCartItems = [
  {
    id: '1',
    name: 'Organic Fresh Milk',
    price: 65,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200',
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    price: 40,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
  },
  {
    id: '3',
    name: 'Fresh Tomatoes',
    price: 30,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200',
  },
];

const meta: Meta<typeof CartSidebar> = {
  title: 'Organisms/CartSidebar',
  component: CartSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CartSidebar>;

export const Default: Story = {
  args: {
    isOpen: true,
    items: mockCartItems,
    subtotal: 260,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const WithDeliveryFee: Story = {
  args: {
    isOpen: true,
    items: mockCartItems,
    subtotal: 260,
    deliveryFee: 20,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const WithDiscount: Story = {
  args: {
    isOpen: true,
    items: mockCartItems,
    subtotal: 260,
    deliveryFee: 20,
    discount: 50,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    items: [],
    subtotal: 0,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const SingleItem: Story = {
  args: {
    isOpen: true,
    items: [mockCartItems[0]],
    subtotal: 130,
    deliveryFee: 15,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const ManyItems: Story = {
  args: {
    isOpen: true,
    items: [
      ...mockCartItems,
      {
        id: '4',
        name: 'Premium Rice',
        price: 120,
        quantity: 1,
      },
      {
        id: '5',
        name: 'Fresh Bananas',
        price: 50,
        quantity: 2,
      },
      {
        id: '6',
        name: 'Greek Yogurt',
        price: 85,
        quantity: 1,
      },
    ],
    subtotal: 575,
    deliveryFee: 25,
    discount: 75,
    onClose: () => console.log('Close cart'),
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};