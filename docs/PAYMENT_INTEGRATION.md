# Payment Gateway Integration Guide

## Overview

The Hyper Local Market platform supports multiple payment methods:

1. **Cash on Delivery (COD)** - No gateway required
2. **Razorpay** - Online payments (UPI, Cards, Wallets)
3. **Stripe** - International payments (optional)

This guide covers the integration of Razorpay payment gateway.

---

## Razorpay Integration

### Prerequisites

1. Razorpay account: https://razorpay.com
2. API Keys (Test/Live)
3. Webhook endpoint configured

### Step 1: Get API Credentials

1. Login to Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Generate/Copy your API keys:
   - **Key ID**: `rzp_test_xxxxx` (test) or `rzp_live_xxxxx` (production)
   - **Key Secret**: `xxxxx` (keep this secure!)

### Step 2: Backend Configuration

#### Set Environment Variables

```bash
# .env or docker-compose.yml
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

#### Verify Installation

The Razorpay Python SDK is already included in `requirements.txt`:

```txt
razorpay==1.4.2
```

#### Test Configuration

```python
# Python console or Django shell
from apps.payments.razorpay_client import razorpay_client

# Check if configured
if razorpay_client.is_configured():
    print("✅ Razorpay is configured")
else:
    print("❌ Razorpay not configured - set environment variables")
```

### Step 3: Frontend Configuration

#### Set Environment Variable

```bash
# services/web/.env.local
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

#### Load Razorpay SDK

The Razorpay checkout script is automatically loaded by the `RazorpayPayment` component.

---

## Payment Flow

### 1. Create Order

When a user wants to make a payment:

**Backend** (`POST /api/payments/`):

```python
# Create payment record
payment = Payment.objects.create(
    order=order,
    user=user,
    payment_method='online',  # or 'cod'
    amount=order.total,
    status='pending'
)

# Create Razorpay order
razorpay_order = razorpay_client.create_order(
    amount=float(order.total),
    receipt=payment.payment_id,
    notes={'order_id': order.order_id}
)

# Store gateway order ID
payment.gateway_order_id = razorpay_order['id']
payment.save()

# Return to frontend
return {
    'payment_id': payment.payment_id,
    'razorpay_order_id': razorpay_order['id'],
    'razorpay_key_id': razorpay_client.key_id,
    'amount': razorpay_order['amount'],
    'currency': razorpay_order['currency']
}
```

### 2. Show Payment UI

**Frontend**:

```tsx
import { RazorpayPaymentButton } from '@/lib/payment/RazorpayPayment';

function Checkout({ orderId, amount }) {
  const handleSuccess = () => {
    // Navigate to success page
    router.push(`/orders/${orderId}?payment=success`);
  };

  const handleFailure = (error) => {
    // Show error message
    console.error('Payment failed:', error);
  };

  return (
    <RazorpayPaymentButton
      orderId={orderId}
      amount={amount}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    >
      Pay ₹{amount}
    </RazorpayPaymentButton>
  );
}
```

### 3. Process Payment

When user completes payment in Razorpay UI:

1. Razorpay sends response with:
   - `razorpay_payment_id`
   - `razorpay_order_id`
   - `razorpay_signature`

2. Frontend automatically verifies signature:

```typescript
// Automatically done by RazorpayPaymentButton
const result = await paymentAPI.verifyPayment(
  razorpay_payment_id,
  razorpay_signature
);
```

3. Backend verifies and updates:

**Backend** (`POST /api/payments/callback/`):

```python
# Verify signature
is_valid = razorpay_client.verify_payment_signature(
    gateway_order_id,
    gateway_payment_id,
    gateway_signature
)

if is_valid:
    # Update payment status
    payment.status = 'completed'
    payment.completed_at = timezone.now()
    payment.save()
    
    # Update order
    order.payment_status = 'completed'
    order.status = 'confirmed'
    order.save()
    
    # Send WebSocket notification
    channel_layer.group_send(
        f"user_orders_{order.user_id}",
        {'type': 'order_status_changed', ...}
    )
```

---

## API Endpoints

### Create Payment Intent

**POST** `/api/payments/`

