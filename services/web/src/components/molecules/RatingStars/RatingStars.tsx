import React from 'react';
import { Icon, Typography } from '../../atoms';

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  showCount = false,
  count,
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const iconSize = sizes[size];
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          const isPartial = !isFilled && starValue - 0.5 <= displayRating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              disabled={!interactive}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Icon
                name={isFilled ? 'Star' : isPartial ? 'StarHalf' : 'Star'}
                size={iconSize}
                color={isFilled || isPartial ? '#F59E0B' : '#D1D5DB'}
                className={isFilled || isPartial ? 'fill-current' : ''}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <Typography
          variant={size === 'sm' ? 'small' : size === 'lg' ? 'body' : 'small'}
          weight="medium"
          color="default"
        >
          {rating.toFixed(1)}
        </Typography>
      )}

      {showCount && count !== undefined && (
        <Typography
          variant={size === 'sm' ? 'caption' : 'small'}
          color="muted"
        >
          ({count})
        </Typography>
      )}
    </div>
  );
};