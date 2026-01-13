# hyper-local-market

## Project Setup

This project uses Docker Compose to run a Next.js frontend and a Django backend.

### Prerequisites

- Docker and Docker Compose installed.

### Initialization

1. **Build the containers:**
   ```bash
   docker-compose build
   ```

2. **Initialize Django Project:**
   Since the `services/api` folder is currently empty (except for Docker config), run this to scaffold the Django app:
   ```bash
   docker-compose run --rm api django-admin startproject config .
   ```
   *Note: The `.` at the end is important to create the project in the current directory.*

3. **Start the application:**
   ```bash
   docker-compose up
   ```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

# Hyper-local Decentralized Grocery & Essentials Delivery Platform

## 1. Product Overview (What We Are Building)
We are building a hyper‑local delivery platform that connects:
- **Buyers** (customers)
- **Local kirana / general stores** (sellers)
- **Delivery riders**

Unlike warehouse-based models (Blinkit / Zepto), this platform is:
- **Decentralized:** Stores act as micro‑warehouses
- **Inventory-light:** No owned warehouses
- **Ultra-local:** Delivery from nearest store
- **Language-inclusive:** Seller side supports Indian languages + voice

### Platform Components
- **Web App:** Admin + Seller onboarding + Buyer web
- **Mobile App:** Buyer + Seller + Rider
- **Backend APIs:** Django + Django Rest Framework
- **Real-time systems:** Tracking, status, notifications

## 2. User Roles & Capabilities

### A) Buyer (Customer)
**Core Flow:**
1. App/Web opens → Login / Register via OTP → Location permission
2. Search product (e.g., “Shampoo”) → Backend finds nearest stores with live inventory
3. Buyer selects product → add to cart
4. Select / add delivery address → Apply coupon (optional)
5. Choose payment (UPI / Card / COD) → Order placed
6. Live order tracking (store → rider → home) → Delivery confirmation → Rating & feedback

**Features:**
- Product search & category browsing
- Store comparison (distance, ETA, price)
- Cart management & Coupons
- Order tracking (real-time) & History

### B) Seller (Local Store)
**Core Flow:**
1. Seller onboarding (via field agent or web/app)
2. Store profile creation (name, address, timings, language)
3. Inventory setup (Category selection, Tick‑box product availability)
4. Receive order notification → Accept / Reject order within SLA
5. Prepare order → Hand over to rider
6. Earnings & payout view

**Features:**
- Multilingual UI & Voice-based update (future)
- Inventory toggle (in stock / out of stock)
- Order management & Auto inventory decrement
- Reliability score & Payout dashboard

### C) Rider (Delivery Partner)
**Core Flow:**
1. Rider onboarding + KYC → Go online
2. Receive nearby order → Accept order
3. Navigate to store → Pickup confirmation
4. Navigate to customer → Delivery OTP confirmation
5. Earnings updated

**Features:**
- Availability toggle
- Live navigation & Heat‑zone allocation
- Earnings, incentives & SLA tracking

### D) Admin (Operations)
**Capabilities:**
- Manage users (buyers, sellers, riders)
- Monitor live orders & KPIs
- Assign / reassign riders
- Configure commissions & Fraud detection
- City / zone management

## 3. Complete System Architecture

### Tech Stack
- **Frontend (Web):** Next.js (SEO-friendly, Admin dashboard)
- **Mobile App:** React Native (Shared logic, Faster development)
- **Backend:** Django + Django Rest Framework (Built-in auth, Admin, Scalable)
- **Database:** PostgreSQL (Transactions, Geo queries via PostGIS)
- **Real-time:** Redis Streams + WebSockets (Order status, Rider tracking)
- **Containerization:** Docker + Docker Compose
- **Payments:** Razorpay
- **Notifications:** Firebase (push), SMS / WhatsApp
- **Monitoring:** Prometheus + Grafana

### High-Level Data Flow
Buyer App/Web → API Gateway (Django) → Auth Service → Product Search Service → Inventory Engine → Store Selection Logic → Order Service → Payment Gateway → Order Confirmation → Redis Stream (Order Events) → Rider Assignment Engine → WebSocket Updates → Buyer / Seller / Rider Apps

## 4. Core Backend Modules
The backend services (initially Monorepo):
- `auth_service`
- `user_service`
- `store_service`
- `inventory_service`
- `order_service`
- `payment_service`
- `rider_service`
- `notification_service`
- `analytics_service`

## 5. Database Entities (Simplified)
- **User:** Role (buyer / seller / rider / admin)
- **Store:** Profile, Location, Timings
- **Product:** Metadata, Categories
- **Inventory:** Store-Product mapping, Stock status
- **Order:** Status, Timestamps, Totals
- **OrderItem:** Line items
- **Payment:** Transaction details, Status
- **Rider:** Profile, Status, Current Location
- **Payout:** Earnings records
- **Rating:** Reviews and scores
- **ReliabilityScore:** Seller/Rider metrics

## 6. Real-Time Features
- **Live Tracking:** Rider GPS → Redis Stream → WebSocket → Buyer UI map
- **Status Updates:** Order accepted → Rider assigned → Picked up → Delivered

## 7. Scaling Strategy
- Zone-based order routing
- City-wise database partitioning (future)
- Redis caching for product search
- Async workers (Celery)

## 8. Security & Reliability
- JWT + refresh tokens
- Role-based access control
- Rate limiting
- Payment webhooks verification
- SLA timers & Auto-cancellation rules

## 9. Deployment (Initial)
- Dockerized services
- Single VM / EC2 initially
- Nginx reverse proxy
- CI/CD ready
- Separate environments (dev / staging / prod)
