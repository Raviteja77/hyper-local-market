from django.db import models
from apps.users.models import User


class Store(models.Model):
    """Store/Seller model"""
    
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='store')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Contact
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    
    # Address
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    landmark = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    
    # Geolocation for nearby search
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    # Business
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    
    # Store image
    image = models.ImageField(upload_to='stores/', null=True, blank=True)
    
    # Ratings
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_reviews = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'stores'
        ordering = ['-rating', '-created_at']
    
    def __str__(self):
        return self.name
