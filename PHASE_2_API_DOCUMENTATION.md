# Phase 2 API Documentation

This document provides comprehensive documentation for the Phase 2 APIs implemented in the hyper-local market application.

## Overview

Phase 2 implements three main API sets:
1. **Products API** - Browse products, search, and filter
2. **Stores API** - Find nearby stores and view inventory
3. **Coupons API** - List and validate discount coupons

All endpoints support pagination and are publicly accessible (no authentication required for browsing).

---

## Products API

Base URL: `/api/products/`

### 1. List Products

**Endpoint:** `GET /api/products/`

**Description:** Returns a paginated list of all active products.

**Query Parameters:**
- `category` (optional) - Filter by product category (e.g., `vegetables`, `fruits`, `dairy`)
- `min_price` (optional) - Filter products with MRP >= this value
- `max_price` (optional) - Filter products with MRP <= this value
- `in_stock` (optional) - Filter by stock availability (`true`/`false`)
- `store_id` (optional) - Filter products available at specific store
- `page` (optional) - Page number for pagination
- `page_size` (optional) - Number of results per page

**Example Request:**
```bash
GET /api/products/?category=dairy&min_price=40&max_price=60
```

**Example Response:**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 8,
      "name": "Milk",
      "description": "Fresh cow milk",
      "category": "dairy",
      "mrp": "60.00",
      "unit": "l",
      "quantity": "1.00",
      "image": null,
      "brand": "",
      "is_organic": false,
      "is_featured": false,
      "is_active": true
    }
  ]
}
```

---

### 2. Product Detail

**Endpoint:** `GET /api/products/{id}/`

**Description:** Returns detailed information about a specific product including inventory data.

**Query Parameters:**
- `store_id` (optional) - Get inventory for specific store only

**Example Request:**
```bash
GET /api/products/1/
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Tomato",
  "description": "Fresh red tomatoes",
  "category": "vegetables",
  "mrp": "50.00",
  "unit": "kg",
  "quantity": "1.00",
  "image": null,
  "brand": "",
  "barcode": null,
  "sku": null,
  "is_organic": false,
  "is_featured": false,
  "is_active": true,
  "created_at": "2026-02-10T00:05:41.352150Z",
  "updated_at": "2026-02-10T00:05:41.352163Z",
  "inventory": [
    {
      "id": 1,
      "store": 1,
      "store_name": "Sharma Kirana Store",
      "in_stock": true,
      "stock_quantity": 100,
      "price": "50.00",
      "discount_percentage": "10.00",
      "selling_price": "45.00",
      "is_low_stock": false
    }
  ]
}
```

---

### 3. Search Products

**Endpoint:** `GET /api/products/search/`

**Description:** Search products by name or description.

**Query Parameters:**
- `q` (required) - Search query string
- All filter parameters from List Products endpoint are also supported

**Example Request:**
```bash
GET /api/products/search/?q=milk&category=dairy
```

**Example Response:**
```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 8,
      "name": "Milk",
      "description": "Fresh cow milk",
      "category": "dairy",
      "mrp": "60.00",
      "unit": "l",
      "quantity": "1.00",
      "image": null,
      "brand": "",
      "is_organic": false,
      "is_featured": false,
      "is_active": true
    }
  ]
}
```

---

### 4. List Categories

**Endpoint:** `GET /api/products/categories/`

**Description:** Returns all available product categories.

**Example Request:**
```bash
GET /api/products/categories/
```

**Example Response:**
```json
[
  {
    "value": "vegetables",
    "label": "Vegetables"
  },
  {
    "value": "fruits",
    "label": "Fruits"
  },
  {
    "value": "dairy",
    "label": "Dairy"
  },
  {
    "value": "bakery",
    "label": "Bakery"
  },
  {
    "value": "beverages",
    "label": "Beverages"
  },
  {
    "value": "snacks",
    "label": "Snacks"
  },
  {
    "value": "grains",
    "label": "Grains"
  },
  {
    "value": "oils",
    "label": "Oils"
  },
  {
    "value": "spices",
    "label": "Spices"
  },
  {
    "value": "personal_care",
    "label": "Personal Care"
  },
  {
    "value": "household",
    "label": "Household"
  },
  {
    "value": "other",
    "label": "Other"
  }
]
```

---

## Stores API

Base URL: `/api/stores/`

### 1. List Stores

**Endpoint:** `GET /api/stores/`

**Description:** Returns a paginated list of all active and verified stores.

**Query Parameters:**
- `lat` (optional) - User's latitude for distance calculation
- `lon` (optional) - User's longitude for distance calculation
- `page` (optional) - Page number for pagination
- `page_size` (optional) - Number of results per page

**Note:** When `lat` and `lon` are provided, stores are sorted by distance from the user's location.

**Example Request:**
```bash
GET /api/stores/?lat=12.9716&lon=77.5946
```

**Example Response:**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Sharma Kirana Store",
      "description": "Your friendly neighborhood Sharma Kirana Store",
      "phone": "+919876543212",
      "email": "seller1@example.com",
      "address_line1": "789 Commercial Street",
      "address_line2": "",
      "landmark": "",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560002",
      "latitude": "12.971600",
      "longitude": "77.594600",
      "is_active": true,
      "is_verified": true,
      "rating": "4.50",
      "total_reviews": 120,
      "image": null,
      "distance": 0.0
    }
  ]
}
```

