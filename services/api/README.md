# Hyper-Local Market - Backend API

Django REST API for the hyper-local grocery delivery platform.

## Features

- ✅ JWT Authentication with token refresh
- ✅ Role-based access control (Buyer, Seller, Rider, Admin)
- ✅ Product catalog with categories
- ✅ Store management with geolocation
- ✅ Order management with status tracking
- ✅ Coupon system with validation
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

### Users (Phase 2 - Coming Soon)

```bash
GET    /api/users/profile/         # Get current user profile
PUT    /api/users/profile/         # Update profile
GET    /api/users/addresses/       # List user addresses
POST   /api/users/addresses/       # Create address
```

### Products (Phase 2 - Coming Soon)

```bash
GET    /api/products/              # List products
GET    /api/products/{id}/         # Get product detail
GET    /api/products/search/       # Search products
GET    /api/products/categories/   # List categories
```

### Stores (Phase 2 - Coming Soon)

```bash
GET    /api/stores/                # List nearby stores
GET    /api/stores/{id}/           # Get store detail
GET    /api/stores/{id}/inventory/ # Get store inventory
```

### Orders (Phase 3 - Coming Soon)

```bash
GET    /api/orders/                # List user orders
POST   /api/orders/                # Create order
GET    /api/orders/{id}/           # Get order detail
POST   /api/orders/{id}/cancel/    # Cancel order
POST   /api/orders/{id}/rate/      # Rate order
```

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

### Phase 2: Buyer APIs - Products & Cart
- Implement product list/search/filter endpoints
- Store search by location
- Coupon validation
- Cart operations

### Phase 3: Order & Payment APIs  
- Order creation and management
- Payment integration
- Order tracking and rating

### Phase 4: Integration & Testing
- Connect frontend to backend
- End-to-end testing
- Real-time features with WebSockets

## License

Private - All Rights Reserved
