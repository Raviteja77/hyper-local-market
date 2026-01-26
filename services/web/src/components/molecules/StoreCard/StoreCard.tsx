import React from 'react';
import { Avatar, Badge, Icon, Typography } from '../../atoms';

export interface StoreCardProps {
  id: string;
  name: string;
  distance: number;
  eta?: number;
  rating?: number;
  isOpen?: boolean;
  image?: string;
  address?: string;
  onStoreClick?: (id: string) => void;
  className?: string;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  distance,
  eta,
  rating,
  isOpen = true,
  image,
  address,
  onStoreClick,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-200 cursor-pointer ${className}`}
      onClick={() => onStoreClick?.(id)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={image}
          alt={name}
          size="lg"
          fallback={name.substring(0, 2)}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Typography variant="body" weight="semibold" className="truncate">
              {name}
            </Typography>
            {isOpen ? (
              <Badge variant="success" size="sm">
                Open
              </Badge>
            ) : (
              <Badge variant="danger" size="sm">
                Closed
              </Badge>
            )}
          </div>

          {address && (
            <Typography variant="small" color="muted" className="mb-2 line-clamp-1">
              {address}
            </Typography>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={16} color="#6B7280" />
              <Typography variant="small" color="muted">
                {distance.toFixed(1)} km
              </Typography>
            </div>

            {eta && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} color="#6B7280" />
                <Typography variant="small" color="muted">
                  {eta} min
                </Typography>
              </div>
            )}

            {rating && (
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} color="#F59E0B" />
                <Typography variant="small" color="default" weight="medium">
                  {rating.toFixed(1)}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};