**Request:**
```json
{
  "order_id": "ORD20240210123456",
  "payment_method": "online"
}
```

**Response:**
```json
{
  "payment_id": "PAY20240210123456789",
  "razorpay_order_id": "order_xxxxx",
  "razorpay_key_id": "rzp_test_xxxxx",
  "amount": 29900,
  "currency": "INR",
  "message": "Payment initiated. Complete the payment using Razorpay."
}
```

### Payment Callback

**POST** `/api/payments/callback/`

**Request:**
```json
{
  "payment_id": "PAY20240210123456789",
  "gateway_payment_id": "pay_xxxxx",
  "gateway_order_id": "order_xxxxx",
  "gateway_signature": "xxxxx",
  "status": "completed"
}
```

**Response:**
```json
{
  "payment_id": "PAY20240210123456789",
  "status": "completed",
  "amount": "299.00",
  "completed_at": "2024-02-10T23:17:00Z"
}
```

### Get Payment Status

**GET** `/api/payments/{payment_id}/status/`

**Response:**
```json
{
  "payment_id": "PAY20240210123456789",
  "status": "completed",
  "payment_method": "online",
  "amount": "299.00"
}
```

---

## Webhooks

### Configure Webhook

1. Login to Razorpay Dashboard
2. Navigate to **Settings** → **Webhooks**
3. Add webhook URL: `https://yourdomain.com/api/payments/webhook/`
4. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
5. Save webhook secret

### Verify Webhook Signature

```python
# apps/payments/views.py

@csrf_exempt
def webhook(request):
    # Get webhook signature
    signature = request.headers.get('X-Razorpay-Signature')
    
    # Verify signature
    razorpay_client.utility.verify_webhook_signature(
        request.body,
        signature,
        settings.RAZORPAY_WEBHOOK_SECRET
    )
    
    # Process webhook
    data = json.loads(request.body)
    event = data['event']
    
    if event == 'payment.captured':
        # Handle successful payment
        payment_entity = data['payload']['payment']['entity']
        # Update database...
```

---

## Error Handling

### Common Errors

#### 1. Payment Failed

```javascript
{
  code: 'BAD_REQUEST_ERROR',
  description: 'Payment processing failed',
  reason: 'card_declined'
}
```

**Handling:**
```tsx
const handleFailure = (error) => {
  if (error.reason === 'card_declined') {
    toast.error('Card declined. Please try another card.');
  } else if (error.code === 'BAD_REQUEST_ERROR') {
    toast.error('Payment failed. Please try again.');
  } else {
    toast.error('Something went wrong. Please contact support.');
  }
};
```

#### 2. Signature Verification Failed

```json
{
  "error": "Invalid payment signature"
}
```

**Prevention:**
- Always verify signature on backend
- Never trust client-side data
- Log failed verifications for security monitoring

#### 3. Razorpay Not Configured

```json
{
  "error": "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables."
}
```

**Solution:**
- Set environment variables
- Restart server
- Verify with `razorpay_client.is_configured()`

---

## Testing

### Test Mode

Razorpay provides test credentials that don't process real payments.

**Test Cards:**

| Card Number | Type | Result |
|------------|------|--------|
| 4111 1111 1111 1111 | Visa | Success |
| 5555 5555 5555 4444 | Mastercard | Success |
| 4000 0000 0000 0002 | Visa | Failed |

**Test UPI IDs:**
- `success@razorpay` - Success
- `failure@razorpay` - Failed

### Manual Testing

1. Start backend: `python manage.py runserver`
2. Start frontend: `npm run dev`
3. Create an order
4. Click "Pay Now"
5. Use test card: 4111 1111 1111 1111
6. CVV: any 3 digits
7. Expiry: any future date
8. Verify payment success

### Automated Testing

```python
# tests/test_payments.py

def test_razorpay_payment_flow():
    # Create order
    order = Order.objects.create(...)
    
    # Create payment
    response = client.post('/api/payments/', {
        'order_id': order.order_id,
        'payment_method': 'online'
    })
    
    assert response.status_code == 201
    assert 'razorpay_order_id' in response.json()
    
    # Simulate callback
    callback_response = client.post('/api/payments/callback/', {
        'payment_id': response.json()['payment_id'],
        'gateway_payment_id': 'pay_test',
        'gateway_order_id': response.json()['razorpay_order_id'],
        'gateway_signature': 'test_signature',
        'status': 'completed'
    })
    
    assert callback_response.status_code == 200
```

