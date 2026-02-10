# Phase 3 API Documentation - Order Management & Payment

This document provides comprehensive documentation for the Phase 3 APIs implemented in the hyper-local market application.

## Overview

Phase 3 implements two main API sets:
1. **Orders API** - Complete order lifecycle management
2. **Payments API** - Payment processing and tracking

All endpoints require JWT authentication (except payment callback webhook).

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer <access_token>
```

### Get Access Token

```bash
POST /api/auth/token/
{
  "username": "buyer1",
  "password": "test123"
}

Response:
{
  "access": "eyJhbGc...",
  "refresh": "eyJhbGc..."
}
```

---

## Orders API

Base URL: `/api/orders/`

### 1. List Orders

**Endpoint:** `GET /api/orders/`

**Description:** Returns a paginated list of orders for the authenticated user.

**Authorization:** Required (Bearer token)

**User Access:**
- **Buyers:** See their own orders
- **Sellers:** See orders for their store
- **Riders:** See their assigned deliveries
- **Admin:** See all orders

**Query Parameters:**
- `page` (optional) - Page number for pagination
- `page_size` (optional) - Number of results per page

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/orders/ \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "count": 10,
  "next": "http://localhost:8000/api/orders/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "order_id": "ORD202602100157101",
      "store_name": "Sharma Kirana Store",
      "status": "pending",
      "payment_status": "pending",
      "total": "134.00",
      "items_count": 2,
      "created_at": "2026-02-10T01:57:10.935951Z",
      "estimated_delivery_time": null
    }
  ]
}
```

---

### 2. Create Order

**Endpoint:** `POST /api/orders/`

**Description:** Creates a new order with the specified items.

**Authorization:** Required (Buyer only)

**Request Body:**
```json
{
  "store_id": 1,
  "delivery_address_id": 1,
  "payment_method": "cod",
  "items": [
    {"product_id": 1, "quantity": 2},
    {"product_id": 8, "quantity": 1}
  ],
  "coupon_code": "SAVE30",
  "delivery_instructions": "Please call before delivery"
}
```

**Field Descriptions:**
- `store_id` (required) - ID of the store
- `delivery_address_id` (required) - ID of user's delivery address
- `payment_method` (required) - Payment method: `cod`, `upi`, `card`, `wallet`
- `items` (required) - Array of items with `product_id` and `quantity`
- `coupon_code` (optional) - Discount coupon code
- `delivery_instructions` (optional) - Special delivery instructions

**Validations:**
- Store must be active and verified
- Address must belong to the user
- All products must be available at the store
- Sufficient stock must be available
- Coupon must be valid (if provided)

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/orders/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "store_id": 1,
    "delivery_address_id": 1,
    "payment_method": "cod",
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 8, "quantity": 1}
    ],
    "coupon_code": "SAVE30"
  }'
