// services/web/src/components/atoms/Typography/Typography.tsx
import React from 'react';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  as,
  weight,
  children,
  className = '',
}) => {
  // Variant -> default mapping
  const variantMap = {
    h1: { element: 'h1', className: 'text-3xl font-bold text-gray-900' },
    h2: { element: 'h2', className: 'text-2xl font-semibold text-gray-900' },
    h3: { element: 'h3', className: 'text-xl font-semibold text-gray-900' },
    h4: { element: 'h4', className: 'text-lg font-medium text-gray-900' },
    body: { element: 'p', className: 'text-base font-normal text-gray-700' },
    caption: { element: 'span', className: 'text-sm font-normal text-gray-500' },
    overline: { element: 'span', className: 'text-xs font-semibold text-gray-500 uppercase tracking-wide' },
  };
  
  const colorMap = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    error: 'text-error',
    success: 'text-success',
  };
  
  const weightMap = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const Component = (as || variantMap[variant].element) as keyof JSX.IntrinsicElements;
  const variantClasses = variantMap[variant].className;
  
  // Extract the base size/spacing but allow color override
  const baseClasses = variantClasses
    .split(' ')
    .filter(c => !c.startsWith('text-gray') && !c.startsWith('font-'))
    .join(' ');
  
  const fontWeight = weight ? weightMap[weight] : variantClasses.split(' ').find(c => c.startsWith('font-'));
  
  return (
    <Component
      className={`${baseClasses} ${fontWeight} ${colorMap[color]} ${className}`}
    >
      {children}
    </Component>
  );
};