---

## Security Best Practices

### 1. Secure API Keys

```bash
# ✅ DO: Use environment variables
export RAZORPAY_KEY_SECRET="secret_key"

# ❌ DON'T: Hardcode in code
RAZORPAY_KEY_SECRET = "secret_key"  # Never do this!
```

### 2. Verify Signatures

```python
# ✅ DO: Always verify signature
if razorpay_client.verify_payment_signature(...):
    # Process payment
    
# ❌ DON'T: Trust client data
# if payment_data['status'] == 'completed':  # Vulnerable!
```

### 3. HTTPS Only

```nginx
# ✅ DO: Enforce HTTPS
if ($scheme != "https") {
    return 301 https://$server_name$request_uri;
}

# Configure SSL
ssl_certificate /etc/ssl/cert.pem;
ssl_certificate_key /etc/ssl/key.pem;
```

### 4. Rate Limiting

```python
# ✅ DO: Implement rate limiting
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie

@method_decorator(throttle_classes=[UserRateThrottle])
class PaymentViewSet(viewsets.ModelViewSet):
    ...
```

### 5. Logging

```python
# ✅ DO: Log all payment events
import logging
logger = logging.getLogger(__name__)

logger.info(f"Payment initiated: {payment_id}")
logger.info(f"Payment completed: {payment_id}")
logger.error(f"Payment failed: {payment_id}, reason: {error}")
```

---

## Refunds

### Process Refund

```python
# Full refund
refund = razorpay_client.refund_payment(
    payment_id='pay_xxxxx'
)

# Partial refund
refund = razorpay_client.refund_payment(
    payment_id='pay_xxxxx',
    amount=100.00,  # Refund ₹100
    notes={'reason': 'Product damaged'}
)
```

### Refund API

**POST** `/api/payments/{payment_id}/refund/`

```json
{
  "amount": 100.00,
  "reason": "Product damaged"
}
```

---

## Going Live

### Checklist

- [ ] Obtain live API keys from Razorpay
- [ ] Update environment variables
- [ ] Configure webhook with live URL
- [ ] Enable live mode in Razorpay dashboard
- [ ] Test with small amount
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring and alerts
- [ ] Review security settings
- [ ] Update terms and conditions
- [ ] Test refund flow

### Environment Variables (Production)

```bash
# Production keys
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=live_secret_key
RAZORPAY_WEBHOOK_SECRET=webhook_secret

# Frontend
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

---

## Monitoring

### Key Metrics

1. **Payment Success Rate**: `(successful_payments / total_attempts) * 100`
2. **Average Payment Time**: Time from initiate to complete
3. **Failed Payment Reasons**: Track common failure reasons
4. **Refund Rate**: `(refunds / completed_payments) * 100`

### Dashboard Queries

```python
# Payment success rate
total = Payment.objects.count()
successful = Payment.objects.filter(status='completed').count()
success_rate = (successful / total) * 100

# Failed payments by reason
failed_payments = Payment.objects.filter(status='failed').values('gateway_response').annotate(count=Count('id'))
```

---

## Troubleshooting

### Payment Not Processing

1. Check Razorpay API keys
2. Verify environment variables
3. Check server logs
4. Test with Razorpay test mode
5. Verify webhook configuration

### Signature Verification Fails

1. Check if using correct key secret
2. Verify payload format
3. Check for URL encoding issues
4. Test with Razorpay's verification tool

### WebSocket Not Updating

1. Verify WebSocket connection
2. Check channel layer configuration
3. Test with Redis CLI
4. Review backend logs

---

## Support

- **Razorpay Documentation**: https://razorpay.com/docs/
- **Razorpay Support**: support@razorpay.com
- **Integration Help**: developers@razorpay.com

---

*Last Updated: 2024-02-10*
