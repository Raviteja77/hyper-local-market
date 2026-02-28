// Cart Store - Buyer Flow Regression Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/store/slices/cartSlices';

describe('Cart Store - Buyer Flow', () => {
  beforeEach(() => {
    // Reset cart state before each test
    useCartStore.setState({
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      couponCode: null,
      storeId: null,
    });
  });

  describe('Initial State', () => {
    it('should start with empty cart', () => {
      const state = useCartStore.getState();
      expect(state.items).toEqual([]);
      expect(state.subtotal).toBe(0);
      expect(state.deliveryFee).toBe(0);
      expect(state.discount).toBe(0);
      expect(state.total).toBe(0);
      expect(state.couponCode).toBeNull();
      expect(state.storeId).toBeNull();
    });
  });

  describe('Add Item to Cart', () => {
    it('should add a product to cart with quantity 1', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Rin Matic Detergent',
        price: 177,
        image: 'https://picsum.photos/200',
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
      });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].productId).toBe('prod-1');
      expect(state.items[0].quantity).toBe(1);
      expect(state.items[0].name).toBe('Rin Matic Detergent');
      expect(state.subtotal).toBe(177);
      expect(state.total).toBe(177);
      expect(state.storeId).toBe('store-1');
    });

    it('should increment quantity when adding same product again', () => {
      const addItem = useCartStore.getState().addItem;
      const item = {
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Rin Matic Detergent',
        price: 177,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
      };

      addItem(item);
      addItem(item);

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.subtotal).toBe(354);
      expect(state.total).toBe(354);
    });

    it('should add multiple different products', () => {
      const addItem = useCartStore.getState().addItem;

      addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      addItem({
        id: 'cart-2',
        productId: 'prod-2',
        name: 'Product B',
        price: 200,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(2);
      expect(state.subtotal).toBe(300);
      expect(state.total).toBe(300);
    });

    it('should lock cart to a single store', () => {
      const addItem = useCartStore.getState().addItem;

      addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      expect(useCartStore.getState().storeId).toBe('store-1');
    });
  });

  describe('Remove Item from Cart', () => {
    it('should remove an item from cart', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().removeItem('prod-1');

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
      expect(state.subtotal).toBe(0);
      expect(state.total).toBe(0);
      expect(state.storeId).toBeNull();
    });

    it('should remove only the specified item', () => {
      const addItem = useCartStore.getState().addItem;

      addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      addItem({
        id: 'cart-2',
        productId: 'prod-2',
        name: 'Product B',
        price: 200,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().removeItem('prod-1');

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].productId).toBe('prod-2');
      expect(state.subtotal).toBe(200);
    });
  });

  describe('Update Quantity', () => {
    it('should update item quantity', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().updateQuantity('prod-1', 5);

      const state = useCartStore.getState();
      expect(state.items[0].quantity).toBe(5);
      expect(state.subtotal).toBe(500);
      expect(state.total).toBe(500);
    });

    it('should remove item when quantity set to 0', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().updateQuantity('prod-1', 0);

      const state = useCartStore.getState();
      expect(state.items.find(i => i.productId === 'prod-1')).toBeUndefined();
      expect(state.items).toHaveLength(0);
      expect(state.subtotal).toBe(0);
      expect(state.storeId).toBeNull();
    });
  });

  describe('Coupon Management', () => {
    it('should apply coupon and calculate discount', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().applyCoupon('SAVE30', 30);

      const state = useCartStore.getState();
      expect(state.couponCode).toBe('SAVE30');
      expect(state.discount).toBe(30);
      expect(state.total).toBe(70); // 100 - 30
    });

    it('should remove coupon', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().applyCoupon('SAVE30', 30);
      useCartStore.getState().removeCoupon();

      const state = useCartStore.getState();
      expect(state.couponCode).toBeNull();
      expect(state.discount).toBe(0);
      expect(state.total).toBe(100);
    });
  });

  describe('Delivery Fee', () => {
    it('should add delivery fee to total', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().setDeliveryFee(25);

      const state = useCartStore.getState();
      expect(state.deliveryFee).toBe(25);
      expect(state.total).toBe(125); // 100 + 25
    });

    it('should calculate total with delivery fee and discount', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 200,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().setDeliveryFee(30);
      useCartStore.getState().applyCoupon('SAVE50', 50);

      const state = useCartStore.getState();
      expect(state.total).toBe(180); // 200 + 30 - 50
    });
  });

  describe('Clear Cart', () => {
    it('should clear entire cart', () => {
      const addItem = useCartStore.getState().addItem;

      addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      addItem({
        id: 'cart-2',
        productId: 'prod-2',
        name: 'Product B',
        price: 200,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().applyCoupon('SAVE30', 30);
      useCartStore.getState().clearCart();

      const state = useCartStore.getState();
      expect(state.items).toEqual([]);
      expect(state.subtotal).toBe(0);
      expect(state.total).toBe(0);
      expect(state.discount).toBe(0);
      expect(state.couponCode).toBeNull();
      expect(state.storeId).toBeNull();
    });
  });

  describe('Total Calculation Edge Cases', () => {
    it('should not allow negative total', () => {
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Product A',
        price: 10,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      useCartStore.getState().applyCoupon('BIG', 100); // Discount > subtotal

      expect(useCartStore.getState().total).toBe(0); // Should be capped at 0
    });
  });
});
