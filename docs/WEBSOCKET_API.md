# WebSocket API Documentation

## Overview

The Hyper Local Market platform uses WebSockets for real-time communication between clients and the server. This enables features like:

- Real-time order status updates
- Live delivery tracking
- Instant notifications
- Live inventory updates

## Technology Stack

- **Backend**: Django Channels with Redis channel layer
- **Frontend**: Native WebSocket API
- **Authentication**: JWT tokens passed via query parameters
- **Protocol**: WebSocket (ws:// for development, wss:// for production)

---

## Connection

### Endpoints

1. **Order Tracking WebSocket**: `/ws/orders/`
2. **Notifications WebSocket**: `/ws/notifications/`

### Authentication

WebSocket connections require JWT authentication. Pass the access token as a query parameter:

```
ws://localhost:8000/ws/orders/?token=<your_jwt_access_token>
wss://yourdomain.com/ws/orders/?token=<your_jwt_access_token>
```

### Connection Example (JavaScript)

```javascript
const token = 'your_jwt_access_token';
const ws = new WebSocket(`ws://localhost:8000/ws/orders/?token=${token}`);

ws.onopen = () => {
  console.log('Connected to order tracking');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected from order tracking');
};
```

---

## Order Tracking WebSocket

### Connection Events

#### Connection Established

Sent when connection is successfully established.

```json
{
  "type": "connection_established",
  "message": "Connected to order tracking",
  "user_id": 123,
  "role": "buyer"
}
```

### Client Messages

#### Subscribe to Order

Subscribe to updates for a specific order.

```json
{
  "type": "subscribe_order",
  "order_id": "ORD20240210123456"
}
```

**Response:**
```json
{
  "type": "subscribed",
  "order_id": "ORD20240210123456",
  "message": "Subscribed to order ORD20240210123456"
}
```

#### Unsubscribe from Order

Unsubscribe from order updates.

```json
{
  "type": "unsubscribe_order",
  "order_id": "ORD20240210123456"
}
```

**Response:**
```json
{
  "type": "unsubscribed",
  "order_id": "ORD20240210123456",
  "message": "Unsubscribed from order ORD20240210123456"
}
```

#### Heartbeat (Ping)

Keep connection alive by sending periodic pings.

```json
{
  "type": "ping",
  "timestamp": "2024-02-10T23:17:00Z"
}
```

**Response:**
```json
{
  "type": "pong",
  "timestamp": "2024-02-10T23:17:00Z"
}
```

### Server Events

#### Order Update

Sent when any order field is updated.

```json
{
  "type": "order_update",
  "order": {
    "order_id": "ORD20240210123456",
    "status": "confirmed",
    "payment_status": "completed",
    "total": "299.00",
    "store_id": "STR123"
  },
  "message": "Order ORD20240210123456 updated",
  "timestamp": "2024-02-10T23:17:00Z"
}
```

#### Order Status Changed

Sent when order status changes.

```json
{
  "type": "order_status_changed",
  "order_id": "ORD20240210123456",
  "old_status": "pending",
  "new_status": "confirmed",
  "message": "Order confirmed by store",
  "timestamp": "2024-02-10T23:17:00Z"
}
```

**Status Values:**
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Store confirmed the order
- `preparing` - Order is being prepared
- `ready` - Order ready for pickup
- `picked_up` - Rider picked up the order
- `out_for_delivery` - Order is on the way
- `delivered` - Order delivered successfully
- `cancelled` - Order was cancelled

#### Rider Location Update

Sent when delivery rider's location changes.

```json
{
  "type": "rider_location_update",
  "order_id": "ORD20240210123456",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "timestamp": "2024-02-10T23:17:00Z"
}
```

---

## Notifications WebSocket

### Connection Events

#### Connection Established

```json
{
  "type": "connection_established",
  "message": "Connected to notifications"
}
```

### Server Events

#### Notification

General notification event.

```json
{
  "type": "notification",
  "title": "Order Update",
  "message": "Your order has been delivered!",
  "data": {
    "order_id": "ORD20240210123456",
    "action": "view_order"
  },
  "timestamp": "2024-02-10T23:17:00Z"
}
```

---

## Frontend Integration

### React/Next.js Implementation

#### 1. WebSocket Client

```typescript
// lib/websocket/client.ts
import { useState, useEffect } from 'react';

export class WebSocketClient {
  private ws: WebSocket | null = null;
  
  connect(token: string, endpoint: string) {
    const url = `${process.env.NEXT_PUBLIC_WS_URL}${endpoint}?token=${token}`;
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => console.log('Connected');
    this.ws.onmessage = (event) => this.handleMessage(JSON.parse(event.data));
    this.ws.onerror = (error) => console.error('Error:', error);
    this.ws.onclose = () => this.reconnect();
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  
  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  
  private handleMessage(data: any) {
    // Handle different message types
  }
  
  private reconnect() {
    setTimeout(() => this.connect(token, endpoint), 1000);
  }
}
```

#### 2. React Hook for Order Tracking

```typescript
// lib/hooks/useOrderTracking.ts
import { useEffect, useState } from 'react';
import { orderTrackingClient } from '../websocket/client';

export function useOrderTracking(orderId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    orderTrackingClient.connect(accessToken);
    
    const unsubscribe = orderTrackingClient.on((event) => {
      setLastUpdate(event);
    });

    return () => unsubscribe();
  }, [accessToken]);

  useEffect(() => {
    if (!orderId || !isConnected) return;
    
    orderTrackingClient.subscribeToOrder(orderId);
    
    return () => {
      orderTrackingClient.unsubscribeFromOrder(orderId);
    };
  }, [orderId, isConnected]);

  return { isConnected, lastUpdate };
}
```

#### 3. Usage in Component

```tsx
// components/OrderTracker.tsx
import { useOrderTracking } from '@/lib/hooks/useOrderTracking';

