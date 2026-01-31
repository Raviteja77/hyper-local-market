// services/web/src/components/molecules/PriceDisplay/PriceDisplay.tsx
import React from 'react';

export interface PriceDisplayProps {
  currentPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  currentPrice,
  originalPrice,
  discountPercent,
  size = 'md',
  className = '',
}) => {
  const hasDiscount = originalPrice && originalPrice > currentPrice;

  // Size variants for text classes
  const sizeClasses = {
    sm: {
      current: 'text-xs',
      original: 'text-xs',
      discount: 'text-[10px]',
    },
    md: {
      current: 'text-sm',
      original: 'text-sm',
      discount: 'text-xs',
    },
    lg: {
      current: 'text-base',
      original: 'text-sm',
      discount: 'text-xs',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-col ${className}`}>
      {/* LINE 1: Price display */}
      <div className="flex items-baseline gap-1.5">
        {hasDiscount ? (
          // Current price in a RED PILL
          <span className={`bg-primary text-white ${classes.current} font-bold rounded px-1.5 py-0.5`}>
            ₹{currentPrice}
          </span>
        ) : (
          // No discount — plain bold text, no pill
          <span className={`${classes.current} font-bold text-gray-900`}>
            ₹{currentPrice}
          </span>
        )}

        {originalPrice && (
          // Strikethrough original price
          <span className={`${classes.original} text-gray-400 line-through`}>
            ₹{originalPrice}
          </span>
        )}
      </div>

      {/* LINE 2: Discount percentage (only when discountPercent exists) */}
      {discountPercent && (
        <span className={`${classes.discount} text-primary font-medium`}>
          {discountPercent}% OFF
        </span>
      )}
    </div>
  );
};