---

### 2. Store Detail

**Endpoint:** `GET /api/stores/{id}/`

**Description:** Returns detailed information about a specific store.

**Query Parameters:**
- `lat` (optional) - User's latitude for distance calculation
- `lon` (optional) - User's longitude for distance calculation

**Example Request:**
```bash
GET /api/stores/1/?lat=12.9716&lon=77.5946
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Sharma Kirana Store",
  "description": "Your friendly neighborhood Sharma Kirana Store",
  "phone": "+919876543212",
  "email": "seller1@example.com",
  "address_line1": "789 Commercial Street",
  "address_line2": "",
  "landmark": "",
  "city": "Bengaluru",
  "state": "Karnataka",
  "pincode": "560002",
  "latitude": "12.971600",
  "longitude": "77.594600",
  "is_active": true,
  "is_verified": true,
  "rating": "4.50",
  "total_reviews": 120,
  "image": null,
  "distance": 0.0,
  "owner_name": "seller1",
  "created_at": "2026-02-10T00:05:41.356150Z",
  "updated_at": "2026-02-10T00:05:41.356163Z"
}
```

---

### 3. Store Inventory

**Endpoint:** `GET /api/stores/{id}/inventory/`

**Description:** Returns all products available at a specific store with pricing and stock information.

**Query Parameters:**
- `in_stock` (optional) - Filter by stock availability (`true`/`false`)
- `category` (optional) - Filter by product category
- `page` (optional) - Page number for pagination
- `page_size` (optional) - Number of results per page

**Example Request:**
```bash
GET /api/stores/1/inventory/?in_stock=true&category=dairy
```

**Example Response:**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 8,
      "product": {
        "id": 8,
        "name": "Milk",
        "description": "Fresh cow milk",
        "category": "dairy",
        "mrp": "60.00",
        "unit": "l",
        "quantity": "1.00",
        "image": null,
        "brand": "",
        "is_organic": false,
        "is_featured": false,
        "is_active": true
      },
      "in_stock": true,
      "stock_quantity": 100,
      "price": "60.00",
      "discount_percentage": "10.00",
      "selling_price": "54.00",
      "is_low_stock": false,
      "updated_at": "2026-02-10T00:05:41.395871Z"
    }
  ]
}
```

---

## Coupons API

Base URL: `/api/orders/coupons/`

### 1. List Coupons

**Endpoint:** `GET /api/orders/coupons/`

**Description:** Returns all active and currently valid coupons.

**Query Parameters:**
- `page` (optional) - Page number for pagination
- `page_size` (optional) - Number of results per page

**Example Request:**
```bash
GET /api/orders/coupons/
```

**Example Response:**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "code": "SAVE30",
      "description": "30 rupees off on orders above ₹99",
      "discount_percentage": "0.00",
      "discount_amount": "30.00",
      "min_order_value": "99.00",
      "max_discount": null,
      "valid_from": "2026-02-10T00:05:41.420041Z",
      "valid_to": "2026-03-12T00:05:41.420041Z",
      "usage_limit": null,
      "usage_count": 0,
      "is_active": true
    },
    {
      "id": 2,
      "code": "FIRST50",
      "description": "50% off on first order",
      "discount_percentage": "50.00",
      "discount_amount": "0.00",
      "min_order_value": "100.00",
      "max_discount": "100.00",
      "valid_from": "2026-02-10T00:05:41.420041Z",
      "valid_to": "2026-03-12T00:05:41.420041Z",
      "usage_limit": 1,
      "usage_count": 0,
      "is_active": true
    }
  ]
}
```

