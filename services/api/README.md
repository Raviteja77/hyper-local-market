# Hyper-Local Market - Backend API

Django REST API for the hyper-local grocery delivery platform.

## Features

- ✅ JWT Authentication with token refresh
- ✅ Role-based access control (Buyer, Seller, Rider, Admin)
- ✅ Product catalog with categories and search
- ✅ Store management with geolocation and nearby search
- ✅ Complete order management with status tracking
- ✅ Payment processing (COD and online payments)
- ✅ Coupon system with validation
- ✅ Inventory management with stock tracking
- ✅ Order rating and review system
- ✅ CORS enabled for frontend integration

## Tech Stack

- Django 5.0.3
- Django REST Framework 3.14.0
- Simple JWT for authentication
- SQLite (development) / PostgreSQL (production)
- Python 3.12+

## Quick Start

### 1. Install Dependencies

```bash
cd services/api
pip install -r requirements/development.txt
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update the values as needed.

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Create Sample Data

```bash
python manage.py populate_sample_data
```

This creates:
- 2 buyers (buyer1, buyer2)
- 2 sellers (seller1, seller2) 
- 1 rider (rider1)
- 2 stores with inventory
- 14 products across multiple categories
- 2 test coupons

All test users have password: `test123`

### 5. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

Or use the pre-created admin:
- Username: `admin`
- Password: `admin123`

### 6. Start Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

Admin panel: `http://localhost:8000/admin`

## API Endpoints

### Authentication

```bash
# Get access token
POST /api/auth/token/
{
  "username": "buyer1",
  "password": "test123"
}

# Refresh access token
POST /api/auth/token/refresh/
{
  "refresh": "<refresh_token>"
}
```

### Users (Phase 3 - Coming Soon)

```bash
GET    /api/users/profile/         # Get current user profile
PUT    /api/users/profile/         # Update profile
GET    /api/users/addresses/       # List user addresses
POST   /api/users/addresses/       # Create address
```

### Products (Phase 2 - ✅ Complete)

```bash
GET    /api/products/              # List products with filters
GET    /api/products/{id}/         # Get product detail with inventory
GET    /api/products/search/?q=    # Search products by name/description
GET    /api/products/categories/   # List all categories
```

**Features:**
- Pagination support
- Filter by category, price range, stock, store
- Product detail includes inventory from all stores
- Full-text search

### Stores (Phase 2 - ✅ Complete)

```bash
GET    /api/stores/                      # List active stores
GET    /api/stores/?lat={lat}&lon={lon}  # List nearby stores with distance
GET    /api/stores/{id}/                 # Get store detail
GET    /api/stores/{id}/inventory/       # Get store inventory with products
```

**Features:**
- Distance calculation using Haversine formula
- Stores sorted by distance when location provided
- Filter inventory by category and stock
- Pagination support

### Coupons (Phase 2 - ✅ Complete)

```bash
GET    /api/orders/coupons/           # List active coupons
POST   /api/orders/coupons/validate/  # Validate coupon code
```

**Request body for validation:**
```json
{
  "code": "SAVE30",
  "order_value": 150.00
}
```

**Features:**
- Complete validation logic (expiry, usage limits, minimum order value)
- Discount calculation (percentage and fixed amount)
- Clear error messages

### Orders (Phase 3 - ✅ Complete)

```bash
GET    /api/orders/                      # List user orders (role-based)
POST   /api/orders/                      # Create order with items
GET    /api/orders/{id}/                 # Get order detail
POST   /api/orders/{id}/cancel/          # Cancel order
POST   /api/orders/{id}/rate/            # Rate and review order
PATCH  /api/orders/{id}/update_status/   # Update order status (seller/rider)
```

**Features:**
- Multi-item order creation
- Automatic inventory validation and updates
- Coupon application and validation
- Delivery fee calculation
- Order cancellation with inventory refund
- Rating system for delivered orders
- Status tracking through complete lifecycle
- Role-based access (buyer, seller, rider, admin)

### Payments (Phase 3 - ✅ Complete)

```bash
GET    /api/payments/              # List user payments
POST   /api/payments/              # Create payment for order
GET    /api/payments/{id}/         # Get payment detail
GET    /api/payments/{id}/status/  # Check payment status
POST   /api/payments/callback/     # Payment gateway webhook
```

