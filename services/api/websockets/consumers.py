"""
WebSocket consumers for real-time order tracking.
"""
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from apps.orders.models import Order
from apps.orders.serializers import OrderDetailSerializer
import json

User = get_user_model()


class OrderTrackingConsumer(AsyncJsonWebsocketConsumer):
    """
    WebSocket consumer for real-time order tracking.
    
    Allows users to subscribe to order updates and receive real-time notifications
    when order status changes.
    """
    
    async def connect(self):
        """
        Handle WebSocket connection.
        Authenticate user and add to appropriate groups.
        """
        # Get user from scope (set by AuthMiddleware)
        self.user = self.scope.get("user")
        
        # Reject if user is not authenticated
        if not self.user or not self.user.is_authenticated:
            await self.close(code=4001)
            return
        
        # Accept the connection
        await self.accept()
        
        # Subscribe user to their personal order group
        self.user_group_name = f"user_orders_{self.user.id}"
        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        
        # If seller, subscribe to store order group
        if self.user.role == 'seller' and hasattr(self.user, 'store'):
            self.store_group_name = f"store_orders_{self.user.store.store_id}"
            await self.channel_layer.group_add(
                self.store_group_name,
                self.channel_name
            )
        
        # If rider, subscribe to rider order group
        if self.user.role == 'rider':
            self.rider_group_name = f"rider_orders_{self.user.id}"
            await self.channel_layer.group_add(
                self.rider_group_name,
                self.channel_name
            )
        
        # Send connection confirmation
        await self.send_json({
            'type': 'connection_established',
            'message': 'Connected to order tracking',
            'user_id': self.user.id,
            'role': self.user.role
        })
    
    async def disconnect(self, close_code):
        """
        Handle WebSocket disconnection.
        Remove from all groups.
        """
        if hasattr(self, 'user_group_name'):
            await self.channel_layer.group_discard(
                self.user_group_name,
                self.channel_name
            )
        
        if hasattr(self, 'store_group_name'):
            await self.channel_layer.group_discard(
                self.store_group_name,
                self.channel_name
            )
        
        if hasattr(self, 'rider_group_name'):
            await self.channel_layer.group_discard(
                self.rider_group_name,
                self.channel_name
            )
    
    async def receive_json(self, content):
        """
        Handle incoming WebSocket messages.
        """
        message_type = content.get('type')
        
        if message_type == 'subscribe_order':
            # Subscribe to specific order updates
            order_id = content.get('order_id')
            if order_id:
                # Verify user has access to this order
                has_access = await self.verify_order_access(order_id)
                if has_access:
                    order_group_name = f"order_{order_id}"
                    await self.channel_layer.group_add(
                        order_group_name,
                        self.channel_name
                    )
                    await self.send_json({
                        'type': 'subscribed',
                        'order_id': order_id,
                        'message': f'Subscribed to order {order_id}'
                    })
                else:
                    await self.send_json({
                        'type': 'error',
                        'message': 'Access denied to this order'
                    })
        
        elif message_type == 'unsubscribe_order':
            # Unsubscribe from specific order updates
            order_id = content.get('order_id')
            if order_id:
                order_group_name = f"order_{order_id}"
                await self.channel_layer.group_discard(
                    order_group_name,
                    self.channel_name
                )
                await self.send_json({
                    'type': 'unsubscribed',
                    'order_id': order_id,
                    'message': f'Unsubscribed from order {order_id}'
                })
        
        elif message_type == 'ping':
            # Heartbeat to keep connection alive
            await self.send_json({
                'type': 'pong',
                'timestamp': content.get('timestamp')
            })
    
    async def order_update(self, event):
        """
        Handler for order_update events sent to the group.
        Sends order update to the client.
        """
        await self.send_json({
            'type': 'order_update',
            'order': event['order'],
            'message': event.get('message', 'Order updated'),
            'timestamp': event.get('timestamp')
        })
    
    async def order_status_changed(self, event):
        """
        Handler for order status change events.
        """
        await self.send_json({
            'type': 'order_status_changed',
            'order_id': event['order_id'],
            'old_status': event.get('old_status'),
            'new_status': event['new_status'],
            'message': event.get('message', 'Order status changed'),
            'timestamp': event.get('timestamp')
        })
    
    async def rider_location_update(self, event):
        """
        Handler for rider location updates.
        """
        await self.send_json({
            'type': 'rider_location_update',
            'order_id': event['order_id'],
            'latitude': event['latitude'],
            'longitude': event['longitude'],
            'timestamp': event.get('timestamp')
        })
    
    @database_sync_to_async
    def verify_order_access(self, order_id):
        """
        Verify that the user has access to the specified order.
        """
        try:
            order = Order.objects.get(order_id=order_id)
            
            # Buyer can access their own orders
            if self.user.id == order.user_id:
                return True
            
            # Seller can access orders for their store
            if self.user.role == 'seller' and hasattr(self.user, 'store'):
                if order.store_id == self.user.store.store_id:
                    return True
            
            # Rider can access assigned orders
            if self.user.role == 'rider' and order.rider_id == self.user.id:
                return True
            
            # Admin can access all orders
            if self.user.role == 'admin':
                return True
            
            return False
        except Order.DoesNotExist:
            return False


class NotificationConsumer(AsyncJsonWebsocketConsumer):
    """
    WebSocket consumer for general notifications.
    """
    
    async def connect(self):
        """Handle WebSocket connection."""
        self.user = self.scope.get("user")
        
        if not self.user or not self.user.is_authenticated:
            await self.close(code=4001)
            return
        
        await self.accept()
        
        # Subscribe to user notification group
        self.notification_group_name = f"notifications_{self.user.id}"
        await self.channel_layer.group_add(
            self.notification_group_name,
            self.channel_name
        )
        
        await self.send_json({
            'type': 'connection_established',
            'message': 'Connected to notifications'
        })
    
    async def disconnect(self, close_code):
        """Handle WebSocket disconnection."""
        if hasattr(self, 'notification_group_name'):
            await self.channel_layer.group_discard(
                self.notification_group_name,
                self.channel_name
            )
    
    async def receive_json(self, content):
        """Handle incoming messages."""
        message_type = content.get('type')
        
        if message_type == 'ping':
            await self.send_json({
                'type': 'pong',
                'timestamp': content.get('timestamp')
            })
    
    async def notification(self, event):
        """Handler for notification events."""
        await self.send_json({
            'type': 'notification',
            'title': event.get('title'),
            'message': event.get('message'),
            'data': event.get('data'),
            'timestamp': event.get('timestamp')
        })
