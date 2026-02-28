from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Address

User = get_user_model()


class BuyerRegistrationSerializer(serializers.Serializer):
    """Serializer for buyer registration"""
    full_name = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(max_length=15)
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_phone(self, value):
        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError('A user with this phone number already exists.')
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value

    def create(self, validated_data):
        full_name = validated_data['full_name']
        name_parts = full_name.strip().split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        user = User.objects.create_user(
            username=validated_data['phone'],
            phone=validated_data['phone'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            role='buyer',
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'first_name', 'last_name', 'email', 'phone', 'role', 'avatar', 'is_phone_verified']
        read_only_fields = ['id', 'phone', 'role', 'is_phone_verified']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    name = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ['name', 'first_name', 'last_name', 'email', 'avatar']

    def update(self, instance, validated_data):
        name = validated_data.pop('name', None)
        if name:
            name_parts = name.strip().split(' ', 1)
            validated_data['first_name'] = name_parts[0]
            validated_data['last_name'] = name_parts[1] if len(name_parts) > 1 else ''
        return super().update(instance, validated_data)


class AddressSerializer(serializers.ModelSerializer):
    """Serializer for user addresses"""

    class Meta:
        model = Address
        fields = [
            'id', 'type', 'full_name', 'phone', 'address_line1', 'address_line2',
            'landmark', 'city', 'state', 'pincode', 'latitude', 'longitude',
            'is_default', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class SendOTPSerializer(serializers.Serializer):
    """Serializer for sending OTP"""
    phone = serializers.CharField(max_length=15)


class VerifyOTPSerializer(serializers.Serializer):
    """Serializer for verifying OTP"""
    phone = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)