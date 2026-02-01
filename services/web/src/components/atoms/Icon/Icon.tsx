// services/web/src/components/atoms/Icon/Icon.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

export interface IconProps {
  name?: IconName;
  icon?: React.ComponentType<LucideProps>;
  size?: number | 'xs' | 'sm' | 'md' | 'lg';
  color?: string | 'primary' | 'gray' | 'success' | 'error' | 'warning' | 'current';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  icon: IconComponent,
  size = 'md',
  color = 'current',
  className = '',
}) => {
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const colorMap = {
    primary: 'text-primary',
    gray: 'text-gray-500',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    current: 'text-current',
  };

  // Determine the actual size
  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  // Determine the actual color class or style
  const isColorString = typeof color === 'string' && color.startsWith('#');
  const colorClass = isColorString ? '' : (colorMap[color as keyof typeof colorMap] || 'text-current');

  // Get the icon component
  let IconToRender = IconComponent;
  if (name && !IconComponent) {
    IconToRender = LucideIcons[name] as React.ComponentType<LucideProps>;
  }

  if (!IconToRender) {
    console.error(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  
  return (
    <IconToRender 
      size={actualSize} 
      className={`${colorClass} ${className}`}
      style={isColorString ? { color } : undefined}
    />
  );
};
