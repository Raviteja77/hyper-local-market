from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from django.db import transaction
from datetime import datetime
from .models import Payment
from apps.orders.models import Order
from .serializers import (
    PaymentSerializer,
    PaymentCreateSerializer,
    PaymentCallbackSerializer,
)


class PaymentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Payment operations.
    
    list: Get all payments for the authenticated user
    retrieve: Get payment detail
    create: Initiate a payment
    callback: Handle payment gateway callback
    """
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer
    
    def get_queryset(self):
        """Filter payments for current user"""
        return Payment.objects.filter(user=self.request.user).select_related('order')
    
    def create(self, request, *args, **kwargs):
        """Initiate a new payment"""
        from .razorpay_client import razorpay_client
        
        serializer = PaymentCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        order_id = serializer.validated_data['order_id']
        payment_method = serializer.validated_data['payment_method']
        
        # Get order
        order = Order.objects.get(order_id=order_id, user=request.user)
        
        # Generate payment ID
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        payment_id = f"PAY{timestamp}{request.user.id}"
        
        # Create payment record
        with transaction.atomic():
            payment = Payment.objects.create(
                order=order,
                user=request.user,
                payment_id=payment_id,
                payment_method=payment_method,
                amount=order.total,
                status='pending',
            )
            
            # Update order with payment info
            order.payment_method = payment_method
            order.payment_id = payment_id
            order.save()
            
            # For COD, mark as processing (will be completed on delivery)
            if payment_method == 'cod':
                payment.status = 'processing'
                payment.save()
                
                response_data = PaymentSerializer(payment).data
                response_data['message'] = 'COD order created successfully'
                return Response(response_data, status=status.HTTP_201_CREATED)
            
            # For online payments, integrate with Razorpay
            if razorpay_client.is_configured():
                try:
                    # Create Razorpay order
                    razorpay_order = razorpay_client.create_order(
                        amount=float(order.total),
                        receipt=payment_id,
                        notes={
                            'order_id': order.order_id,
                            'user_id': str(request.user.id)
                        }
                    )
                    
                    # Store Razorpay order ID
                    payment.gateway_order_id = razorpay_order['id']
                    payment.save()
                    
                    response_data = PaymentSerializer(payment).data
                    response_data['razorpay_order_id'] = razorpay_order['id']
                    response_data['razorpay_key_id'] = razorpay_client.key_id
                    response_data['amount'] = razorpay_order['amount']
                    response_data['currency'] = razorpay_order['currency']
                    response_data['message'] = 'Payment initiated. Complete the payment using Razorpay.'
                    
                    return Response(response_data, status=status.HTTP_201_CREATED)
                except Exception as e:
                    # Rollback payment if Razorpay order creation fails
                    payment.status = 'failed'
                    payment.save()
                    return Response(
                        {'error': f'Failed to create payment: {str(e)}'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            else:
                # Razorpay not configured - return mock data for testing
                response_data = PaymentSerializer(payment).data
                response_data['gateway_order_id'] = f"order_{payment_id}"
                response_data['message'] = 'Payment initiated. Razorpay not configured - using test mode.'
                
                return Response(response_data, status=status.HTTP_201_CREATED)

    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def callback(self, request):
        """
        Handle payment gateway callback/webhook.
        
        This endpoint receives payment confirmation from the payment gateway.
        Signature verification is implemented for Razorpay payments.
        """
        from .razorpay_client import razorpay_client
        
        serializer = PaymentCallbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        payment_id = serializer.validated_data['payment_id']
        gateway_payment_id = serializer.validated_data['gateway_payment_id']
        gateway_order_id = serializer.validated_data['gateway_order_id']
        gateway_signature = serializer.validated_data.get('gateway_signature', '')
        callback_status = serializer.validated_data['status']
        
        try:
            payment = Payment.objects.select_related('order').get(payment_id=payment_id)
        except Payment.DoesNotExist:
            return Response(
                {'error': 'Payment not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Verify signature for Razorpay payments
        if razorpay_client.is_configured() and gateway_signature:
            is_valid = razorpay_client.verify_payment_signature(
                gateway_order_id,
                gateway_payment_id,
                gateway_signature
            )
            
            if not is_valid:
                return Response(
                    {'error': 'Invalid payment signature'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Update payment with gateway details
        with transaction.atomic():
            payment.gateway_payment_id = gateway_payment_id
            payment.gateway_order_id = gateway_order_id
            payment.gateway_signature = gateway_signature
            payment.status = callback_status
            
            if callback_status == 'completed':
                payment.completed_at = timezone.now()
                
                # Update order payment status
                order = payment.order
                order.payment_status = 'completed'
                order.status = 'confirmed'
                order.confirmed_at = timezone.now()
                order.save()
                
                # Send real-time update via WebSocket
                from channels.layers import get_channel_layer
                from asgiref.sync import async_to_sync
                
                channel_layer = get_channel_layer()
                if channel_layer:
                    # Notify user
                    async_to_sync(channel_layer.group_send)(
                        f"user_orders_{order.user_id}",
                        {
                            'type': 'order_status_changed',
                            'order_id': order.order_id,
                            'old_status': 'pending',
                            'new_status': 'confirmed',
                            'message': 'Payment successful! Order confirmed.',
                            'timestamp': timezone.now().isoformat()
                        }
                    )
                    
                    # Notify seller
                    async_to_sync(channel_layer.group_send)(
                        f"store_orders_{order.store_id}",
                        {
                            'type': 'order_update',
                            'order': {
                                'order_id': order.order_id,
                                'status': order.status,
                                'payment_status': order.payment_status
                            },
                            'message': 'New order received!',
                            'timestamp': timezone.now().isoformat()
                        }
                    )
                
            elif callback_status == 'failed':
                # Update order payment status
                order = payment.order
                order.payment_status = 'failed'
                order.save()
            
            payment.save()
        
        return Response(
            PaymentSerializer(payment).data,
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['get'])
    def status(self, request, pk=None):
        """Check payment status"""
        payment = self.get_object()
        return Response(PaymentSerializer(payment).data)