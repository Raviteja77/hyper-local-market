// services/web/src/components/organisms/LoginForm/LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const PhoneMode: Story = {
  args: {
    mode: 'phone',
    onSubmit: (data) => console.log('Submit:', data),
  },
};

export const OTPMode: Story = {
  args: {
    mode: 'otp',
    phoneNumber: '9876543210',
    onSubmit: (data) => console.log('Submit:', data),
    onResendOTP: () => console.log('Resend OTP'),
  },
};

export const Loading: Story = {
  args: {
    mode: 'phone',
    loading: true,
    onSubmit: (data) => console.log('Submit:', data),
  },
};

export const WithError: Story = {
  args: {
    mode: 'phone',
    error: 'Invalid phone number. Please try again.',
    onSubmit: (data) => console.log('Submit:', data),
  },
};

export const OTPWithError: Story = {
  args: {
    mode: 'otp',
    phoneNumber: '9876543210',
    error: 'Invalid OTP. Please check and try again.',
    onSubmit: (data) => console.log('Submit:', data),
    onResendOTP: () => console.log('Resend OTP'),
  },
};

export const LoadingOTP: Story = {
  args: {
    mode: 'otp',
    phoneNumber: '9876543210',
    loading: true,
    onSubmit: (data) => console.log('Submit:', data),
    onResendOTP: () => console.log('Resend OTP'),
  },
};