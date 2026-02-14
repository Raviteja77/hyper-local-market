"""
WebSocket URL routing configuration.
"""
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/orders/', consumers.OrderTrackingConsumer.as_asgi()),
    path('ws/notifications/', consumers.NotificationConsumer.as_asgi()),
]