export function OrderTracker({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const { isConnected, lastUpdate } = useOrderTracking(orderId);

  useEffect(() => {
    if (lastUpdate?.type === 'order_status_changed') {
      setStatus(lastUpdate.new_status);
      // Show notification, play sound, etc.
    }
  }, [lastUpdate]);

  return (
    <div>
      <div>Status: {isConnected ? '🟢 Live' : '🔴 Offline'}</div>
      <div>Order Status: {status}</div>
    </div>
  );
}
```

---

## Backend Implementation

### Django Channels Setup

#### 1. Install Dependencies

```bash
pip install channels channels-redis daphne
```

#### 2. Configure Settings

```python
# config/settings/base.py

INSTALLED_APPS = [
    'daphne',  # Must be before django.contrib.staticfiles
    # ... other apps
    'channels',
]

ASGI_APPLICATION = 'config.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('localhost', 6379)],
        },
    },
}
```

#### 3. ASGI Configuration

```python
# config/asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from websockets.middleware import JWTAuthMiddleware
from websockets.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        JWTAuthMiddleware(
            URLRouter(websocket_urlpatterns)
        )
    ),
})
```

### Sending Updates from Backend

#### From Views

```python
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def update_order_status(order, new_status):
    order.status = new_status
    order.save()
    
    # Send WebSocket update
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_orders_{order.user_id}",
        {
            'type': 'order_status_changed',
            'order_id': order.order_id,
            'old_status': old_status,
            'new_status': new_status,
            'message': 'Order status updated',
            'timestamp': timezone.now().isoformat()
        }
    )
```

#### From Celery Tasks

```python
@shared_task
def process_order_payment(order_id):
    order = Order.objects.get(order_id=order_id)
    # Process payment...
    
    # Notify via WebSocket
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"order_{order_id}",
        {
            'type': 'order_update',
            'order': {
                'order_id': order.order_id,
                'status': order.status,
                'payment_status': 'completed'
            },
            'message': 'Payment successful',
            'timestamp': timezone.now().isoformat()
        }
    )
```

---

## Security Considerations

1. **Authentication**: Always verify JWT tokens before accepting connections
2. **Authorization**: Only send updates to users who have permission to view them
3. **Rate Limiting**: Implement rate limiting for WebSocket connections
4. **Input Validation**: Validate all incoming messages
5. **HTTPS/WSS**: Always use secure WebSocket connections in production

---

## Troubleshooting

### Connection Fails

1. Check if Redis is running: `redis-cli ping`
2. Verify JWT token is valid
3. Check CORS settings for WebSocket connections
4. Ensure Daphne is running (not just Django dev server)

### No Updates Received

1. Verify subscription to correct order/channel
2. Check backend logs for errors
3. Ensure channel layer is configured correctly
4. Test with Redis CLI: `redis-cli PUBSUB CHANNELS`

### Performance Issues

1. Use connection pooling for Redis
2. Implement message batching for high-frequency updates
3. Add indexes to frequently queried fields
4. Monitor Redis memory usage

---

## Testing

### Manual Testing with wscat

```bash
# Install wscat
npm install -g wscat

# Connect to WebSocket
wscat -c "ws://localhost:8000/ws/orders/?token=YOUR_TOKEN"

# Send message
{"type": "subscribe_order", "order_id": "ORD123"}

# Receive messages
< {"type": "order_status_changed", ...}
```

### Automated Testing

```python
# tests/test_websocket.py
from channels.testing import WebsocketCommunicator
from config.asgi import application

async def test_order_tracking():
    communicator = WebsocketCommunicator(application, "/ws/orders/")
    connected, subprotocol = await communicator.connect()
    assert connected
    
    # Send subscription
    await communicator.send_json_to({
        "type": "subscribe_order",
        "order_id": "ORD123"
    })
    
    # Receive confirmation
    response = await communicator.receive_json_from()
    assert response["type"] == "subscribed"
    
    await communicator.disconnect()
```

---

## Production Deployment

### Environment Variables

```bash
# WebSocket URL for frontend
NEXT_PUBLIC_WS_URL=wss://api.yourdomain.com

# Redis configuration
REDIS_HOST=redis
REDIS_PORT=6379
```

### Nginx Configuration

```nginx
location /ws/ {
    proxy_pass http://daphne:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 86400;
}
```

### Running Daphne

```bash
# Development
daphne -b 0.0.0.0 -p 8000 config.asgi:application

# Production with systemd
[Unit]
Description=Daphne ASGI Server
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/app
ExecStart=/usr/local/bin/daphne -b 127.0.0.1 -p 8000 config.asgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

---

## Best Practices

1. **Reconnection**: Implement exponential backoff for reconnections
2. **Heartbeat**: Send periodic pings to keep connections alive
3. **Message Queuing**: Queue messages if connection is temporarily lost
4. **Error Handling**: Handle all connection errors gracefully
5. **Logging**: Log all WebSocket events for debugging
6. **Monitoring**: Monitor active connections and message rates

---

## Support

For issues or questions:
- Check logs: `docker logs <container>`
- Redis status: `redis-cli INFO`
- WebSocket connections: `netstat -an | grep 8000`

---

*Last Updated: 2024-02-10*
