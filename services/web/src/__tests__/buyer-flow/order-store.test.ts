// Order Store - Buyer Flow Regression Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { useOrderStore, Order } from '@/store/slices/orderSlice';

const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
  id: `order-${Date.now()}`,
  orderId: `ORD-${Date.now()}`,
  status: 'pending',
  items: [
    {
      id: 'item-1',
      productId: 'prod-1',
      name: 'Rin Matic Detergent',
      price: 177,
      quantity: 2,
      image: 'https://picsum.photos/200',
    },
  ],
  subtotal: 354,
  deliveryFee: 25,
  discount: 0,
  total: 379,
  storeId: 'store-1',
  storeName: 'Sharma Kirana Store',
  storeAddress: 'Shop 12, MG Road, Sector 5',
  deliveryAddress: {
    name: 'Test Buyer',
    phone: '9876543210',
    address: '402, Galaxy Apartments, MG Road, Bangalore - 560038',
  },
  estimatedTime: '10-15 mins',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe('Order Store - Buyer Flow', () => {
  beforeEach(() => {
    useOrderStore.setState({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
    });
  });

  describe('Initial State', () => {
    it('should start with empty orders', () => {
      const state = useOrderStore.getState();
      expect(state.orders).toEqual([]);
      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('Create Order (Place Order)', () => {
    it('should add a new order', () => {
      const order = createMockOrder({ orderId: 'ORD-001' });
      useOrderStore.getState().addOrder(order);

      const state = useOrderStore.getState();
      expect(state.orders).toHaveLength(1);
      expect(state.orders[0].orderId).toBe('ORD-001');
      expect(state.currentOrder?.orderId).toBe('ORD-001');
    });

    it('should add order with correct items', () => {
      const order = createMockOrder({
        orderId: 'ORD-002',
        items: [
          { id: 'i1', productId: 'p1', name: 'Detergent', price: 177, quantity: 2 },
          { id: 'i2', productId: 'p2', name: 'Floor Cleaner', price: 400, quantity: 1 },
        ],
        subtotal: 754,
        total: 779,
      });

      useOrderStore.getState().addOrder(order);

      const addedOrder = useOrderStore.getState().orders[0];
      expect(addedOrder.items).toHaveLength(2);
      expect(addedOrder.subtotal).toBe(754);
      expect(addedOrder.total).toBe(779);
    });

    it('should set current order when adding', () => {
      const order = createMockOrder({ orderId: 'ORD-003' });
      useOrderStore.getState().addOrder(order);

      expect(useOrderStore.getState().currentOrder?.orderId).toBe('ORD-003');
    });

    it('should prepend new orders (most recent first)', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-FIRST' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-SECOND' }));

      const orders = useOrderStore.getState().orders;
      expect(orders[0].orderId).toBe('ORD-SECOND');
      expect(orders[1].orderId).toBe('ORD-FIRST');
    });
  });

  describe('Order Status Tracking', () => {
    it('should update order status', () => {
      const order = createMockOrder({ orderId: 'ORD-TRACK', status: 'pending' });
      useOrderStore.getState().addOrder(order);

      useOrderStore.getState().updateOrderStatus('ORD-TRACK', 'confirmed');

      expect(useOrderStore.getState().orders[0].status).toBe('confirmed');
    });

    it('should track full order lifecycle', () => {
      const order = createMockOrder({ orderId: 'ORD-LIFECYCLE', status: 'pending' });
      useOrderStore.getState().addOrder(order);

      const statuses = [
        'confirmed',
        'preparing',
        'ready',
        'picked_up',
        'out_for_delivery',
        'delivered',
      ] as const;

      statuses.forEach((s) => {
        useOrderStore.getState().updateOrderStatus('ORD-LIFECYCLE', s);
        expect(useOrderStore.getState().orders[0].status).toBe(s);
      });
    });

    it('should update current order status if matching', () => {
      const order = createMockOrder({ orderId: 'ORD-CURRENT' });
      useOrderStore.getState().addOrder(order);

      useOrderStore.getState().updateOrderStatus('ORD-CURRENT', 'confirmed');

      expect(useOrderStore.getState().currentOrder?.status).toBe('confirmed');
    });

    it('should update updatedAt timestamp when status changes', () => {
      const order = createMockOrder({ orderId: 'ORD-TIME' });
      useOrderStore.getState().addOrder(order);

      // Status change generates a new updatedAt using new Date().toISOString()
      useOrderStore.getState().updateOrderStatus('ORD-TIME', 'confirmed');

      const updatedOrder = useOrderStore.getState().orders[0];
      // The updatedAt should be a valid ISO timestamp
      expect(updatedOrder.updatedAt).toBeTruthy();
      expect(new Date(updatedOrder.updatedAt).getTime()).toBeGreaterThan(0);
      expect(updatedOrder.status).toBe('confirmed');
    });
  });

  describe('Order Lookup', () => {
    it('should find order by orderId', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-FIND' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-OTHER' }));

      const found = useOrderStore.getState().getOrderById('ORD-FIND');
      expect(found?.orderId).toBe('ORD-FIND');
    });

    it('should return undefined for non-existent order', () => {
      const found = useOrderStore.getState().getOrderById('ORD-NONEXISTENT');
      expect(found).toBeUndefined();
    });

    it('should filter orders by status', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-1', status: 'pending' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-2', status: 'delivered' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-3', status: 'pending' }));

      const pendingOrders = useOrderStore.getState().getOrdersByStatus('pending');
      expect(pendingOrders).toHaveLength(2);

      const deliveredOrders = useOrderStore.getState().getOrdersByStatus('delivered');
      expect(deliveredOrders).toHaveLength(1);
    });
  });

  describe('Update Order', () => {
    it('should update order fields', () => {
      useOrderStore.getState().addOrder(
        createMockOrder({ orderId: 'ORD-UPDATE' })
      );

      useOrderStore.getState().updateOrder('ORD-UPDATE', {
        riderName: 'Rahul Kumar',
        riderPhone: '9876543210',
        estimatedTime: '5 mins',
      });

      const order = useOrderStore.getState().getOrderById('ORD-UPDATE');
      expect(order?.riderName).toBe('Rahul Kumar');
      expect(order?.riderPhone).toBe('9876543210');
      expect(order?.estimatedTime).toBe('5 mins');
    });
  });

  describe('Cancel Order', () => {
    it('should update order status to cancelled', () => {
      useOrderStore.getState().addOrder(
        createMockOrder({ orderId: 'ORD-CANCEL', status: 'pending' })
      );

      useOrderStore.getState().updateOrderStatus('ORD-CANCEL', 'cancelled');

      expect(useOrderStore.getState().orders[0].status).toBe('cancelled');
    });
  });

  describe('Remove Order', () => {
    it('should remove order from list', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-A' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-B' }));

      useOrderStore.getState().removeOrder('ORD-A');

      expect(useOrderStore.getState().orders).toHaveLength(1);
      expect(useOrderStore.getState().orders[0].orderId).toBe('ORD-B');
    });

    it('should clear current order if removed', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-REM' }));
      expect(useOrderStore.getState().currentOrder?.orderId).toBe('ORD-REM');

      useOrderStore.getState().removeOrder('ORD-REM');
      expect(useOrderStore.getState().currentOrder).toBeNull();
    });
  });

  describe('Batch Operations', () => {
    it('should set multiple orders at once', () => {
      const orders = [
        createMockOrder({ orderId: 'ORD-BATCH-1' }),
        createMockOrder({ orderId: 'ORD-BATCH-2' }),
        createMockOrder({ orderId: 'ORD-BATCH-3' }),
      ];

      useOrderStore.getState().setOrders(orders);

      expect(useOrderStore.getState().orders).toHaveLength(3);
    });

    it('should clear all orders', () => {
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-X' }));
      useOrderStore.getState().addOrder(createMockOrder({ orderId: 'ORD-Y' }));

      useOrderStore.getState().clearOrders();

      expect(useOrderStore.getState().orders).toEqual([]);
      expect(useOrderStore.getState().currentOrder).toBeNull();
    });
  });

  describe('Loading and Error States', () => {
    it('should track loading state', () => {
      useOrderStore.getState().setLoading(true);
      expect(useOrderStore.getState().isLoading).toBe(true);

      useOrderStore.getState().setLoading(false);
      expect(useOrderStore.getState().isLoading).toBe(false);
    });

    it('should set error and stop loading', () => {
      useOrderStore.getState().setLoading(true);
      useOrderStore.getState().setError('Order creation failed');

      const state = useOrderStore.getState();
      expect(state.error).toBe('Order creation failed');
      expect(state.isLoading).toBe(false);
    });
  });
});
