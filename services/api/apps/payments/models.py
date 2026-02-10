from django.db import models
from apps.orders.models import Order
from apps.users.models import User


class Payment(models.Model):
    """Payment transactions"""
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    )
    
    METHOD_CHOICES = (
        ('cod', 'Cash on Delivery'),
        ('upi', 'UPI'),
        ('card', 'Card'),
        ('wallet', 'Wallet'),
    )
    
    # Relations
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment_detail')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    
    # Payment details
    payment_id = models.CharField(max_length=100, unique=True, db_index=True)
    payment_method = models.CharField(max_length=10, choices=METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Amount
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    
    # Gateway details (for online payments)
    gateway_payment_id = models.CharField(max_length=100, blank=True)
    gateway_order_id = models.CharField(max_length=100, blank=True)
    gateway_signature = models.CharField(max_length=200, blank=True)
    gateway_response = models.JSONField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Refund
    refund_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    refund_reason = models.TextField(blank=True)
    refunded_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.payment_id} - {self.order.order_id}"