```

**Example Response:**
```json
{
  "id": 1,
  "order_id": "ORD202602100157101",
  "store_name": "Sharma Kirana Store",
  "store_phone": "+919876543212",
  "store_address": "789 Commercial Street, Bengaluru",
  "status": "pending",
  "payment_method": "cod",
  "payment_status": "pending",
  "subtotal": "144.00",
  "delivery_fee": "20.00",
  "discount": "30.00",
  "total": "134.00",
  "coupon_code": "SAVE30",
  "delivery_address_detail": {
    "full_name": "buyer1",
    "phone": "+919876543210",
    "address": "123 MG Road, Bengaluru",
    "landmark": "Near Metro Station"
  },
  "items": [
    {
      "id": 1,
      "name": "Tomato",
      "price": "45.00",
      "quantity": 2,
      "subtotal": "90.00"
    }
  ],
  "created_at": "2026-02-10T01:57:10.935951Z"
}
```

**Order Calculation Logic:**
1. Calculate subtotal from items (price × quantity for each item)
2. Apply delivery fee (₹20 if subtotal < ₹200, else ₹0)
3. Apply coupon discount (if valid)
4. Calculate total: `subtotal + delivery_fee - discount`
5. Update inventory (reduce stock quantities)
6. Increment coupon usage count (if applied)

---

### 3. Get Order Detail

**Endpoint:** `GET /api/orders/{id}/`

**Description:** Returns detailed information about a specific order.

**Authorization:** Required (Order owner, store owner, assigned rider, or admin)

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/orders/1/ \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "id": 1,
  "order_id": "ORD202602100157101",
  "store_name": "Sharma Kirana Store",
  "store_phone": "+919876543212",
  "store_address": "789 Commercial Street, Bengaluru",
  "status": "confirmed",
  "payment_method": "cod",
  "payment_status": "pending",
  "payment_id": "PAY202602100157231",
  "subtotal": "144.00",
  "delivery_fee": "20.00",
  "discount": "30.00",
  "total": "134.00",
  "coupon_code": "SAVE30",
  "delivery_address_detail": {
    "full_name": "buyer1",
    "phone": "+919876543210",
    "address": "123 MG Road, Bengaluru",
    "landmark": "Near Metro Station"
  },
  "delivery_instructions": "Please call before delivery",
  "estimated_delivery_time": null,
  "rating": null,
  "review": "",
  "cancellation_reason": "",
  "cancelled_by": "",
  "items": [
    {
      "id": 1,
      "name": "Tomato",
      "price": "45.00",
      "quantity": 2,
      "subtotal": "90.00",
      "image": ""
    }
  ],
  "created_at": "2026-02-10T01:57:10.935951Z",
  "updated_at": "2026-02-10T01:58:00.123456Z",
  "confirmed_at": "2026-02-10T01:58:00.123456Z",
  "preparing_at": null,
  "ready_at": null,
  "picked_up_at": null,
  "delivered_at": null,
  "cancelled_at": null
}
```

---

### 4. Cancel Order

**Endpoint:** `POST /api/orders/{id}/cancel/`

**Description:** Cancels an order and refunds inventory.

**Authorization:** Required (Order owner, store owner, or admin)

**Request Body:**
```json
{
  "reason": "Changed my mind"
}
```

**Validations:**
- Order cannot be cancelled if already delivered or cancelled
- Cancellation reason is required

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/orders/1/cancel/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"reason": "Changed my mind"}'
```

**Example Response:**
```json
{
  "id": 1,
  "order_id": "ORD202602100157101",
  "status": "cancelled",
  "payment_status": "refunded",
  "cancellation_reason": "Changed my mind",
  "cancelled_by": "buyer",
  "cancelled_at": "2026-02-10T02:00:00.123456Z"
}
```

**Cancellation Logic:**
1. Update order status to `cancelled`
2. Record cancellation reason and who cancelled (buyer/seller/rider)
3. Refund inventory (add quantities back to stock)
4. Mark products as in_stock if they were out of stock
5. Update payment status to `refunded` if payment was completed

---

### 5. Rate Order

**Endpoint:** `POST /api/orders/{id}/rate/`

**Description:** Rate and review a delivered order.

**Authorization:** Required (Order owner only)

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great service and fresh products!"
}
```

**Field Descriptions:**
- `rating` (required) - Rating from 1 to 5
- `review` (optional) - Text review (max 1000 characters)

**Validations:**
- Only delivered orders can be rated
- Rating must be between 1 and 5

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/orders/1/rate/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "rating": 5,
    "review": "Great service!"
  }'
```

**Example Response:**
```json
{
  "id": 1,
  "order_id": "ORD202602100157101",
  "status": "delivered",
  "rating": 5,
  "review": "Great service!",
  "delivered_at": "2026-02-10T03:00:00.123456Z"
}
```

---

### 6. Update Order Status

**Endpoint:** `PATCH /api/orders/{id}/update_status/`

**Description:** Update order status through the lifecycle.

**Authorization:** Required (Seller or Rider only)

**User Access:**
- **Sellers:** Can update orders for their store
- **Riders:** Can update their assigned orders
- **Buyers:** Cannot update order status

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Status Flow:**
```
pending → confirmed → preparing → ready → picked_up → 
out_for_delivery → delivered
                                    ↓
                                cancelled
```

**Status Descriptions:**
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Seller confirmed the order
- `preparing` - Items being prepared
- `ready` - Order ready for pickup
- `picked_up` - Rider picked up the order
- `out_for_delivery` - Order is on the way
- `delivered` - Order delivered to customer
- `cancelled` - Order cancelled

**Example Request:**
```bash
curl -X PATCH http://localhost:8000/api/orders/1/update_status/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seller_token>" \
  -d '{"status": "confirmed"}'
