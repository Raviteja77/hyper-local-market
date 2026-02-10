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
            
            # For online payments, return payment gateway details
            # In a real implementation, you would integrate with Razorpay/Stripe here
            response_data = PaymentSerializer(payment).data
            response_data['gateway_order_id'] = f"order_{payment_id}"
            response_data['message'] = 'Payment initiated. Complete the payment using the gateway.'
            
            return Response(response_data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def callback(self, request):
        """
        Handle payment gateway callback/webhook.
        
        This endpoint receives payment confirmation from the payment gateway.
        In production, you should verify the signature/authenticity of the callback.
        """
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