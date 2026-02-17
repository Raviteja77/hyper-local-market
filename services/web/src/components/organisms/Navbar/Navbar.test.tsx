import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('HyperLocal')).toBeInTheDocument();
  });

  it('shows login button when not logged in', () => {
    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders search bar by default', () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText('Search products, stores...')).toBeInTheDocument();
  });
});