import React from 'react';
import { ProductCard, ProductCardProps } from '../../molecules';
import { Button, Typography, Spinner } from '../../atoms';
import { Package } from 'lucide-react';

export interface ProductGridProps {
  products: ProductCardProps[];
  title?: string;
  columns?: 2 | 3 | 4 | 5;
  loading?: boolean;
  emptyMessage?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  columns = 4,
  loading = false,
  emptyMessage = 'No products found',
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
  className = '',
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12 ${className}`}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Package size={64} color="#D1D5DB" className="mx-auto mb-4" />
        <Typography variant="h4" color="muted">
          {emptyMessage}
        </Typography>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <div className="mb-6">
          <Typography variant="h3" weight="bold">
            {title}
          </Typography>
        </div>
      )}

      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {showLoadMore && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <Spinner color="white" className="mr-2" />
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};