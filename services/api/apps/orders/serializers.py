from rest_framework import serializers
from .models import Coupon, Order, OrderItem
from apps.products.models import Product, Inventory
from apps.users.models import Address
from apps.stores.models import Store
from django.utils import timezone
from decimal import Decimal


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


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for order items"""
    product_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'name', 'price', 'quantity', 'subtotal', 'image']
        read_only_fields = ['id', 'name', 'price', 'subtotal', 'image']


class OrderListSerializer(serializers.ModelSerializer):
    """Serializer for order list"""
    store_name = serializers.CharField(source='store.name', read_only=True)
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'store_name', 'status', 'payment_status',
            'total', 'items_count', 'created_at', 'estimated_delivery_time'
        ]
    
    def get_items_count(self, obj):
        return obj.items.count()


class OrderDetailSerializer(serializers.ModelSerializer):
    """Serializer for order detail"""
    items = OrderItemSerializer(many=True, read_only=True)
    store_name = serializers.CharField(source='store.name', read_only=True)
    store_phone = serializers.CharField(source='store.phone', read_only=True)
    store_address = serializers.SerializerMethodField()
    delivery_address_detail = serializers.SerializerMethodField()
    coupon_code = serializers.CharField(source='coupon.code', read_only=True, allow_null=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'store_name', 'store_phone', 'store_address',
            'status', 'payment_method', 'payment_status', 'payment_id',
            'subtotal', 'delivery_fee', 'discount', 'total',
            'coupon_code', 'delivery_address_detail', 'delivery_instructions',
            'estimated_delivery_time', 'rating', 'review',
            'cancellation_reason', 'cancelled_by',
            'items', 'created_at', 'updated_at', 'confirmed_at',
            'preparing_at', 'ready_at', 'picked_up_at', 'delivered_at', 'cancelled_at'
        ]
    
    def get_store_address(self, obj):
        store = obj.store
        return f"{store.address_line1}, {store.city}"
    
    def get_delivery_address_detail(self, obj):
        if obj.delivery_address:
            addr = obj.delivery_address
            return {
                'full_name': addr.full_name,
                'phone': addr.phone,
                'address': f"{addr.address_line1}, {addr.address_line2 or ''}, {addr.city}",
                'landmark': addr.landmark,
            }
        return None


class OrderCreateSerializer(serializers.Serializer):
    """Serializer for creating an order"""
    store_id = serializers.IntegerField()
    delivery_address_id = serializers.IntegerField()
    items = serializers.ListField(
        child=serializers.DictField(child=serializers.IntegerField()),
        write_only=True
    )
    payment_method = serializers.ChoiceField(choices=Order.PAYMENT_METHOD_CHOICES)
    coupon_code = serializers.CharField(required=False, allow_blank=True)
    delivery_instructions = serializers.CharField(required=False, allow_blank=True)
    
    def validate_store_id(self, value):
        """Validate store exists and is active"""
        try:
            store = Store.objects.get(id=value)
            if not store.is_verified or not store.is_active:
                raise serializers.ValidationError("Store is not available")
            return value
        except Store.DoesNotExist:
            raise serializers.ValidationError("Store not found")
    
    def validate_delivery_address_id(self, value):
        """Validate address belongs to user"""
        user = self.context['request'].user
        try:
            Address.objects.get(id=value, user=user)
            return value
        except Address.DoesNotExist:
            raise serializers.ValidationError("Address not found")
    
    def validate_items(self, value):
        """Validate items list"""
        if not value:
            raise serializers.ValidationError("Order must have at least one item")
        
        for item in value:
            if 'product_id' not in item or 'quantity' not in item:
                raise serializers.ValidationError("Each item must have product_id and quantity")
            if item['quantity'] <= 0:
                raise serializers.ValidationError("Quantity must be greater than 0")
        
        return value
    
    def validate(self, data):
        """Cross-field validation"""
        store_id = data['store_id']
        items = data['items']
        
        # Validate all products are available in the store
        for item in items:
            try:
                inventory = Inventory.objects.select_related('product').get(
                    store_id=store_id,
                    product_id=item['product_id']
                )
                if not inventory.in_stock:
                    raise serializers.ValidationError(
                        f"Product '{inventory.product.name}' is out of stock"
                    )
                if inventory.stock_quantity < item['quantity']:
                    raise serializers.ValidationError(
                        f"Product '{inventory.product.name}' has insufficient stock. Available: {inventory.stock_quantity}"
                    )
            except Inventory.DoesNotExist:
                raise serializers.ValidationError(
                    f"Product with ID {item['product_id']} not available at this store"
                )
        
        return data


class OrderCancelSerializer(serializers.Serializer):
    """Serializer for cancelling an order"""
    reason = serializers.CharField(required=True, max_length=500)
    
    def validate_reason(self, value):
        if not value.strip():
            raise serializers.ValidationError("Cancellation reason is required")
        return value


class OrderRatingSerializer(serializers.Serializer):
    """Serializer for rating an order"""
    rating = serializers.IntegerField(min_value=1, max_value=5)
    review = serializers.CharField(required=False, allow_blank=True, max_length=1000)


class OrderStatusUpdateSerializer(serializers.Serializer):
    """Serializer for updating order status"""
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)
