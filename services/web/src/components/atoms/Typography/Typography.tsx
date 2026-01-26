// services/web/src/components/atoms/Typography/Typography.tsx
import React from 'react';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default' | 'muted' | 'error' | 'success';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  color = 'default',
  weight,
  align = 'left',
  className = '',
  as,
}) => {
  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs',
  };

  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    default: 'text-gray-900',
    muted: 'text-gray-500',
    error: 'text-danger',
    success: 'text-success',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Component = as || (variant.startsWith('h') ? variant : 'p');
  const weightClass = weight ? weights[weight] : '';

  return (
    <Component
      className={`${variants[variant]} ${colors[color]} ${weightClass} ${aligns[align]} ${className}`}
    >
      {children}
    </Component>
  );
};