// services/web/src/components/atoms/Spinner/Spinner.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with aria-label for accessibility', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(<Spinner label="Loading groceries" />);
    expect(screen.getByText('Loading groceries')).toBeInTheDocument();
  });

  it('applies correct size class', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector('.w-8.h-8');
    expect(spinner).toBeInTheDocument();
  });

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
