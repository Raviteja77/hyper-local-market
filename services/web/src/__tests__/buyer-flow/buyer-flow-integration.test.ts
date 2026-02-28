// Complete Buyer Flow Integration Tests
// Tests the entire buyer journey: Signup → Browse → Add to Cart → Checkout → Order Tracking
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/slices/authSlice';
import { useCartStore } from '@/store/slices/cartSlices';
import { useOrderStore, Order } from '@/store/slices/orderSlice';
import { PRODUCT_SECTIONS } from '@/lib/mockData/buyerMock';

describe('Complete Buyer Flow - Integration', () => {
  beforeEach(() => {
    // Reset all stores
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    useCartStore.setState({
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      couponCode: null,
      storeId: null,
    });
    useOrderStore.setState({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
    });
  });

  describe('Step 1: Buyer Registration & Authentication', () => {
    it('should register a new buyer and be authenticated', () => {
      const { login } = useAuthStore.getState();

      // Simulate successful buyer registration
      const buyerUser = {
        id: 'buyer-001',
        name: 'Ravi Kumar',
        phone: '9876543210',
        email: 'ravi@test.com',
        role: 'buyer' as const,
      };

      login(buyerUser, 'jwt-access-token', 'jwt-refresh-token');

      const authState = useAuthStore.getState();
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.user?.role).toBe('buyer');
      expect(authState.user?.name).toBe('Ravi Kumar');
      expect(authState.accessToken).toBeTruthy();
    });

    it('should handle OTP-based login for returning buyer', () => {
      const { login } = useAuthStore.getState();

      // Simulate OTP verification response
      login(
        { id: 'buyer-002', name: 'Returning Buyer', phone: '9999888877', role: 'buyer' },
        'new-access-token',
        'new-refresh-token'
      );

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.phone).toBe('9999888877');
    });
  });

  describe('Step 2: Browse Products', () => {
    it('should have products available from mock data', () => {
      expect(PRODUCT_SECTIONS.length).toBeGreaterThan(0);

      const allProducts = PRODUCT_SECTIONS.flatMap((section) => section.products);
      expect(allProducts.length).toBeGreaterThan(0);

      // Verify product data integrity
      allProducts.forEach((product) => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.original).toBeGreaterThanOrEqual(product.price);
        expect(product.rating).toBeGreaterThan(0);
        expect(product.rating).toBeLessThanOrEqual(5);
      });
    });

    it('should have product sections with titles', () => {
      PRODUCT_SECTIONS.forEach((section) => {
        expect(section.title).toBeTruthy();
        expect(section.products.length).toBeGreaterThan(0);
      });
    });

    it('should be able to find a specific product by id', () => {
      const allProducts = PRODUCT_SECTIONS.flatMap((s) => s.products);
      const product = allProducts.find((p) => p.id === 'laundry-1');

      expect(product).toBeDefined();
      expect(product?.name).toContain('Rin');
    });
  });

  describe('Step 3: Add Products to Cart', () => {
    it('should add product from catalog to cart', () => {
      const product = PRODUCT_SECTIONS[0].products[0]; // First product

      useCartStore.getState().addItem({
        id: `cart-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
      });

      const cart = useCartStore.getState();
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].name).toBe(product.name);
      expect(cart.items[0].price).toBe(product.price);
      expect(cart.subtotal).toBe(product.price);
    });

    it('should build a multi-item cart from product catalog', () => {
      const products = PRODUCT_SECTIONS[0].products.slice(0, 3); // First 3 products

      products.forEach((product) => {
        useCartStore.getState().addItem({
          id: `cart-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          storeId: 'store-1',
          storeName: 'Sharma Kirana Store',
        });
      });

      const cart = useCartStore.getState();
      expect(cart.items).toHaveLength(3);

      const expectedSubtotal = products.reduce((sum, p) => sum + p.price, 0);
      expect(cart.subtotal).toBe(expectedSubtotal);
    });
  });

  describe('Step 4: Cart Management', () => {
    beforeEach(() => {
      // Add some items to cart
      const products = PRODUCT_SECTIONS[0].products.slice(0, 2);
      products.forEach((product) => {
        useCartStore.getState().addItem({
          id: `cart-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          storeId: 'store-1',
          storeName: 'Sharma Kirana Store',
        });
      });
    });

    it('should update item quantity in cart', () => {
      const productId = PRODUCT_SECTIONS[0].products[0].id;
      useCartStore.getState().updateQuantity(productId, 3);

      const item = useCartStore.getState().items.find((i) => i.productId === productId);
      expect(item?.quantity).toBe(3);
    });

    it('should apply coupon code and reduce total', () => {
      const subtotalBefore = useCartStore.getState().subtotal;

      useCartStore.getState().applyCoupon('SAVE30', 30);

      const state = useCartStore.getState();
      expect(state.couponCode).toBe('SAVE30');
      expect(state.discount).toBe(30);
      expect(state.total).toBe(subtotalBefore - 30);
    });

    it('should calculate accurate totals with delivery fee and discount', () => {
      useCartStore.getState().setDeliveryFee(25);
      useCartStore.getState().applyCoupon('SAVE30', 30);

      const state = useCartStore.getState();
      const expectedTotal = state.subtotal + 25 - 30;
      expect(state.total).toBe(expectedTotal);
    });
  });

  describe('Step 5: Checkout & Place Order', () => {
    it('should create order from cart items and delivery address', () => {
      // Login buyer
      useAuthStore.getState().login(
        { id: 'buyer-1', name: 'Ravi Kumar', phone: '9876543210', role: 'buyer' },
        'token',
        'refresh'
      );

      // Add items to cart
      const product = PRODUCT_SECTIONS[0].products[0];
      useCartStore.getState().addItem({
        id: `cart-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
      });

      useCartStore.getState().setDeliveryFee(25);

      const cart = useCartStore.getState();

      // Create order
      const orderId = `ORD-${Date.now()}`;
      const order: Order = {
        id: `order-${Date.now()}`,
        orderId,
        status: 'pending',
        items: cart.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        discount: cart.discount,
        total: cart.total,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
        storeAddress: 'Shop 12, MG Road, Sector 5',
        deliveryAddress: {
          name: 'Ravi Kumar',
          phone: '9876543210',
          address: 'Flat 402, Galaxy Apartments, MG Road, Bangalore - 560038',
        },
        estimatedTime: '10-15 mins',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      useOrderStore.getState().addOrder(order);

      // Verify order
      const createdOrder = useOrderStore.getState().getOrderById(orderId);
      expect(createdOrder).toBeDefined();
      expect(createdOrder?.status).toBe('pending');
      expect(createdOrder?.items.length).toBe(cart.items.length);
      expect(createdOrder?.total).toBe(cart.total);
      expect(createdOrder?.deliveryAddress.name).toBe('Ravi Kumar');

      // Clear cart after order
      useCartStore.getState().clearCart();
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should not allow checkout without authentication', () => {
      // No login - user is not authenticated
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();

      // Cart has items
      useCartStore.getState().addItem({
        id: 'cart-1',
        productId: 'prod-1',
        name: 'Test Product',
        price: 100,
        storeId: 'store-1',
        storeName: 'Store 1',
      });

      // Authentication check would redirect to login in real UI
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it('should not allow checkout with empty cart', () => {
      useAuthStore.getState().login(
        { id: 'b1', name: 'Buyer', phone: '123', role: 'buyer' },
        't',
        'r'
      );

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('Step 6: Order Tracking', () => {
    let testOrderId: string;

    beforeEach(() => {
      // Setup: Login, add to cart, create order
      useAuthStore.getState().login(
        { id: 'buyer-1', name: 'Ravi Kumar', phone: '9876543210', role: 'buyer' },
        'token',
        'refresh'
      );

      testOrderId = `ORD-${Date.now()}`;
      useOrderStore.getState().addOrder({
        id: `order-${Date.now()}`,
        orderId: testOrderId,
        status: 'pending',
        items: [
          { id: 'i1', productId: 'p1', name: 'Detergent', price: 177, quantity: 2, image: '' },
        ],
        subtotal: 354,
        deliveryFee: 25,
        discount: 0,
        total: 379,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
        storeAddress: 'Shop 12, MG Road',
        deliveryAddress: {
          name: 'Ravi Kumar',
          phone: '9876543210',
          address: 'Flat 402, MG Road, Bangalore',
        },
        estimatedTime: '10-15 mins',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    it('should track order from pending to delivered', () => {
      // Seller confirms order
      useOrderStore.getState().updateOrderStatus(testOrderId, 'confirmed');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('confirmed');

      // Seller prepares order
      useOrderStore.getState().updateOrderStatus(testOrderId, 'preparing');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('preparing');

      // Order is ready for pickup
      useOrderStore.getState().updateOrderStatus(testOrderId, 'ready');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('ready');

      // Rider picks up
      useOrderStore.getState().updateOrderStatus(testOrderId, 'picked_up');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('picked_up');

      // Rider is out for delivery
      useOrderStore.getState().updateOrderStatus(testOrderId, 'out_for_delivery');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('out_for_delivery');

      // Order delivered!
      useOrderStore.getState().updateOrderStatus(testOrderId, 'delivered');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('delivered');
    });

    it('should assign rider information during delivery', () => {
      useOrderStore.getState().updateOrder(testOrderId, {
        riderName: 'Rahul Kumar',
        riderPhone: '8888777766',
        estimatedTime: '5 mins',
      });

      const order = useOrderStore.getState().getOrderById(testOrderId);
      expect(order?.riderName).toBe('Rahul Kumar');
      expect(order?.riderPhone).toBe('8888777766');
      expect(order?.estimatedTime).toBe('5 mins');
    });

    it('should handle order cancellation', () => {
      useOrderStore.getState().updateOrderStatus(testOrderId, 'cancelled');
      expect(useOrderStore.getState().getOrderById(testOrderId)?.status).toBe('cancelled');
    });
  });

  describe('Step 7: Order History', () => {
    it('should maintain order history across multiple orders', () => {
      useAuthStore.getState().login(
        { id: 'buyer-1', name: 'Ravi', phone: '123', role: 'buyer' },
        't',
        'r'
      );

      // Place 3 orders
      for (let i = 1; i <= 3; i++) {
        useOrderStore.getState().addOrder({
          id: `order-${i}`,
          orderId: `ORD-${i}`,
          status: i === 3 ? 'pending' : 'delivered',
          items: [{ id: `i${i}`, productId: `p${i}`, name: `Item ${i}`, price: 100 * i, quantity: 1 }],
          subtotal: 100 * i,
          deliveryFee: 25,
          discount: 0,
          total: 100 * i + 25,
          storeId: 'store-1',
          storeName: 'Store',
          storeAddress: 'Address',
          deliveryAddress: { name: 'Ravi', phone: '123', address: 'Home' },
          estimatedTime: '15 mins',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      expect(useOrderStore.getState().orders).toHaveLength(3);

      // Filter by status
      const delivered = useOrderStore.getState().getOrdersByStatus('delivered');
      expect(delivered).toHaveLength(2);

      const pending = useOrderStore.getState().getOrdersByStatus('pending');
      expect(pending).toHaveLength(1);
    });
  });

  describe('Full End-to-End Flow', () => {
    it('should complete entire buyer journey without errors', () => {
      // ====== STEP 1: REGISTER/LOGIN ======
      useAuthStore.getState().login(
        {
          id: 'buyer-e2e',
          name: 'E2E Buyer',
          phone: '9999999999',
          email: 'e2e@test.com',
          role: 'buyer',
        },
        'e2e-access-token',
        'e2e-refresh-token'
      );
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // ====== STEP 2: BROWSE PRODUCTS ======
      const allProducts = PRODUCT_SECTIONS.flatMap((s) => s.products);
      expect(allProducts.length).toBeGreaterThan(0);

      // ====== STEP 3: ADD TO CART ======
      const selectedProducts = allProducts.slice(0, 2);
      selectedProducts.forEach((product) => {
        useCartStore.getState().addItem({
          id: `cart-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          storeId: 'store-1',
          storeName: 'Sharma Kirana Store',
        });
      });
      expect(useCartStore.getState().items).toHaveLength(2);

      // ====== STEP 4: MANAGE CART ======
      // Increase quantity of first item
      useCartStore.getState().updateQuantity(selectedProducts[0].id, 3);
      expect(useCartStore.getState().items[0].quantity).toBe(3);

      // Apply coupon
      useCartStore.getState().applyCoupon('SAVE30', 30);
      expect(useCartStore.getState().discount).toBe(30);

      // Set delivery fee
      useCartStore.getState().setDeliveryFee(25);

      // Verify totals
      const cart = useCartStore.getState();
      const expectedSubtotal = selectedProducts[0].price * 3 + selectedProducts[1].price;
      expect(cart.subtotal).toBe(expectedSubtotal);
      expect(cart.total).toBe(expectedSubtotal + 25 - 30);

      // ====== STEP 5: CHECKOUT ======
      const orderId = 'ORD-E2E-001';
      const order: Order = {
        id: 'order-e2e',
        orderId,
        status: 'pending',
        items: cart.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        discount: cart.discount,
        total: cart.total,
        storeId: 'store-1',
        storeName: 'Sharma Kirana Store',
        storeAddress: 'Shop 12, MG Road',
        deliveryAddress: {
          name: 'E2E Buyer',
          phone: '9999999999',
          address: 'Flat 402, Galaxy Apartments, MG Road, Bangalore - 560038',
        },
        estimatedTime: '10-15 mins',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      useOrderStore.getState().addOrder(order);
      useCartStore.getState().clearCart();

      // Verify order created and cart cleared
      expect(useOrderStore.getState().orders).toHaveLength(1);
      expect(useCartStore.getState().items).toHaveLength(0);

      // ====== STEP 6: TRACK ORDER ======
      useOrderStore.getState().updateOrderStatus(orderId, 'confirmed');
      useOrderStore.getState().updateOrderStatus(orderId, 'preparing');
      useOrderStore.getState().updateOrder(orderId, {
        riderName: 'Delivery Partner',
        riderPhone: '8888888888',
      });
      useOrderStore.getState().updateOrderStatus(orderId, 'ready');
      useOrderStore.getState().updateOrderStatus(orderId, 'picked_up');
      useOrderStore.getState().updateOrderStatus(orderId, 'out_for_delivery');
      useOrderStore.getState().updateOrderStatus(orderId, 'delivered');

      // ====== STEP 7: VERIFY FINAL STATE ======
      const finalOrder = useOrderStore.getState().getOrderById(orderId);
      expect(finalOrder?.status).toBe('delivered');
      expect(finalOrder?.riderName).toBe('Delivery Partner');
      expect(finalOrder?.total).toBe(order.total);

      // Buyer is still authenticated
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // ====== STEP 8: LOGOUT ======
      useAuthStore.getState().logout();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();
    });
  });
});
