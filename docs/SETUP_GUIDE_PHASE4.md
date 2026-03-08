# Development Setup Guide - Phase 4

## Overview

This guide covers setting up the development environment for Phase 4 features:
- Real-time order tracking with WebSockets
- Payment gateway integration (Razorpay)
- Frontend integration

---

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ and npm
- Python 3.11+
- Git
- Redis (for WebSocket channel layer)

---

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/Raviteja77/hyper-local-market.git
cd hyper-local-market
```

### 2. Set Up Backend

#### Environment Variables

Create `.env` file in `services/api/`:

```bash
# Django
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hyperlocal

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Razorpay (Test Keys)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### Install Dependencies

```bash
cd services/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Run Migrations

```bash
python manage.py migrate
```

#### Create Superuser

```bash
python manage.py createsuperuser
```

#### Start Services

You need to run multiple services:

**Terminal 1 - Django/Daphne (ASGI Server)**:
```bash
# Development with auto-reload
daphne -b 0.0.0.0 -p 8000 config.asgi:application
```

**Terminal 2 - Celery Worker** (for async tasks):
```bash
celery -A config worker -l info
```

**Terminal 3 - Redis**:
```bash
redis-server
```

### 3. Set Up Frontend

#### Environment Variables

Create `.env.local` file in `services/web/`:

```bash
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

#### Install Dependencies

```bash
cd services/web
npm install
```

#### Start Development Server

```bash
npm run dev
```

Frontend will be available at http://localhost:3000

---

## Docker Setup

### Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services

- **api**: Django backend with Daphne (port 8000)
- **web**: Next.js frontend (port 3000)
- **db**: PostgreSQL database (port 5432)
- **redis**: Redis for caching and WebSockets (port 6379)

---

## Testing WebSocket Connection

### 1. Using Browser Console

```javascript
// Open browser console on http://localhost:3000
// Get your JWT token from localStorage
const token = localStorage.getItem('accessToken');

// Connect to WebSocket
const ws = new WebSocket(`ws://localhost:8000/ws/orders/?token=${token}`);

ws.onopen = () => console.log('✅ Connected');
ws.onmessage = (e) => console.log('📨 Message:', JSON.parse(e.data));
ws.onerror = (e) => console.error('❌ Error:', e);

// Subscribe to an order
ws.send(JSON.stringify({
  type: 'subscribe_order',
  order_id: 'ORD20240210123456'
}));
```

### 2. Using wscat

```bash
# Install wscat
npm install -g wscat

# Connect (replace TOKEN with your JWT)
wscat -c "ws://localhost:8000/ws/orders/?token=YOUR_JWT_TOKEN"

# Send message
> {"type": "subscribe_order", "order_id": "ORD123"}

# You should receive messages
< {"type": "subscribed", "order_id": "ORD123", ...}
```

### 3. Using Python

```python
import asyncio
import websockets
import json

async def test_websocket():
    token = "your_jwt_token"
    uri = f"ws://localhost:8000/ws/orders/?token={token}"
    
    async with websockets.connect(uri) as websocket:
        # Wait for connection confirmation
        message = await websocket.recv()
        print(f"Connected: {message}")
        
        # Subscribe to order
        await websocket.send(json.dumps({
            "type": "subscribe_order",
            "order_id": "ORD123"
        }))
        
        # Listen for messages
        async for message in websocket:
            data = json.loads(message)
            print(f"Received: {data}")

asyncio.run(test_websocket())
```

---

## Testing Payment Integration

### 1. Get Test Credentials

Sign up for Razorpay test account: https://dashboard.razorpay.com/signup

Get test API keys from: **Settings → API Keys → Test Mode**

### 2. Configure Environment

Update `.env` files with test credentials.

### 3. Test Payment Flow

1. Start backend and frontend
2. Login as buyer
3. Add items to cart
4. Proceed to checkout
5. Select "Pay Online"
6. Click "Pay with Razorpay"
7. Use test card:
   - **Card**: 4111 1111 1111 1111
   - **CVV**: 123
   - **Expiry**: 12/25
8. Verify payment success
9. Check order status updates via WebSocket

### 4. Test Webhooks Locally

Use ngrok to expose local server:

```bash
# Install ngrok
brew install ngrok  # or download from ngrok.com

# Expose port 8000
ngrok http 8000

