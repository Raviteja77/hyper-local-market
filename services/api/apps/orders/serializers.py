from rest_framework import serializers
from .models import Coupon
from django.utils import timezone


class CouponSerializer(serializers.ModelSerializer):
    """Serializer for coupon list"""
    
    class Meta:
        model = Coupon
        fields = [
            'id', 'code', 'description', 'discount_percentage',
            'discount_amount', 'min_order_value', 'max_discount',
            'valid_from', 'valid_to', 'usage_limit', 'usage_count',
            'is_active'
        ]


class CouponValidateSerializer(serializers.Serializer):
    """Serializer for coupon validation request"""
    code = serializers.CharField(required=True, max_length=20)
    order_value = serializers.DecimalField(required=True, max_digits=10, decimal_places=2)
    
    def validate_order_value(self, value):
        """Validate order value is positive"""
        if value <= 0:
            raise serializers.ValidationError("Order value must be greater than 0")
        return value


class CouponValidateResponseSerializer(serializers.Serializer):
    """Serializer for coupon validation response"""
    valid = serializers.BooleanField()
    message = serializers.CharField()
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    final_amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    coupon = CouponSerializer(required=False)