---

### 2. Validate Coupon

**Endpoint:** `POST /api/orders/coupons/validate/`

**Description:** Validates a coupon code against an order value and calculates the discount.

**Request Body:**
```json
{
  "code": "SAVE30",
  "order_value": 150.00
}
```

**Validation Rules:**
1. Coupon must be active
2. Current date must be within valid_from and valid_to
3. Usage limit (if set) must not be exceeded
4. Order value must meet minimum order value requirement

**Success Response (Valid Coupon):**
```json
{
  "valid": true,
  "message": "Coupon applied successfully",
  "discount": 30.0,
  "final_amount": 120.0,
  "coupon": {
    "id": 1,
    "code": "SAVE30",
    "description": "30 rupees off on orders above ₹99",
    "discount_percentage": "0.00",
    "discount_amount": "30.00",
    "min_order_value": "99.00",
    "max_discount": null,
    "valid_from": "2026-02-10T00:05:41.420041Z",
    "valid_to": "2026-03-12T00:05:41.420041Z",
    "usage_limit": null,
    "usage_count": 0,
    "is_active": true
  }
}
```

**Error Response (Invalid Coupon):**
```json
{
  "valid": false,
  "message": "Invalid coupon code"
}
```

**Error Response (Below Minimum Order Value):**
```json
{
  "valid": false,
  "message": "Minimum order value is ₹99.00"
}
```

**Error Response (Coupon Expired):**
```json
{
  "valid": false,
  "message": "Coupon has expired"
}
```

**Error Response (Usage Limit Reached):**
```json
{
  "valid": false,
  "message": "Coupon usage limit reached"
}
```

---

## Common Response Formats

### Pagination

All list endpoints support pagination with the following response format:

```json
{
  "count": 100,
  "next": "http://api.example.com/endpoint/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "field_name": [
    "Error message"
  ]
}
```

**404 Not Found:**
```json
{
  "detail": "Not found."
}
```

---

## Testing

### Sample Data

The database includes test data:
- **Products:** 14 products across various categories
- **Stores:** 2 stores (Sharma Kirana Store, Gupta General Store)
- **Coupons:** 2 active coupons (SAVE30, FIRST50)

### Test Users

All test users have password: `test123`

- `buyer1`, `buyer2` - Buyer accounts
- `seller1`, `seller2` - Seller accounts
- `rider1` - Rider account

### Testing with curl

```bash
# List all products
curl http://localhost:8000/api/products/

# Search for dairy products
curl "http://localhost:8000/api/products/search/?q=milk"

# Get nearby stores
curl "http://localhost:8000/api/stores/?lat=12.9716&lon=77.5946"

# Validate a coupon
curl -X POST http://localhost:8000/api/orders/coupons/validate/ \
  -H "Content-Type: application/json" \
  -d '{"code": "SAVE30", "order_value": 150}'
```

---

## Technical Implementation

### Key Features

1. **Distance Calculation:** Uses Haversine formula for accurate geographic distance calculation
2. **Efficient Querying:** Uses `select_related` for optimizing database queries
3. **Flexible Filtering:** Supports multiple filter combinations
4. **Pagination:** Consistent pagination across all list endpoints
5. **Clean Architecture:** Separation of concerns with serializers, views, and utility functions

### Performance Considerations

- Database indexes on frequently queried fields
- Selective field loading with `select_related` and `prefetch_related`
- Efficient sorting before pagination for distance-based queries

---

## Next Steps

### Phase 3 (Planned)
- Order management APIs
- Cart functionality
- Payment integration
- Order tracking
- User authentication and authorization

### Future Enhancements
- Real-time inventory updates
- Push notifications
- Advanced search with Elasticsearch
- Geospatial queries with PostGIS
- Caching layer with Redis
