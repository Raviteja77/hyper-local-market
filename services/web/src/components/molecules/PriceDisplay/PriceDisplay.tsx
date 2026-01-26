import React from 'react';
import { Typography } from '../../atoms';

export interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  currency = '₹',
  size = 'md',
  showDiscount = true,
  className = '',
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeMap = {
    sm: { current: 'body' as const, original: 'small' as const, discount: 'caption' as const },
    md: { current: 'h4' as const, original: 'body' as const, discount: 'small' as const },
    lg: { current: 'h3' as const, original: 'h4' as const, discount: 'body' as const },
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <Typography
        variant={sizeMap[size].current}
        weight="bold"
        color="primary"
      >
        {currency}{price.toFixed(2)}
      </Typography>

      {hasDiscount && (
        <>
          <Typography
            variant={sizeMap[size].original}
            color="muted"
            className="line-through"
          >
            {currency}{originalPrice.toFixed(2)}
          </Typography>

          {showDiscount && (
            <Typography
              variant={sizeMap[size].discount}
              color="success"
              weight="medium"
            >
              {discountPercent}% OFF
            </Typography>
          )}
        </>
      )}
    </div>
  );
};