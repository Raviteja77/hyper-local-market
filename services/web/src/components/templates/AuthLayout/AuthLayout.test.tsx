import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  it('renders children', () => {
    render(<AuthLayout><div>Login Form</div></AuthLayout>);
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });
});