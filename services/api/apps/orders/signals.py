"""
Order signals for real-time updates.
"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Order


@receiver(post_save, sender=Order)
def order_status_changed(sender, instance, created, **kwargs):
    """
    Send WebSocket notification when order status changes.
    """
    channel_layer = get_channel_layer()
    if not channel_layer:
        return
    
    # Get old status from database if not created
    old_status = None
    if not created:
        old_instance = Order.objects.filter(order_id=instance.order_id).first()
        if old_instance:
            old_status = old_instance.status
    
    # Prepare order data
    order_data = {
        'order_id': instance.order_id,
        'status': instance.status,
        'payment_status': instance.payment_status,
        'total': str(instance.total),
        'store_id': instance.store_id,
    }
    
    # Notify buyer
    async_to_sync(channel_layer.group_send)(
        f"user_orders_{instance.user_id}",
        {
            'type': 'order_update',
            'order': order_data,
            'message': f'Order {instance.order_id} updated',
            'timestamp': timezone.now().isoformat()
        }
    )
    
    # Send status change notification
    if old_status and old_status != instance.status:
        async_to_sync(channel_layer.group_send)(
            f"user_orders_{instance.user_id}",
            {
                'type': 'order_status_changed',
                'order_id': instance.order_id,
                'old_status': old_status,
                'new_status': instance.status,
                'message': get_status_message(instance.status),
                'timestamp': timezone.now().isoformat()
            }
        )
        
        # Notify specific order subscribers
        async_to_sync(channel_layer.group_send)(
            f"order_{instance.order_id}",
            {
                'type': 'order_status_changed',
                'order_id': instance.order_id,
                'old_status': old_status,
                'new_status': instance.status,
                'message': get_status_message(instance.status),
                'timestamp': timezone.now().isoformat()
            }
        )
    
    # Notify seller
    async_to_sync(channel_layer.group_send)(
        f"store_orders_{instance.store_id}",
        {
            'type': 'order_update',
            'order': order_data,
            'message': f'Order {instance.order_id} updated',
            'timestamp': timezone.now().isoformat()
        }
    )
    
    # Notify rider if assigned
    if instance.rider_id:
        async_to_sync(channel_layer.group_send)(
            f"rider_orders_{instance.rider_id}",
            {
                'type': 'order_update',
                'order': order_data,
                'message': f'Order {instance.order_id} updated',
                'timestamp': timezone.now().isoformat()
            }
        )


def get_status_message(status):
    """Get user-friendly message for order status."""
    messages = {
        'pending': 'Order placed successfully',
        'confirmed': 'Order confirmed by store',
        'preparing': 'Your order is being prepared',
        'ready': 'Order is ready for pickup',
        'picked_up': 'Order picked up by delivery partner',
        'out_for_delivery': 'Order is out for delivery',
        'delivered': 'Order delivered successfully',
        'cancelled': 'Order has been cancelled',
    }
    return messages.get(status, f'Order status: {status}')
