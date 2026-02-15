// services/web/src/components/molecules/StoreCard/StoreCard.tsx
import React from 'react';
import { Badge } from '../../atoms';
import { Clock, Star } from 'lucide-react';
import Image from 'next/image';

export interface StoreCardProps {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  rating: number;
  isFreeDelivery?: boolean;
  onClick: (id: string) => void;
  className?: string;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  image,
  deliveryTime,
  rating,
  isFreeDelivery = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(id);
        }
      }}
    >
      <div className="flex items-start gap-3">
        {/* Store image (square,-lg, object-cover) on the left — ~64px */}
        <Image
          src={image}
          alt={name}
          className="w-16 h-16-lg object-cover flex-shrink-0"
        />

        {/* Right side (flex column, gap-1) */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          {/* Store name */}
          <h4 className="text-base font-semibold text-gray-900 truncate">
            {name}
          </h4>

          {/* Delivery time badge */}
          <Badge variant="delivery" leftIcon={<Clock size={12} />}>
            {deliveryTime}
          </Badge>

          {/* Rating: small star + rating text in text-sm */}
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
          </div>

          {/* Optional "Free delivery" text in green */}
          {isFreeDelivery && (
            <span className="text-xs text-success">Free delivery</span>
          )}
        </div>
      </div>
    </div>
  );
};