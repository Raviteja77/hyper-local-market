// services/web/src/components/molecules/ProductCard/ProductCard.tsx
import React from 'react';
import { Star } from 'lucide-react';

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  packInfo?: string;
  categoryTag?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClick?: (id: string) => void;
}

// Helper: format review count
function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  originalPrice,
  discountPercent,
  packInfo,
  categoryTag,
  rating,
  reviewCount,
  isNew,
  quantity,
  onAdd,
  onRemove,
  onClick,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div
      className="bg-white rounded-lg border border-gray-100 hover:shadow-md hover:scale-[1.01] transition duration-150 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      {/* IMAGE AREA */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={image} alt={name} className="w-full aspect-square object-cover" />
        
        {/* NEW badge: top-left, absolute */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold rounded px-1.5 py-0.5">
            NEW
          </span>
        )}

        {/* ADD button or Quantity stepper: bottom-right, absolute */}
        <div className="absolute bottom-2 right-2">
          {quantity === 0 ? (
            <button
              className="bg-primary text-white text-xs font-bold rounded-full px-3 py-1 shadow-sm hover:bg-primary-hover transition duration-150"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(id);
              }}
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-primary rounded-full shadow-sm overflow-hidden">
              <button
                className="text-white px-2 py-1 text-sm hover:bg-primary-hover transition duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(id);
                }}
              >
                −
              </button>
              <span className="text-white text-xs font-bold px-1.5 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                className="text-white px-2 py-1 text-sm hover:bg-primary-hover transition duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(id);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PRICE ROW */}
      <div className="px-2 pt-2">
        <div className="flex items-baseline gap-1.5">
          {hasDiscount ? (
            <span className="bg-primary text-white text-sm font-bold rounded px-1.5 py-0.5">
              ₹{price}
            </span>
          ) : (
            <span className="text-sm font-bold text-gray-900">
              ₹{price}
            </span>
          )}
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
        {discountPercent && (
          <span className="text-xs text-primary font-medium">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* DASHED BORDER */}
      <div className="border-t border-dashed border-gray-200 my-1" />

      {/* PRODUCT NAME */}
      <div className="px-2">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {name}
        </p>
      </div>

      {/* PACK INFO */}
      {packInfo && (
        <div className="px-2 pt-1">
          <p className="text-xs text-gray-500">{packInfo}</p>
        </div>
      )}

      {/* CATEGORY TAG */}
      {categoryTag && (
        <div className="px-2 pt-1">
          <p className="text-xs text-primary font-medium">{categoryTag}</p>
        </div>
      )}

      {/* RATING ROW */}
      {rating && (
        <div className="px-2 pt-1 pb-2 flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          {reviewCount && (
            <span className="text-xs text-gray-400">
              ({formatCount(reviewCount)})
            </span>
          )}
        </div>
      )}
    </div>
  );
};