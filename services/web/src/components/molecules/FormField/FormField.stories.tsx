// services/web/src/components/molecules/FormField/FormField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '10-digit number',
    value: '123',
    errorMessage: 'Phone number must be 10 digits',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account Status',
    value: 'Active',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Username',
    size: 'sm',
    placeholder: 'Enter username',
  },
};

export const Large: Story = {
  args: {
    label: 'Address',
    size: 'lg',
    placeholder: 'Enter full address',
  },
};