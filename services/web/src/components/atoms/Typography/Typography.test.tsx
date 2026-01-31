// services/web/src/components/atoms/Typography/Typography.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders children', () => {
    render(<Typography>Test Text</Typography>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders as h1 when variant is h1', () => {
    const { container } = render(<Typography variant="h1">Heading 1</Typography>);
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });

  it('renders as custom element when as prop is provided', () => {
    const { container } = render(<Typography variant="body" as="span">Span Text</Typography>);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('applies correct color class', () => {
    const { container } = render(<Typography color="error">Error Text</Typography>);
    const element = container.firstChild;
    expect(element).toHaveClass('text-error');
  });

  it('applies weight override', () => {
    const { container } = render(<Typography weight="bold">Bold Text</Typography>);
    const element = container.firstChild;
    expect(element).toHaveClass('font-bold');
  });

  it('applies overline styles correctly', () => {
    const { container } = render(<Typography variant="overline">Label</Typography>);
    const element = container.firstChild;
    expect(element).toHaveClass('uppercase', 'tracking-wide', 'text-xs');
  });
});