```

**Example Response:**
```json
{
  "id": 1,
  "order_id": "ORD202602100157101",
  "status": "confirmed",
  "confirmed_at": "2026-02-10T01:58:00.123456Z"
}
```

**Status Update Logic:**
- Each status transition records a timestamp
- When status changes to `delivered`:
  - Sets `delivered_at` timestamp
  - Updates payment status to `completed` (for COD)

---

## Payments API

Base URL: `/api/payments/`

### 1. Create Payment

**Endpoint:** `POST /api/payments/`

**Description:** Initiates a payment for an order.

**Authorization:** Required (Order owner only)

**Request Body:**
```json
{
  "order_id": "ORD202602100157101",
  "payment_method": "upi"
}
```

**Field Descriptions:**
- `order_id` (required) - Order ID to create payment for
- `payment_method` (required) - Payment method: `cod`, `upi`, `card`, `wallet`

**Validations:**
- Order must exist and belong to the user
- Order cannot already have a payment
- Order cannot be cancelled

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/payments/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "order_id": "ORD202602100157101",
    "payment_method": "upi"
  }'
```

**Example Response (COD):**
```json
{
  "id": 1,
  "payment_id": "PAY202602100157231",
  "order_id": "ORD202602100157101",
  "payment_method": "cod",
  "status": "processing",
  "amount": "134.00",
  "currency": "INR",
  "created_at": "2026-02-10T01:57:23.042394Z",
  "message": "COD order created successfully"
}
```

**Example Response (Online Payment):**
```json
{
  "id": 1,
  "payment_id": "PAY202602100157231",
  "order_id": "ORD202602100157101",
  "payment_method": "upi",
  "status": "pending",
  "amount": "134.00",
  "currency": "INR",
  "gateway_order_id": "order_PAY202602100157231",
  "created_at": "2026-02-10T01:57:23.042394Z",
  "message": "Payment initiated. Complete the payment using the gateway."
}
```

**Payment Flow:**
1. **COD (Cash on Delivery):**
   - Payment status set to `processing`
   - Payment will be completed when order is delivered
   
2. **Online Payments (UPI/Card/Wallet):**
   - Payment status set to `pending`
   - Returns gateway order ID for payment processing
   - Frontend should redirect to payment gateway
   - Gateway sends callback to complete payment

---

### 2. Payment Callback

**Endpoint:** `POST /api/payments/callback/`

**Description:** Webhook endpoint for payment gateway to confirm payment.

**Authorization:** None (Public endpoint - should verify signature in production)

**Request Body:**
```json
{
  "payment_id": "PAY202602100157231",
  "gateway_payment_id": "razorpay_xyz123",
  "gateway_order_id": "order_abc456",
  "gateway_signature": "signature_hash",
  "status": "completed"
}
```

**Field Descriptions:**
- `payment_id` (required) - Our payment ID
- `gateway_payment_id` (required) - Payment gateway's payment ID
- `gateway_order_id` (required) - Payment gateway's order ID
- `gateway_signature` (optional) - Signature for verification
- `status` (required) - Payment status: `completed` or `failed`

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/payments/callback/ \
  -H "Content-Type: application/json" \
  -d '{
    "payment_id": "PAY202602100157231",
    "gateway_payment_id": "razorpay_xyz123",
    "gateway_order_id": "order_abc456",
    "status": "completed"
  }'
```

**Example Response:**
```json
{
  "id": 1,
  "payment_id": "PAY202602100157231",
  "order_id": "ORD202602100157101",
  "payment_method": "upi",
  "status": "completed",
  "amount": "134.00",
  "gateway_payment_id": "razorpay_xyz123",
  "gateway_order_id": "order_abc456",
  "completed_at": "2026-02-10T01:58:00.123456Z"
}
```

**Callback Logic:**
1. Find payment by payment_id
2. Update payment with gateway details
3. If status is `completed`:
   - Set `completed_at` timestamp
   - Update order payment_status to `completed`
   - Update order status to `confirmed`
4. If status is `failed`:
   - Update order payment_status to `failed`

---

### 3. List Payments

**Endpoint:** `GET /api/payments/`

**Description:** Returns list of payments for the authenticated user.

**Authorization:** Required (Bearer token)

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/payments/ \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "payment_id": "PAY202602100157231",
      "order_id": "ORD202602100157101",
      "payment_method": "upi",
      "status": "completed",
      "amount": "134.00",
      "created_at": "2026-02-10T01:57:23.042394Z",
      "completed_at": "2026-02-10T01:58:00.123456Z"
    }
  ]
}
```

