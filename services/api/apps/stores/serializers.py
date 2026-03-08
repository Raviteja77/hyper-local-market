from rest_framework import serializers
from .models import Store
from apps.products.models import Inventory
from apps.products.serializers import ProductSerializer
from core.utils import calculate_distance


class StoreSerializer(serializers.ModelSerializer):
    """Serializer for store list"""
    distance = serializers.SerializerMethodField()
    
    class Meta:
        model = Store
        fields = [
            'id', 'name', 'description', 'phone', 'email',
            'address_line1', 'address_line2', 'landmark', 'city', 
            'state', 'pincode', 'latitude', 'longitude',
            'is_active', 'is_verified', 'rating', 'total_reviews',
            'image', 'distance'
        ]
    
    def get_distance(self, obj):
        """Calculate distance from user location"""
        user_lat = self.context.get('user_lat')
        user_lon = self.context.get('user_lon')
        
        if user_lat and user_lon:
            return calculate_distance(user_lat, user_lon, obj.latitude, obj.longitude)
        
        return None


class StoreDetailSerializer(serializers.ModelSerializer):
    """Serializer for store detail"""
    distance = serializers.SerializerMethodField()
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    
    class Meta:
        model = Store
        fields = [
            'id', 'name', 'description', 'phone', 'email',
            'address_line1', 'address_line2', 'landmark', 'city', 
            'state', 'pincode', 'latitude', 'longitude',
            'is_active', 'is_verified', 'rating', 'total_reviews',
            'image', 'distance', 'owner_name', 'created_at', 'updated_at'
        ]
    
    def get_distance(self, obj):
        """Calculate distance from user location"""
        user_lat = self.context.get('user_lat')
        user_lon = self.context.get('user_lon')
        
        if user_lat and user_lon:
            return calculate_distance(user_lat, user_lon, obj.latitude, obj.longitude)
        
        return None


class StoreInventorySerializer(serializers.ModelSerializer):
    """Serializer for store inventory"""
    product = ProductSerializer(read_only=True)
    selling_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_low_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Inventory
        fields = [
            'id', 'product', 'in_stock', 'stock_quantity',
            'price', 'discount_percentage', 'selling_price', 
            'is_low_stock', 'updated_at'
        ]
