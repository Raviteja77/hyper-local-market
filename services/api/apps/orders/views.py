from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from .models import Coupon
from .serializers import (
    CouponSerializer,
    CouponValidateSerializer,
    CouponValidateResponseSerializer
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
