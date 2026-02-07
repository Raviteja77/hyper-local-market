from django.contrib import admin
from .models import Product, Inventory


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'mrp', 'unit', 'is_featured', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active', 'is_organic']
    search_fields = ['name', 'brand', 'barcode', 'sku']


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['product', 'store', 'price', 'stock_quantity', 'in_stock']
    list_filter = ['in_stock', 'store']
    search_fields = ['product__name', 'store__name']
