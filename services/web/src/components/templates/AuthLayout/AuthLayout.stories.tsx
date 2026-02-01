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

export const SimpleLayout: Story = {
  args: {
    children: (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Sign in to continue to your account</p>
        <LoginForm
          onSubmit={(data) => console.log('Login:', data)}
        />
      </div>
    ),
  },
};