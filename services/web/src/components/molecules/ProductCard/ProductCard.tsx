import React from 'react';
import { Badge, Button, Icon, Typography } from '../../atoms';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  inStock?: boolean;
  discount?: number;
  onAddToCart?: (id: string) => void;
  onCardClick?: (id: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  inStock = true,
  discount,
  onAddToCart,
  onCardClick,
  className = '',
}) => {
  const discountedPrice = discount ? price - (price * discount) / 100 : null;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 ${className}`}
      onClick={() => onCardClick?.(id)}
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
    >
      <div className="relative aspect-square bg-gray-100">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Package" size={48} color="#D1D5DB" />
          </div>
        )}
        {discount && (
          <div className="absolute top-2 right-2">
            <Badge variant="danger" rounded>
              {discount}% OFF
            </Badge>
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="danger" size="lg">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-3">
        {category && (
          <Typography variant="caption" color="muted" className="mb-1">
            {category}
          </Typography>
        )}
        
        <Typography variant="body" weight="medium" className="mb-2 line-clamp-2">
          {name}
        </Typography>

        <div className="flex items-center gap-2 mb-3">
          {discountedPrice ? (
            <>
              <Typography variant="body" weight="bold" color="primary">
                ₹{discountedPrice.toFixed(2)}
              </Typography>
              <Typography variant="small" color="muted" className="line-through">
                ₹{price.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="body" weight="bold" color="default">
              ₹{price.toFixed(2)}
            </Typography>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled={!inStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(id);
          }}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </div>
    </div>
  );
};