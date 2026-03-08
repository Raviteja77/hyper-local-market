"""
Razorpay payment gateway integration.
"""
import os
import razorpay
from django.conf import settings


class RazorpayClient:
    """
    Razorpay payment gateway client.
    
    Handles payment creation, verification, and refunds.
    """
    
    def __init__(self):
        """Initialize Razorpay client with API credentials."""
        self.key_id = os.environ.get('RAZORPAY_KEY_ID', '')
        self.key_secret = os.environ.get('RAZORPAY_KEY_SECRET', '')
        
        if self.key_id and self.key_secret:
            self.client = razorpay.Client(auth=(self.key_id, self.key_secret))
        else:
            self.client = None
    
    def is_configured(self):
        """Check if Razorpay is properly configured."""
        return self.client is not None
    
    def create_order(self, amount, currency='INR', receipt=None, notes=None):
        """
        Create a Razorpay order.
        
        Args:
            amount: Amount in smallest currency unit (paise for INR)
            currency: Currency code (default: INR)
            receipt: Receipt ID for reference
            notes: Additional notes dictionary
        
        Returns:
            dict: Razorpay order details
        """
        if not self.is_configured():
            raise Exception('Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.')
        
        data = {
            'amount': int(amount * 100),  # Convert to paise
            'currency': currency,
        }
        
        if receipt:
            data['receipt'] = receipt
        if notes:
            data['notes'] = notes
        
        try:
            order = self.client.order.create(data=data)
            return order
        except Exception as e:
            raise Exception(f'Failed to create Razorpay order: {str(e)}')
    
    def verify_payment_signature(self, order_id, payment_id, signature):
        """
        Verify Razorpay payment signature.
        
        Args:
            order_id: Razorpay order ID
            payment_id: Razorpay payment ID
            signature: Payment signature from callback
        
        Returns:
            bool: True if signature is valid
        """
        if not self.is_configured():
            return False
        
        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        
        try:
            self.client.utility.verify_payment_signature(params_dict)
            return True
        except razorpay.errors.SignatureVerificationError:
            return False
    
    def fetch_payment(self, payment_id):
        """
        Fetch payment details from Razorpay.
        
        Args:
            payment_id: Razorpay payment ID
        
        Returns:
            dict: Payment details
        """
        if not self.is_configured():
            raise Exception('Razorpay is not configured.')
        
        try:
            payment = self.client.payment.fetch(payment_id)
            return payment
        except Exception as e:
            raise Exception(f'Failed to fetch payment: {str(e)}')
    
    def capture_payment(self, payment_id, amount):
        """
        Capture a payment.
        
        Args:
            payment_id: Razorpay payment ID
            amount: Amount to capture in smallest currency unit
        
        Returns:
            dict: Captured payment details
        """
        if not self.is_configured():
            raise Exception('Razorpay is not configured.')
        
        try:
            payment = self.client.payment.capture(payment_id, int(amount * 100))
            return payment
        except Exception as e:
            raise Exception(f'Failed to capture payment: {str(e)}')
    
    def refund_payment(self, payment_id, amount=None, notes=None):
        """
        Refund a payment.
        
        Args:
            payment_id: Razorpay payment ID
            amount: Amount to refund (None for full refund)
            notes: Additional notes dictionary
        
        Returns:
            dict: Refund details
        """
        if not self.is_configured():
            raise Exception('Razorpay is not configured.')
        
        data = {}
        if amount:
            data['amount'] = int(amount * 100)
        if notes:
            data['notes'] = notes
        
        try:
            refund = self.client.payment.refund(payment_id, data)
            return refund
        except Exception as e:
            raise Exception(f'Failed to refund payment: {str(e)}')


# Singleton instance
razorpay_client = RazorpayClient()
