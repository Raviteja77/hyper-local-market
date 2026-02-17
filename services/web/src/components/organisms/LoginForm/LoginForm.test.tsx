import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders phone mode by default', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Send OTP')).toBeInTheDocument();
  });

  it('renders OTP mode when specified', () => {
    render(<LoginForm onSubmit={vi.fn()} mode="otp" phoneNumber="9876543210" />);
    expect(screen.getByText('Verify OTP')).toBeInTheDocument();
    expect(screen.getByText('Verify & Login')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});