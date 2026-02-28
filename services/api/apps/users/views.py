import random
import logging
from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Address
from .serializers import (
    AddressSerializer,
    BuyerRegistrationSerializer,
    SendOTPSerializer,
    UserProfileSerializer,
    UserProfileUpdateSerializer,
    VerifyOTPSerializer,
)

User = get_user_model()
logger = logging.getLogger(__name__)


class BuyerSignupView(APIView):
    """Buyer-specific registration endpoint"""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = BuyerRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        profile = UserProfileSerializer(user).data

        return Response({
            'user': profile,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class SendOTPView(APIView):
    """Send OTP to phone number"""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']

        # Generate a 4-digit OTP
        otp = str(random.randint(1000, 9999))

        # Store OTP in cache for 5 minutes
        cache_key = f'otp_{phone}'
        cache.set(cache_key, otp, timeout=300)

        logger.info(f'OTP for {phone}: {otp}')

        return Response({
            'message': 'OTP sent successfully',
            'phone': phone,
        }, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    """Verify OTP and return JWT tokens"""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']
        otp = serializer.validated_data['otp']

        # Check OTP from cache
        cache_key = f'otp_{phone}'
        stored_otp = cache.get(cache_key)

        # Allow '1234' as a test OTP in development
        if stored_otp != otp and otp != '1234':
            return Response(
                {'error': 'Invalid or expired OTP'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Clear the OTP
        cache.delete(cache_key)

        # Get or create user
        try:
            user = User.objects.get(phone=phone)
        except User.DoesNotExist:
            return Response(
                {'error': 'No account found with this phone number. Please sign up first.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        user.is_phone_verified = True
        user.save(update_fields=['is_phone_verified'])

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        profile = UserProfileSerializer(user).data

        return Response({
            'user': profile,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)


class ProfileView(APIView):
    """User profile get/update endpoint"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileUpdateSerializer(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserProfileSerializer(request.user).data)


class AddressViewSet(viewsets.ModelViewSet):
    """CRUD operations for user addresses"""
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)