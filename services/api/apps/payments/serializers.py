from rest_framework import serializers
from .models import Payment
from apps.orders.models import Order


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for payment detail"""
    order_id = serializers.CharField(source='order.order_id', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_id', 'order_id', 'payment_method', 'status',
            'amount', 'currency', 'gateway_payment_id', 'gateway_order_id',
            'created_at', 'completed_at', 'refund_amount', 'refunded_at'
        ]
        read_only_fields = ['id', 'payment_id', 'created_at']


class PaymentCreateSerializer(serializers.Serializer):
    """Serializer for creating a payment"""
    order_id = serializers.CharField()
    payment_method = serializers.ChoiceField(choices=Payment.METHOD_CHOICES)
    
    def validate_order_id(self, value):
        """Validate order exists and belongs to user"""
        try:
            user = self.context['request'].user
            order = Order.objects.get(order_id=value, user=user)
            
            # Check if order already has a payment
            if hasattr(order, 'payment_detail'):
                raise serializers.ValidationError("Payment already exists for this order")
            
            # Check order status
            if order.status == 'cancelled':
                raise serializers.ValidationError("Cannot create payment for cancelled order")
            
            return value
        except Order.DoesNotExist:
            raise serializers.ValidationError("Order not found")


class PaymentCallbackSerializer(serializers.Serializer):
    """Serializer for payment gateway callback"""
    payment_id = serializers.CharField()
    gateway_payment_id = serializers.CharField()
    gateway_order_id = serializers.CharField()
    gateway_signature = serializers.CharField(required=False)
    status = serializers.ChoiceField(
        choices=['completed', 'failed'],
        default='completed'
    )