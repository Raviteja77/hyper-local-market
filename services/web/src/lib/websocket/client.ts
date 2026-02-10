/**
 * WebSocket client for real-time order tracking.
 * 
 * Connects to the Django Channels WebSocket endpoint and handles
 * real-time order updates, status changes, and notifications.
 */

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderUpdateEvent {
  type: 'order_update';
  order: {
    order_id: string;
    status: OrderStatus;
    payment_status: string;
    total: string;
    store_id: string;
  };
  message: string;
  timestamp: string;
}

export interface OrderStatusChangedEvent {
  type: 'order_status_changed';
  order_id: string;
  old_status?: OrderStatus;
  new_status: OrderStatus;
  message: string;
  timestamp: string;
}

export interface RiderLocationUpdateEvent {
  type: 'rider_location_update';
  order_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface NotificationEvent {
  type: 'notification';
  title: string;
  message: string;
  data?: any;
  timestamp: string;
}

export type WebSocketEvent = OrderUpdateEvent | OrderStatusChangedEvent | RiderLocationUpdateEvent | NotificationEvent;

export type WebSocketEventHandler = (event: WebSocketEvent) => void;

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private eventHandlers: Set<WebSocketEventHandler> = new Set();
  private connectionStatusHandlers: Set<(connected: boolean) => void> = new Set();
  private token: string | null = null;
  private endpoint: string;
  private isConnecting = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor(endpoint: string = '/ws/orders/') {
    this.endpoint = endpoint;
  }

  /**
   * Connect to WebSocket server with JWT authentication.
   */
  connect(token: string): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.token = token;
    this.isConnecting = true;
    
    try {
      const url = `${WS_BASE_URL}${this.endpoint}?token=${token}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.notifyConnectionStatus(true);
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error:', error);
        this.isConnecting = false;
      };

      this.ws.onclose = () => {
        console.log('[WebSocket] Disconnected');
        this.isConnecting = false;
        this.stopHeartbeat();
        this.notifyConnectionStatus(false);
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('[WebSocket] Connection failed:', error);
      this.isConnecting = false;
      this.attemptReconnect();
    }
  }

  /**
   * Disconnect from WebSocket server.
   */
  disconnect(): void {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.reconnectAttempts = 0;
    this.notifyConnectionStatus(false);
  }

  /**
   * Subscribe to a specific order for updates.
   */
  subscribeToOrder(orderId: string): void {
    this.send({
      type: 'subscribe_order',
      order_id: orderId,
    });
  }

  /**
   * Unsubscribe from a specific order.
   */
  unsubscribeFromOrder(orderId: string): void {
    this.send({
      type: 'unsubscribe_order',
      order_id: orderId,
    });
  }

  /**
   * Add event handler for WebSocket events.
   */
  on(handler: WebSocketEventHandler): () => void {
    this.eventHandlers.add(handler);
    return () => this.eventHandlers.delete(handler);
  }

  /**
   * Add connection status handler.
   */
  onConnectionStatusChange(handler: (connected: boolean) => void): () => void {
    this.connectionStatusHandlers.add(handler);
    return () => this.connectionStatusHandlers.delete(handler);
  }

  /**
   * Check if WebSocket is connected.
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Send message to WebSocket server.
   */
  private send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('[WebSocket] Cannot send message - not connected');
    }
  }

  /**
   * Handle incoming WebSocket message.
   */
  private handleMessage(data: any): void {
    // Handle connection established
    if (data.type === 'connection_established') {
      console.log('[WebSocket] Connection established:', data);
      return;
    }

    // Handle pong (heartbeat response)
    if (data.type === 'pong') {
      return;
    }

    // Handle subscribed/unsubscribed confirmations
    if (data.type === 'subscribed' || data.type === 'unsubscribed') {
      console.log(`[WebSocket] ${data.type}:`, data);
      return;
    }

    // Notify all event handlers
    this.eventHandlers.forEach((handler) => {
      try {
        handler(data as WebSocketEvent);
      } catch (error) {
        console.error('[WebSocket] Event handler error:', error);
      }
    });
  }

  /**
   * Attempt to reconnect to WebSocket server.
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WebSocket] Max reconnection attempts reached');
      return;
    }

    if (!this.token) {
      console.warn('[WebSocket] No token available for reconnection');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    setTimeout(() => {
      if (this.token) {
        this.connect(this.token);
      }
    }, delay);
  }

  /**
   * Notify connection status handlers.
   */
  private notifyConnectionStatus(connected: boolean): void {
    this.connectionStatusHandlers.forEach((handler) => {
      try {
        handler(connected);
      } catch (error) {
        console.error('[WebSocket] Connection status handler error:', error);
      }
    });
  }

  /**
   * Start heartbeat to keep connection alive.
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      this.send({
        type: 'ping',
        timestamp: new Date().toISOString(),
      });
    }, 30000); // Send ping every 30 seconds
  }

  /**
   * Stop heartbeat.
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

// Singleton instances
export const orderTrackingClient = new WebSocketClient('/ws/orders/');
export const notificationClient = new WebSocketClient('/ws/notifications/');
