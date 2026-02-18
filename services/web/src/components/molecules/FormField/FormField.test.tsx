import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders with a label', () => {
    render(<FormField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<FormField label="Email" errorMessage="Required field" />);
    expect(screen.getAllByText('Required field').length).toBeGreaterThanOrEqual(1);
  });

  it('shows helper text when no error', () => {
    render(<FormField label="Email" helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<FormField label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});