**Features:**
- COD (Cash on Delivery) support
- Online payment methods (UPI, Card, Wallet)
- Payment gateway integration ready (Razorpay/Stripe)
- Webhook callback handling
- Payment status tracking
- Automatic order confirmation on payment

## Database Models

### User
- Custom user model with roles (buyer, seller, rider, admin)
- Phone-based authentication
- Profile information

### Address
- Delivery addresses with geolocation
- Support for home, work, and other types
- Default address management

### Store
- Store information with owner
- Geolocation for nearby search
- Rating system

### Product
- Product catalog
- 12 categories: vegetables, fruits, dairy, bakery, beverages, snacks, grains, oils, spices, personal_care, household, other
- Unit types: kg, g, l, ml, piece, dozen, packet

### Inventory
- Store-specific product pricing and stock
- Discount management
- Low stock alerts

### Order
- Order lifecycle management
- Status: pending → confirmed → preparing → ready → picked_up → out_for_delivery → delivered/cancelled
- Payment tracking
- Delivery address and instructions

### OrderItem
- Individual items in an order
- Snapshot of product details at order time

### Coupon
- Discount codes
- Validation rules (min order value, usage limits)
- Expiry dates

## Test Data

### Users
| Username | Role   | Password | Phone         |
|----------|--------|----------|---------------|
| admin    | Admin  | admin123 | +919876543200 |
| buyer1   | Buyer  | test123  | +919876543210 |
| buyer2   | Buyer  | test123  | +919876543211 |
| seller1  | Seller | test123  | +919876543212 |
| seller2  | Seller | test123  | +919876543213 |
| rider1   | Rider  | test123  | +919876543214 |

### Coupons
| Code    | Description                    | Discount      |
|---------|--------------------------------|---------------|
| SAVE30  | ₹30 off on orders above ₹99    | ₹30 flat      |
| FIRST50 | 50% off on first order above ₹100 | 50% (max ₹100) |

## Development

### Running Tests

```bash
python manage.py test
```

### Code Style

```bash
# Format code
black .

# Check linting
flake8
```

### Database Reset

```bash
# Remove database
rm db.sqlite3

# Run migrations
python manage.py migrate

# Repopulate data
python manage.py populate_sample_data
```

## Project Structure

```
services/api/
├── apps/
│   ├── users/          # User management & authentication
│   ├── stores/         # Store management
│   ├── products/       # Product catalog
│   ├── orders/         # Order management
│   ├── payments/       # Payment integration
│   ├── riders/         # Rider management
│   ├── notifications/  # Push/SMS notifications
│   └── analytics/      # Analytics & reporting
├── config/
│   ├── settings/       # Django settings
│   │   ├── base.py     # Base settings
│   │   ├── development.py # Dev settings
│   │   └── production.py  # Prod settings
│   ├── urls.py         # URL routing
│   ├── wsgi.py         # WSGI config
│   └── asgi.py         # ASGI config
├── core/               # Shared utilities
├── requirements/       # Dependencies
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
└── manage.py
```

## Next Steps

### Phase 2: Buyer APIs - Products & Cart - ✅ COMPLETE

Completed features:
- ✅ Product list/search/filter endpoints
- ✅ Store search by location with distance calculation
- ✅ Coupon validation with business rules
- ✅ Comprehensive API documentation

See [PHASE_2_API_DOCUMENTATION.md](../../PHASE_2_API_DOCUMENTATION.md) for detailed API documentation.

### Phase 3: Order & Payment APIs - ✅ COMPLETE

Completed features:
- ✅ Order creation and management
- ✅ Payment processing (COD and online)
- ✅ Order status tracking and updates
- ✅ Order cancellation with inventory refund
- ✅ Rating and review system
- ✅ Role-based access control
- ✅ Payment gateway integration structure

See [PHASE_3_API_DOCUMENTATION.md](../../PHASE_3_API_DOCUMENTATION.md) for detailed API documentation.

### Phase 4: Integration & Enhancement - Coming Next
- Frontend integration with React/Next.js
- Real-time features with WebSockets
- Payment gateway integration (Razorpay/Stripe)
- Push notifications
- Advanced analytics
- Comprehensive testing suite

## License

Private - All Rights Reserved
