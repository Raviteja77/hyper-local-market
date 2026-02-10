from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from django.db import transaction
from decimal import Decimal
from .models import Coupon, Order, OrderItem
from apps.products.models import Inventory
from apps.users.models import Address
from apps.stores.models import Store
from .serializers import (
    CouponSerializer,
    CouponValidateSerializer,
    CouponValidateResponseSerializer,
    OrderListSerializer,
    OrderDetailSerializer,
    OrderCreateSerializer,
    OrderCancelSerializer,
    OrderRatingSerializer,
    OrderStatusUpdateSerializer,
)


class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Coupon operations.
    
    list: Get all active coupons
    validate: Validate a coupon code
    """
    serializer_class = CouponSerializer
    permission_classes = [AllowAny]  # Public browsing
    
    def get_queryset(self):
        """Filter active and valid coupons"""
        now = timezone.now()
        return Coupon.objects.filter(
            is_active=True,
            valid_from__lte=now,
            valid_to__gte=now
        )
    
    @action(detail=False, methods=['post'])
    def validate(self, request):
        """
        Validate a coupon code and calculate discount.
        
        Request body:
        {
            "code": "SAVE30",
            "order_value": 150.00
        }
        
        Response:
        {
            "valid": true/false,
            "message": "Success/Error message",
            "discount": 30.00,
            "final_amount": 120.00,
            "coupon": {...}
        }
        """
        # Validate request data
        request_serializer = CouponValidateSerializer(data=request.data)
        if not request_serializer.is_valid():
            return Response(
                request_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        code = request_serializer.validated_data['code']
        order_value = request_serializer.validated_data['order_value']
        
        # Find coupon
        try:
            coupon = Coupon.objects.get(code__iexact=code)
        except Coupon.DoesNotExist:
            return Response(
                {
                    'valid': False,
                    'message': 'Invalid coupon code'
                },
                status=status.HTTP_200_OK
            )
        
        # Validate coupon
        is_valid, message = coupon.is_valid(order_value)
        
        if not is_valid:
            return Response(
                {
                    'valid': False,
                    'message': message
                },
                status=status.HTTP_200_OK
            )
        
        # Calculate discount
        discount = coupon.calculate_discount(order_value)
        final_amount = order_value - discount
        
        response_data = {
            'valid': True,
            'message': 'Coupon applied successfully',
            'discount': discount,
            'final_amount': final_amount,
            'coupon': CouponSerializer(coupon).data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Order operations.
    
    list: Get all orders for the authenticated user
    retrieve: Get order detail
    create: Create a new order
    cancel: Cancel an order
    rate: Rate and review an order
    update_status: Update order status (for sellers and riders)
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter orders based on user role"""
        user = self.request.user
        
        if user.role == 'buyer':
            return Order.objects.filter(user=user).select_related(
                'store', 'delivery_address', 'coupon'
            ).prefetch_related('items')
        elif user.role == 'seller':
            # Sellers see orders for their store
            if hasattr(user, 'store'):
                return Order.objects.filter(store=user.store).select_related(
                    'user', 'delivery_address', 'coupon'
                ).prefetch_related('items')
        elif user.role == 'rider':
            # Riders see their assigned deliveries
            return Order.objects.filter(rider=user).select_related(
                'store', 'delivery_address', 'user', 'coupon'
            ).prefetch_related('items')
        elif user.role == 'admin':
            # Admin sees all orders
            return Order.objects.all().select_related(
                'user', 'store', 'delivery_address', 'coupon'
            ).prefetch_related('items')
        
        return Order.objects.none()
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'create':
            return OrderCreateSerializer
        else:
            return OrderDetailSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new order"""
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        # Start database transaction
        with transaction.atomic():
            # Get validated data
            store_id = serializer.validated_data['store_id']
            delivery_address_id = serializer.validated_data['delivery_address_id']
            items_data = serializer.validated_data['items']
            payment_method = serializer.validated_data['payment_method']
            coupon_code = serializer.validated_data.get('coupon_code', '')
            delivery_instructions = serializer.validated_data.get('delivery_instructions', '')
            
            # Fetch related objects
            store = Store.objects.get(id=store_id)
            delivery_address = Address.objects.get(id=delivery_address_id)
            
            # Calculate order totals
            subtotal = Decimal('0.00')
            order_items = []
            
            for item_data in items_data:
                inventory = Inventory.objects.select_related('product').get(
                    store_id=store_id,
                    product_id=item_data['product_id']
                )
                
                # Calculate item price
                item_price = inventory.selling_price
                item_quantity = item_data['quantity']
                item_subtotal = item_price * item_quantity
                
                subtotal += item_subtotal
                
                order_items.append({
                    'product': inventory.product,
                    'price': item_price,
                    'quantity': item_quantity,
                    'subtotal': item_subtotal,
                    'inventory': inventory,
                })
            
            # Apply coupon if provided
            discount = Decimal('0.00')
            coupon = None
            if coupon_code:
                try:
                    coupon = Coupon.objects.get(code__iexact=coupon_code)
                    is_valid, message = coupon.is_valid(subtotal)
                    if is_valid:
                        discount = coupon.calculate_discount(subtotal)
                    else:
                        return Response(
                            {'error': f'Coupon validation failed: {message}'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                except Coupon.DoesNotExist:
                    return Response(
                        {'error': 'Invalid coupon code'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Calculate delivery fee (simplified - you can add distance-based logic)
            delivery_fee = Decimal('20.00') if subtotal < 200 else Decimal('0.00')
            
            # Calculate total
            total = subtotal + delivery_fee - discount
            
            # Create order
            order = Order.objects.create(
                user=request.user,
                store=store,
                delivery_address=delivery_address,
                status='pending',
                payment_method=payment_method,
                payment_status='pending',
                subtotal=subtotal,
                delivery_fee=delivery_fee,
                discount=discount,
                total=total,
                coupon=coupon,
                delivery_instructions=delivery_instructions,
            )
            
            # Create order items and update inventory
            for item in order_items:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    name=item['product'].name,
                    price=item['price'],
                    quantity=item['quantity'],
                    image=item['product'].image.url if item['product'].image else '',
                )
                
                # Update inventory
                inventory = item['inventory']
                inventory.stock_quantity -= item['quantity']
                if inventory.stock_quantity == 0:
                    inventory.in_stock = False
                inventory.save()
            
            # Update coupon usage if applied
            if coupon:
                coupon.usage_count += 1
                coupon.save()
            
            # Return created order
            response_serializer = OrderDetailSerializer(order)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order"""
        order = self.get_object()
        
        # Validate order can be cancelled
        if order.status in ['delivered', 'cancelled']:
            return Response(
                {'error': f'Cannot cancel order with status: {order.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate user permission
        user = request.user
        if user.role == 'buyer' and order.user != user:
            return Response(
                {'error': 'You can only cancel your own orders'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Validate cancellation reason
        serializer = OrderCancelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Cancel order
        with transaction.atomic():
            order.status = 'cancelled'
            order.cancellation_reason = serializer.validated_data['reason']
            order.cancelled_by = user.role
            order.cancelled_at = timezone.now()
            
            # Refund inventory
            for item in order.items.all():
                try:
                    inventory = Inventory.objects.get(
                        store=order.store,
                        product=item.product
                    )
                    inventory.stock_quantity += item.quantity
                    inventory.in_stock = True
                    inventory.save()
                except Inventory.DoesNotExist:
                    pass
            
            # Update payment status to refunded if paid
            if order.payment_status == 'completed':
                order.payment_status = 'refunded'
            
            order.save()
        
        response_serializer = OrderDetailSerializer(order)
        return Response(response_serializer.data)
    
    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        """Rate and review an order"""
        order = self.get_object()
        
        # Validate order belongs to user
        if order.user != request.user:
            return Response(
                {'error': 'You can only rate your own orders'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Validate order is delivered
        if order.status != 'delivered':
            return Response(
                {'error': 'Can only rate delivered orders'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate rating data
        serializer = OrderRatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Update order rating
        order.rating = serializer.validated_data['rating']
        order.review = serializer.validated_data.get('review', '')
        order.save()
        
        response_serializer = OrderDetailSerializer(order)
        return Response(response_serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update order status (for sellers and riders)"""
        order = self.get_object()
        user = request.user
        
        # Validate user permission
        if user.role == 'buyer':
            return Response(
                {'error': 'Buyers cannot update order status'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if user.role == 'seller' and order.store.owner != user:
            return Response(
                {'error': 'You can only update orders for your store'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if user.role == 'rider' and order.rider != user:
            return Response(
                {'error': 'You can only update your assigned orders'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Validate status data
        serializer = OrderStatusUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        new_status = serializer.validated_data['status']
        
        # Update status with timestamp
        order.status = new_status
        now = timezone.now()
        
        if new_status == 'confirmed':
            order.confirmed_at = now
        elif new_status == 'preparing':
            order.preparing_at = now
        elif new_status == 'ready':
            order.ready_at = now
        elif new_status == 'picked_up':
            order.picked_up_at = now
        elif new_status == 'out_for_delivery':
            # Could set estimated delivery time here
            pass
        elif new_status == 'delivered':
            order.delivered_at = now
            order.payment_status = 'completed'
        
        order.save()
        
        response_serializer = OrderDetailSerializer(order)
        return Response(response_serializer.data)
