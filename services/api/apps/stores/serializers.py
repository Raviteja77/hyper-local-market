from rest_framework import serializers
from .models import Store
from apps.products.models import Inventory
from apps.products.serializers import ProductSerializer
import math


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
            # Haversine formula to calculate distance
            R = 6371  # Earth's radius in kilometers
            
            lat1 = math.radians(float(user_lat))
            lon1 = math.radians(float(user_lon))
            lat2 = math.radians(float(obj.latitude))
            lon2 = math.radians(float(obj.longitude))
            
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            
            a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
            c = 2 * math.asin(math.sqrt(a))
            
            distance = R * c
            return round(distance, 2)
        
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
            # Haversine formula
            R = 6371
            
            lat1 = math.radians(float(user_lat))
            lon1 = math.radians(float(user_lon))
            lat2 = math.radians(float(obj.latitude))
            lon2 = math.radians(float(obj.longitude))
            
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            
            a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
            c = 2 * math.asin(math.sqrt(a))
            
            distance = R * c
            return round(distance, 2)
        
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
