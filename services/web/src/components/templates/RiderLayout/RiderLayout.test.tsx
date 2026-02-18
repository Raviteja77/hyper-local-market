import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RiderLayout } from './RiderLayout';

describe('RiderLayout', () => {
  it('renders children', () => {
    render(<RiderLayout><div>Rider Content</div></RiderLayout>);
    expect(screen.getByText('Rider Content')).toBeInTheDocument();
  });

  it('renders rider name', () => {
    render(<RiderLayout riderName="Rahul"><div>Content</div></RiderLayout>);
    expect(screen.getByText('Rahul')).toBeInTheDocument();
  });

  it('renders delivery partner label', () => {
    render(<RiderLayout><div>Content</div></RiderLayout>);
    expect(screen.getByText('Delivery Partner')).toBeInTheDocument();
  });
});