# Use the ngrok URL in Razorpay webhook settings
# Example: https://abc123.ngrok.io/api/payments/webhook/
```

---

## Development Workflow

### Making Changes

1. **Backend Changes**:
   - Edit Python files in `services/api/`
   - Daphne auto-reloads on code changes
   - Restart Celery if you change task definitions

2. **Frontend Changes**:
   - Edit files in `services/web/src/`
   - Next.js auto-reloads on code changes
   - Check browser console for errors

3. **Database Changes**:
   ```bash
   # Create migration
   python manage.py makemigrations
   
   # Apply migration
   python manage.py migrate
   ```

### Running Tests

**Backend**:
```bash
cd services/api
python manage.py test
```

**Frontend**:
```bash
cd services/web
npm test
```

### Code Quality

**Backend - Linting**:
```bash
cd services/api
flake8 .
black .
```

**Frontend - Linting**:
```bash
cd services/web
npm run lint
```

---

## Common Issues

### WebSocket Connection Fails

**Issue**: `WebSocket connection to 'ws://localhost:8000/ws/orders/' failed`

**Solutions**:
1. Check if Daphne is running (not Django dev server)
2. Verify Redis is running: `redis-cli ping`
3. Check JWT token is valid
4. Review browser console for errors

### Razorpay Not Loading

**Issue**: `Razorpay is not defined`

**Solutions**:
1. Check internet connection (Razorpay SDK loads from CDN)
2. Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
3. Check browser console for script loading errors
4. Try refreshing the page

### Redis Connection Error

**Issue**: `Error connecting to Redis`

**Solutions**:
1. Start Redis: `redis-server`
2. Check Redis is running: `redis-cli ping`
3. Verify `REDIS_HOST` and `REDIS_PORT` in `.env`
4. Check firewall settings

### Database Migration Errors

**Issue**: Migration conflicts or errors

**Solutions**:
```bash
# Reset migrations (DEV ONLY!)
python manage.py migrate <app_name> zero
python manage.py makemigrations
python manage.py migrate

# Or start fresh (DEV ONLY!)
docker-compose down -v  # Removes volumes
docker-compose up --build
```

### CORS Errors

**Issue**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Add frontend URL to `CORS_ALLOWED_ORIGINS` in settings
2. Check `CORS_ALLOW_CREDENTIALS = True` is set
3. Restart backend server

---

## Debugging

### Backend Debugging

**Django Shell**:
```bash
python manage.py shell
```

```python
# Test WebSocket signal
from apps.orders.models import Order
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

order = Order.objects.first()
channel_layer = get_channel_layer()

# Send test message
async_to_sync(channel_layer.group_send)(
    f"user_orders_{order.user_id}",
    {
        'type': 'order_status_changed',
        'order_id': order.order_id,
        'new_status': 'confirmed',
        'message': 'Test message'
    }
)
```

**Redis Debugging**:
```bash
# Monitor Redis commands
redis-cli monitor

# Check active channels
redis-cli PUBSUB CHANNELS

# Check Redis info
redis-cli INFO
```

### Frontend Debugging

**React DevTools**:
- Install React Developer Tools browser extension
- Inspect component state and props

**Network Tab**:
- Monitor WebSocket connections
- Check API requests/responses
- View Razorpay script loading

**Console Logs**:
```javascript
// Enable WebSocket debug logging
localStorage.setItem('debug', 'websocket:*');
```

---

## Environment Variables Reference

### Backend (.env)

```bash
# Required
DJANGO_SECRET_KEY=<random-string>
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_HOST=localhost
REDIS_PORT=6379

# Optional but recommended
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=password

# SMS (optional)
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend (.env.local)

```bash
# Required
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
```

---

## Useful Commands

### Docker

```bash
# Rebuild specific service
docker-compose build api

# View logs for specific service
docker-compose logs -f api

# Execute command in container
docker-compose exec api python manage.py shell

# Clean up
docker-compose down -v --remove-orphans
docker system prune -a
```

### Database

```bash
# Backup
docker-compose exec db pg_dump -U postgres hyperlocal > backup.sql

# Restore
docker-compose exec -T db psql -U postgres hyperlocal < backup.sql

# Connect to database
docker-compose exec db psql -U postgres hyperlocal
```

### Redis

```bash
# Clear all data
docker-compose exec redis redis-cli FLUSHALL

# Check memory usage
docker-compose exec redis redis-cli INFO memory
```

---

## Next Steps

1. ✅ Complete this setup guide
2. 📚 Read [WebSocket API Documentation](./WEBSOCKET_API.md)
3. 💳 Read [Payment Integration Guide](./PAYMENT_INTEGRATION.md)
4. 🧪 Write tests for new features
5. 🚀 Deploy to staging environment

---

## Support

For issues:
1. Check this guide
2. Review logs: `docker-compose logs -f`
3. Check GitHub Issues
4. Ask in team chat

---

*Last Updated: 2024-02-10*
