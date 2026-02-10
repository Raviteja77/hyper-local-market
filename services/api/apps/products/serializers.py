from rest_framework import serializers
from .models import Product, Inventory


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for product list"""
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category', 'mrp', 
            'unit', 'quantity', 'image', 'brand', 'is_organic', 
            'is_featured', 'is_active'
        ]


class InventorySerializer(serializers.ModelSerializer):
    """Serializer for inventory data"""
    selling_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_low_stock = serializers.BooleanField(read_only=True)
    store_name = serializers.CharField(source='store.name', read_only=True)
    
    class Meta:
        model = Inventory
        fields = [
            'id', 'store', 'store_name', 'in_stock', 'stock_quantity',
            'price', 'discount_percentage', 'selling_price', 'is_low_stock'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Serializer for product detail with inventory"""
    inventory = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category', 'mrp', 
            'unit', 'quantity', 'image', 'brand', 'barcode', 'sku',
            'is_organic', 'is_featured', 'is_active', 
            'created_at', 'updated_at', 'inventory'
        ]
    
    def get_inventory(self, obj):
        """Get inventory for all stores or nearest store"""
        store_id = self.context.get('store_id')
        if store_id:
            inventory = obj.inventory.filter(store_id=store_id, in_stock=True).first()
            if inventory:
                return InventorySerializer(inventory).data
        else:
            # Return all inventory for this product
            inventory = obj.inventory.filter(in_stock=True)
            return InventorySerializer(inventory, many=True).data
        return None


class CategorySerializer(serializers.Serializer):
    """Serializer for product categories"""
    value = serializers.CharField()
    label = serializers.CharField()
