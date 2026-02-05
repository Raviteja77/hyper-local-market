// services/web/src/components/atoms/Input/Input.tsx
import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    size = 'md',
    leftIcon,
    rightIcon,
    error,
    label,
    className = '',
    disabled = false,
    fullWidth = false,
    ...props
  }, ref) => {
    const baseStyles = 'w-full-lg bg-white border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-30 text-gray-900 placeholder:text-gray-400';
    
    const stateStyles = error
      ? 'border-error focus:ring-error focus:border-error'
      : 'border-gray-200 focus:ring-primary focus:border-primary';
    
    const sizes = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    };
    
    const paddingWithIcons = leftIcon && rightIcon
      ? 'pl-10 pr-10'
      : leftIcon
      ? 'pl-10 pr-4'
      : rightIcon
      ? 'pl-4 pr-10'
      : 'px-4';
    
    const disabledClass = disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '';
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`${baseStyles} ${stateStyles} ${sizes[size]} ${paddingWithIcons} ${disabledClass} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';