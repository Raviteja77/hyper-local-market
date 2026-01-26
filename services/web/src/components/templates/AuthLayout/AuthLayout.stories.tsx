// services/web/src/components/templates/AuthLayout/AuthLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from '../../organisms';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const WithLoginForm: Story = {
  args: {
    children: (
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
        onResendOTP={() => console.log('Resend OTP')}
      />
    ),
  },
};

export const WithoutBranding: Story = {
  args: {
    showBranding: false,
    children: (
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
      />
    ),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'FreshMart',
    subtitle: 'Your daily groceries, delivered instantly',
    children: (
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
      />
    ),
  },
};

export const WithBackgroundImage: Story = {
  args: {
    backgroundImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200',
    children: (
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
      />
    ),
  },
};