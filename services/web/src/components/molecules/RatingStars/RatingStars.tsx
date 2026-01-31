// services/web/src/components/molecules/RatingStars/RatingStars.tsx
import React from 'react';
import { Star } from 'lucide-react';

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md';
  showNumeric?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumeric = false,
  interactive = false,
  onRate,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: { icon: 12, container: 'w-3 h-3' },
    md: { icon: 16, container: 'w-4 h-4' },
  };

  const iconSize = sizeClasses[size].icon;
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  const handleClick = (value: number) => {
    if (interactive && onRate) {
      onRate(value);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= displayRating;
    const isHalfFilled = !isFilled && i - 0.5 <= displayRating;

    stars.push(
      <button
        key={i}
        type="button"
        onClick={() => handleClick(i)}
        onMouseEnter={() => interactive && setHoverRating(i)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        disabled={!interactive}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
      >
        {isFilled ? (
          <Star size={iconSize} className="text-yellow-500 fill-yellow-500" />
        ) : isHalfFilled ? (
          <div className="relative" style={{ width: iconSize, height: iconSize }}>
            <Star size={iconSize} className="text-gray-300 absolute" />
            <div style={{ width: '50%', overflow: 'hidden' }} className="absolute">
              <Star size={iconSize} className="text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        ) : (
          <Star size={iconSize} className="text-gray-300" />
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showNumeric && (
        <span className="text-sm text-gray-500">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};