---

### 4. Get Payment Detail

**Endpoint:** `GET /api/payments/{id}/`

**Description:** Returns detailed information about a specific payment.

**Authorization:** Required (Payment owner only)

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/payments/1/ \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "id": 1,
  "payment_id": "PAY202602100157231",
  "order_id": "ORD202602100157101",
  "payment_method": "upi",
  "status": "completed",
  "amount": "134.00",
  "currency": "INR",
  "gateway_payment_id": "razorpay_xyz123",
  "gateway_order_id": "order_abc456",
  "created_at": "2026-02-10T01:57:23.042394Z",
  "completed_at": "2026-02-10T01:58:00.123456Z",
  "refund_amount": "0.00",
  "refunded_at": null
}
```

---

### 5. Check Payment Status

**Endpoint:** `GET /api/payments/{id}/status/`

**Description:** Quick endpoint to check current payment status.

**Authorization:** Required (Payment owner only)

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/payments/1/status/ \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "id": 1,
  "payment_id": "PAY202602100157231",
  "status": "completed",
  "amount": "134.00",
  "completed_at": "2026-02-10T01:58:00.123456Z"
}
```

---

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

### 400 Bad Request
```json
{
  "error": "Order must have at least one item"
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "error": "You can only cancel your own orders"
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "error": "An unexpected error occurred"
}
```

---

## Testing Guide

### 1. Setup Test Environment

```bash
# Create sample data
python manage.py populate_sample_data

# Start server
python manage.py runserver
```

### 2. Get Authentication Token

```bash
# Buyer token
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "buyer1", "password": "test123"}'

# Seller token
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "seller1", "password": "test123"}'
```

### 3. Complete Order Flow Test

```bash
# Set token
TOKEN="<your_access_token>"

# 1. Create order
ORDER_RESPONSE=$(curl -s -X POST http://localhost:8000/api/orders/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "store_id": 1,
    "delivery_address_id": 1,
    "payment_method": "cod",
    "items": [{"product_id": 1, "quantity": 2}]
  }')

ORDER_ID=$(echo $ORDER_RESPONSE | jq -r '.order_id')
echo "Created order: $ORDER_ID"

# 2. Create payment
curl -X POST http://localhost:8000/api/payments/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"order_id\": \"$ORDER_ID\", \"payment_method\": \"cod\"}"

# 3. Update status (as seller)
SELLER_TOKEN="<seller_access_token>"
curl -X PATCH http://localhost:8000/api/orders/1/update_status/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SELLER_TOKEN" \
  -d '{"status": "confirmed"}'

# 4. Rate order (after delivery)
curl -X POST http://localhost:8000/api/orders/1/rate/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"rating": 5, "review": "Excellent!"}'
```

---

## Summary

### Orders API Features
✅ Create orders with multiple items
✅ Apply coupons with validation
✅ Calculate delivery fees
✅ Update inventory on order creation
✅ Cancel orders with inventory refund
✅ Rate and review delivered orders
✅ Status tracking through lifecycle
✅ Role-based access control
✅ Comprehensive validation

### Payments API Features
✅ Support for COD and online payments
✅ Payment gateway integration ready
✅ Webhook callback handling
✅ Payment status tracking
✅ Secure payment flow
✅ Order-payment linkage

### Security Features
✅ JWT authentication required
✅ Role-based authorization
✅ Order ownership validation
✅ Address ownership validation
✅ Inventory validation
✅ Coupon validation

---

## Next Steps

- **Frontend Integration:** All APIs are ready for frontend integration
- **Payment Gateway:** Add Razorpay/Stripe integration for production
- **Notifications:** Add real-time notifications for order updates
- **WebSockets:** Implement real-time order tracking
- **Analytics:** Add order analytics and reporting
- **Testing:** Add comprehensive unit and integration tests
