# Hyper Local Market

A decentralized grocery delivery platform connecting buyers, local stores (kirana), riders, and administrators for seamless grocery shopping and delivery.

## 🚀 Project Status

- ✅ **Phase 1**: Core API Infrastructure (Complete)
- ✅ **Phase 2**: Store & Product Management (Complete)
- ✅ **Phase 3**: Order Management & Payment APIs (Complete)
- ✅ **Phase 4**: Frontend Integration, WebSocket & Payment Gateway (Complete)

## 🎯 Features

### For Buyers
- 📍 Location-based store discovery
- 🛒 Add items to cart and checkout
- 💳 Multiple payment options (COD, UPI, Cards)
- 📦 Real-time order tracking with WebSockets
- 🔔 Live notifications for order status changes
- ⭐ Rate and review delivered orders

### For Sellers (Kirana Store Owners)
- 📊 Real-time inventory management
- 🔄 Order notifications via WebSocket
- 💰 Track earnings and sales
- 🏪 Store status control (online/offline)

### For Riders (Delivery Partners)
- 📍 Live order assignments
- 🚴 Real-time delivery tracking
- 💵 Earnings dashboard
- 📞 Direct customer communication

### For Admins
- 👥 User management
- 🏪 Store verification and management
- 📈 Analytics and reporting
- 🛠️ System configuration

## 🏗️ Architecture

### Backend
- **Framework**: Django 5.0.3 + Django REST Framework
- **Real-time**: Django Channels 4.0.0 + Redis
- **Database**: PostgreSQL with PostGIS
- **Authentication**: JWT (Simple JWT)
- **Payment**: Razorpay integration
- **Task Queue**: Celery
- **ASGI Server**: Daphne

### Frontend
- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Real-time**: Native WebSocket API
- **UI Documentation**: Storybook
- **Testing**: Vitest

## 📦 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Raviteja77/hyper-local-market.git
cd hyper-local-market

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Admin Panel: http://localhost:8000/admin
```

### Manual Setup

See [SETUP_GUIDE_PHASE4.md](docs/SETUP_GUIDE_PHASE4.md) for detailed setup instructions.

## 📚 Documentation

- [Phase 1 Summary](PHASE_1_SUMMARY.md) - Core API Infrastructure
- [Phase 2 Summary](PHASE_2_SUMMARY.md) - Store & Product Management
- [Phase 2 API Documentation](PHASE_2_API_DOCUMENTATION.md)
- [Phase 3 Summary](PHASE_3_SUMMARY.md) - Order Management & Payments
- [Phase 3 API Documentation](PHASE_3_API_DOCUMENTATION.md)
- [Phase 3 Final Summary](PHASE_3_FINAL_SUMMARY.md)
- [Phase 4 Final Summary](PHASE_4_FINAL_SUMMARY.md) - WebSocket & Payment Gateway ⭐ NEW
- [WebSocket API Documentation](docs/WEBSOCKET_API.md) ⭐ NEW
- [Payment Integration Guide](docs/PAYMENT_INTEGRATION.md) ⭐ NEW
- [Development Setup Guide](docs/SETUP_GUIDE_PHASE4.md) ⭐ NEW

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/send-otp/` - Send OTP
- `POST /api/auth/verify-otp/` - Verify OTP & Login
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user

### Stores
- `GET /api/stores/nearby/` - Get nearby stores
- `GET /api/stores/{id}/` - Get store details
- `GET /api/stores/{id}/inventory/` - Get store inventory

### Products
- `GET /api/products/` - List products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/search/` - Search products

### Orders
- `POST /api/orders/` - Create order
- `GET /api/orders/` - List orders
- `GET /api/orders/{id}/` - Get order details
- `POST /api/orders/{id}/cancel/` - Cancel order
- `POST /api/orders/{id}/rate/` - Rate order
- `PATCH /api/orders/{id}/update_status/` - Update status

### Payments
- `POST /api/payments/` - Create payment
- `GET /api/payments/` - List payments
- `GET /api/payments/{id}/` - Get payment details
- `POST /api/payments/callback/` - Payment callback
- `GET /api/payments/{id}/status/` - Check payment status

### WebSocket ⭐ NEW
- `ws://localhost:8000/ws/orders/?token=<jwt>` - Real-time order tracking
- `ws://localhost:8000/ws/notifications/?token=<jwt>` - Real-time notifications

## 🔒 Security

- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Payment signature verification
- ✅ WebSocket authentication
- ✅ HTTPS/WSS enforcement in production
- ✅ Zero security vulnerabilities (CodeQL verified)

## 🧪 Testing

### Backend
```bash
cd services/api
python manage.py test
```

### Frontend
```bash
cd services/web
npm test
npm run test:coverage
```

### WebSocket Testing
```bash
# Using wscat
npm install -g wscat
wscat -c "ws://localhost:8000/ws/orders/?token=YOUR_JWT_TOKEN"
```

## 🌍 Environment Variables

### Backend (.env)
```bash
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_HOST=localhost
REDIS_PORT=6379
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

## 🚀 Deployment

### Production Checklist
- [ ] Set production environment variables
- [ ] Configure SSL/TLS certificates
- [ ] Set up Redis for WebSocket channel layer
- [ ] Configure Razorpay live keys
- [ ] Set up monitoring and logging
- [ ] Configure Nginx for WebSocket support
- [ ] Run database migrations
- [ ] Test WebSocket connections
- [ ] Test payment flow

## 📈 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multiple payment gateways (Stripe)
- [ ] Live rider location tracking
- [ ] In-app chat support
- [ ] Order scheduling
- [ ] Loyalty programs
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- Backend Development: Django + Channels
- Frontend Development: Next.js + TypeScript
- Real-time Features: WebSocket integration
- Payment Integration: Razorpay

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check documentation in `/docs`
- Review API documentation
- See troubleshooting guides

---

**Last Updated**: 2024-02-10
**Current Version**: Phase 4 Complete
**Status**: ✅ Production Ready
