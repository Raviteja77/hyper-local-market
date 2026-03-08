// services/web/src/components/organisms/Navbar/Navbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    onSearch: (query) => console.log('Search:', query),
    onCartClick: () => console.log('Cart clicked'),
    onLoginClick: () => console.log('Login clicked'),
    onLogoClick: () => console.log('Logo clicked'),
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userName: 'John Doe',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    onSearch: (query) => console.log('Search:', query),
    onCartClick: () => console.log('Cart clicked'),
    onProfileClick: () => console.log('Profile clicked'),
    onLogoClick: () => console.log('Logo clicked'),
  },
};

export const WithCartItems: Story = {
  args: {
    isLoggedIn: true,
    userName: 'Jane Smith',
    cartItemCount: 5,
    onSearch: (query) => console.log('Search:', query),
    onCartClick: () => console.log('Cart clicked'),
    onProfileClick: () => console.log('Profile clicked'),
  },
};

export const ManyCartItems: Story = {
  args: {
    isLoggedIn: true,
    userName: 'Alex Kumar',
    cartItemCount: 12,
    onSearch: (query) => console.log('Search:', query),
    onCartClick: () => console.log('Cart clicked'),
    onProfileClick: () => console.log('Profile clicked'),
  },
};

export const WithoutSearch: Story = {
  args: {
    showSearch: false,
    isLoggedIn: true,
    userName: 'Sarah Lee',
    cartItemCount: 3,
    onCartClick: () => console.log('Cart clicked'),
    onProfileClick: () => console.log('Profile clicked'),
  },
};