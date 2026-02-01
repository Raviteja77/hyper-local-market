import React from 'react';
import { Button, Typography } from '../../atoms';
import { PriceDisplay } from '../../molecules';
import { X, ShoppingCart, Package, Minus, Plus, Trash2 } from 'lucide-react';

export interface CartItem {
  id: string;
  productId?: string; // Product ID for store operations
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartSidebarProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  onClose: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void; // Uses productId for store operations
  onRemoveItem: (productId: string) => void; // Uses productId for store operations
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  className?: string;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  items,
  subtotal,
  deliveryFee = 0,
  discount = 0,
  onClose,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  isAuthenticated = true,
  onLoginClick,
  className = '',
}) => {
  const total = subtotal + deliveryFee - discount;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Typography variant="h4" weight="bold">
              Cart ({items.length})
            </Typography>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <ShoppingCart size={64} color="#D1D5DB" />
                <Typography variant="body" color="muted" className="mt-4">
                  Your cart is empty
                </Typography>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 border border-gray-200 rounded-lg"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                        <Package size={32} color="#D1D5DB" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <Typography variant="body" weight="medium" className="mb-1 line-clamp-2">
                        {item.name}
                      </Typography>
                      <PriceDisplay price={item.price} size="sm" />

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.productId || item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <Typography variant="body" weight="medium" className="w-8 text-center">
                          {item.quantity}
                        </Typography>
                        <button
                          onClick={() => onUpdateQuantity(item.productId || item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.productId || item.id)}
                          className="ml-auto p-2 text-danger hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} color="#EF4444" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <Typography variant="body" color="muted">
                    Subtotal
                  </Typography>
                  <Typography variant="body">₹{subtotal.toFixed(2)}</Typography>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <Typography variant="body" color="muted">
                      Delivery Fee
                    </Typography>
                    <Typography variant="body">₹{deliveryFee.toFixed(2)}</Typography>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between">
                    <Typography variant="body" color="success">
                      Discount
                    </Typography>
                    <Typography variant="body" color="success">
                      -₹{discount.toFixed(2)}
                    </Typography>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <Typography variant="h4" weight="bold">
                    Total
                  </Typography>
                  <Typography variant="h4" weight="bold" color="primary">
                    ₹{total.toFixed(2)}
                  </Typography>
                </div>
              </div>
              {!isAuthenticated ? (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Typography variant="body" weight="medium" className="mb-2 text-center">
                      Please login to checkout
                    </Typography>
                    <Typography variant="caption" color="muted" className="text-center block">
                      Login to save your cart and proceed with your order
                    </Typography>
                  </div>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    onClick={() => {
                      onClose();
                      onLoginClick?.();
                    }}
                  >
                    Login to Continue
                  </Button>
                </div>
              ) : (
                <Button variant="primary" size="lg" fullWidth onClick={onCheckout}>
                  Proceed to Checkout
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};