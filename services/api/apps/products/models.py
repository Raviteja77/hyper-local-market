from django.db import models
from apps.stores.models import Store


class Product(models.Model):
    """Product catalog"""
    
    CATEGORY_CHOICES = (
        ('vegetables', 'Vegetables'),
        ('fruits', 'Fruits'),
        ('dairy', 'Dairy'),
        ('bakery', 'Bakery'),
        ('beverages', 'Beverages'),
        ('snacks', 'Snacks'),
        ('grains', 'Grains'),
        ('oils', 'Oils'),
        ('spices', 'Spices'),
        ('personal_care', 'Personal Care'),
        ('household', 'Household'),
        ('other', 'Other'),
    )
    
    UNIT_CHOICES = (
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('l', 'Liter'),
        ('ml', 'Milliliter'),
        ('piece', 'Piece'),
        ('dozen', 'Dozen'),
        ('packet', 'Packet'),
    )
    
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    # Pricing
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Unit
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='piece')
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    
    # Media
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    
    # Metadata
    brand = models.CharField(max_length=100, blank=True)
    barcode = models.CharField(max_length=50, blank=True, unique=True, null=True)
    sku = models.CharField(max_length=50, blank=True, unique=True, null=True)
    
    # Tags
    is_organic = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    
    # Status
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products'
        ordering = ['-is_featured', '-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.quantity}{self.unit})"


class Inventory(models.Model):
    """Store-specific inventory and pricing"""
    
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='inventory')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory')
    
    # Stock
    in_stock = models.BooleanField(default=True)
    stock_quantity = models.IntegerField(default=0)
    low_stock_threshold = models.IntegerField(default=10)
    
    # Store-specific pricing (can override product MRP)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Calculated fields
    @property
    def selling_price(self):
        """Price after discount"""
        if self.discount_percentage > 0:
            return self.price * (1 - self.discount_percentage / 100)
        return self.price
    
    @property
    def is_low_stock(self):
        return self.stock_quantity <= self.low_stock_threshold
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'inventory'
        unique_together = ('store', 'product')
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.store.name} - {self.product.name}"
