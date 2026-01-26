// services/web/src/components/organisms/StoreList/StoreList.tsx
import React, { useState } from 'react';
import { StoreCard, StoreCardProps } from '../../molecules';
import { Icon, Typography, Spinner } from '../../atoms';

export type SortOption = 'distance' | 'rating' | 'eta';

export interface StoreListProps {
  stores: StoreCardProps[];
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
  showSortOptions?: boolean;
  defaultSort?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  className?: string;
}

export const StoreList: React.FC<StoreListProps> = ({
  stores,
  title = 'Nearby Stores',
  loading = false,
  emptyMessage = 'No stores found in your area',
  showSortOptions = true,
  defaultSort = 'distance',
  onSortChange,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<SortOption>(defaultSort);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    onSortChange?.(option);
  };

  const sortedStores = [...stores].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'eta':
        return (a.eta || 0) - (b.eta || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Icon name="Store" size={64} color="#D1D5DB" className="mx-auto mb-4" />
        <Typography variant="h4" color="muted">
          {emptyMessage}
        </Typography>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h3" weight="bold">
          {title}
        </Typography>
        <Typography variant="small" color="muted">
          {stores.length} store{stores.length !== 1 ? 's' : ''} found
        </Typography>
      </div>

      {/* Sort Options */}
      {showSortOptions && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <Typography variant="small" color="muted" className="whitespace-nowrap">
            Sort by:
          </Typography>
          <button
            onClick={() => handleSort('distance')}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              sortBy === 'distance'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={14} color={sortBy === 'distance' ? 'white' : '#374151'} />
              Distance
            </div>
          </button>
          <button
            onClick={() => handleSort('rating')}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              sortBy === 'rating'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} color={sortBy === 'rating' ? 'white' : '#374151'} />
              Rating
            </div>
          </button>
          <button
            onClick={() => handleSort('eta')}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              sortBy === 'eta'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} color={sortBy === 'eta' ? 'white' : '#374151'} />
              Delivery Time
            </div>
          </button>
        </div>
      )}

      {/* Store Cards */}
      <div className="space-y-3">
        {sortedStores.map((store) => (
          <StoreCard key={store.id} {...store} />
        ))}
      </div>
    </div>
  );
};