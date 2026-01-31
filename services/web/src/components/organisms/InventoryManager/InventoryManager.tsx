import React, { useState } from 'react';
import { Badge, Button, Input, Typography } from '../../atoms';
import { Search, Package, Edit } from 'lucide-react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image?: string;
}

export interface InventoryManagerProps {
  items: InventoryItem[];
  onToggleStock: (itemId: string, inStock: boolean) => void;
  onUpdatePrice?: (itemId: string, price: number) => void;
  showPriceEdit?: boolean;
  title?: string;
  className?: string;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  items,
  onToggleStock,
  onUpdatePrice,
  showPriceEdit = false,
  title = 'Inventory Management',
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingPrice, setEditingPrice] = useState<{ [key: string]: string }>({});

  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const inStockCount = items.filter((item) => item.inStock).length;

  const handlePriceChange = (itemId: string, value: string) => {
    setEditingPrice({ ...editingPrice, [itemId]: value });
  };

  const handlePriceSave = (itemId: string) => {
    const newPrice = parseFloat(editingPrice[itemId]);
    if (!isNaN(newPrice) && newPrice > 0 && onUpdatePrice) {
      onUpdatePrice(itemId, newPrice);
      setEditingPrice({ ...editingPrice, [itemId]: '' });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h3" weight="bold">
            {title}
          </Typography>
          <div className="flex items-center gap-2">
            <Badge variant="success">{inStockCount} In Stock</Badge>
            <Badge variant="danger">{items.length - inStockCount} Out of Stock</Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={20} color="#6B7280" />
          </div>
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-200">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={64} color="#D1D5DB" className="mx-auto mb-4" />
            <Typography variant="body" color="muted">
              No products found
            </Typography>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isEditingPrice = editingPrice[item.id] !== undefined;
            const displayPrice = isEditingPrice ? editingPrice[item.id] : item.price.toString();

            return (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Image */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <Package size={24} color="#D1D5DB" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Typography variant="body" weight="semibold" className="mb-1">
                      {item.name}
                    </Typography>
                    <Typography variant="small" color="muted">
                      {item.category}
                    </Typography>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {showPriceEdit && onUpdatePrice ? (
                      <>
                        <Input
                          type="number"
                          value={displayPrice}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          size="sm"
                          className="w-24"
                          disabled={!isEditingPrice && !item.inStock}
                        />
                        {isEditingPrice ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handlePriceSave(item.id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <button
                            onClick={() => handlePriceChange(item.id, item.price.toString())}
                            className="p-2 hover:bg-gray-100 rounded"
                            disabled={!item.inStock}
                          >
                            <Edit size={18} color="#6B7280" />
                          </button>
                        )}
                      </>
                    ) : (
                      <Typography variant="body" weight="bold" color="primary">
                        ₹{item.price.toFixed(2)}
                      </Typography>
                    )}
                  </div>

                  {/* Stock Toggle */}
                  <button
                    onClick={() => onToggleStock(item.id, !item.inStock)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.inStock ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.inStock ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};