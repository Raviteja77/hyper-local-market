# Hyper-Local Market - Complete Project Structure & Architecture

## 📁 Complete Folder Structure

```
hyper-local-market/
│
├── .github/                          # GitHub Actions CI/CD
│   └── workflows/
│       ├── frontend-ci.yml
│       └── backend-ci.yml
│
├── docs/                             # Project documentation
│   ├── architecture.md
│   ├── api-specs.md
│   ├── deployment.md
│   └── phase-execution-plan.md
│
├── services/
│   │
│   ├── web/                          # Next.js Frontend
│   │   ├── .storybook/               # Storybook configuration
│   │   │   ├── main.ts
│   │   │   ├── preview.ts
│   │   │   └── theme.ts
│   │   │
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── src/
│   │   │   │
│   │   │   ├── components/          # Atomic Design Structure
│   │   │   │   │
│   │   │   │   ├── atoms/           # Basic building blocks
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Input/
│   │   │   │   │   ├── Icon/
│   │   │   │   │   ├── Typography/
│   │   │   │   │   ├── Badge/
│   │   │   │   │   ├── Avatar/
│   │   │   │   │   ├── Spinner/
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── molecules/       # Simple groups
│   │   │   │   │   ├── SearchBar/
│   │   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   │   ├── SearchBar.stories.tsx
│   │   │   │   │   │   ├── SearchBar.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── FormField/
│   │   │   │   │   ├── ProductCard/
│   │   │   │   │   ├── StoreCard/
│   │   │   │   │   ├── OrderStatusBadge/
│   │   │   │   │   ├── PriceDisplay/
│   │   │   │   │   ├── RatingStars/
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── organisms/       # Complex sections
│   │   │   │   │   ├── Navbar/
│   │   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   │   ├── Navbar.stories.tsx
│   │   │   │   │   │   ├── Navbar.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Footer/
│   │   │   │   │   ├── ProductGrid/
│   │   │   │   │   ├── CartSidebar/
│   │   │   │   │   ├── OrderTracker/
│   │   │   │   │   ├── StoreList/
│   │   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── InventoryManager/
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   ├── templates/       # Page layouts
│   │   │   │   │   ├── AuthLayout/
│   │   │   │   │   │   ├── AuthLayout.tsx
│   │   │   │   │   │   ├── AuthLayout.stories.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── BuyerLayout/
│   │   │   │   │   ├── SellerLayout/
│   │   │   │   │   ├── RiderLayout/
│   │   │   │   │   ├── AdminLayout/
│   │   │   │   │   └── index.ts
│   │   │   │   │
│   │   │   │   └── index.ts         # Barrel exports
│   │   │   │
│   │   │   ├── app/                 # Next.js 14 App Router
│   │   │   │   ├── (auth)/          # Route groups
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── register/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   │
│   │   │   │   ├── (buyer)/
│   │   │   │   │   ├── page.tsx     # Home/Search
│   │   │   │   │   ├── products/
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── cart/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── checkout/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── orders/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   │
│   │   │   │   ├── (seller)/
│   │   │   │   │   ├── seller/
│   │   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── inventory/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── orders/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   ├── earnings/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── layout.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   │
│   │   │   │   ├── (rider)/
│   │   │   │   │   ├── rider/
│   │   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── orders/
│   │   │   │   │   │   ├── earnings/
│   │   │   │   │   │   └── layout.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   │
│   │   │   │   ├── (admin)/
│   │   │   │   │   ├── admin/
│   │   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── users/
│   │   │   │   │   │   ├── stores/
│   │   │   │   │   │   ├── orders/
│   │   │   │   │   │   ├── riders/
│   │   │   │   │   │   └── layout.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   │
│   │   │   │   ├── api/             # API routes (if needed)
│   │   │   │   │   └── health/
│   │   │   │   │       └── route.ts
│   │   │   │   │
│   │   │   │   ├── layout.tsx       # Root layout
│   │   │   │   ├── page.tsx         # Landing page
│   │   │   │   └── globals.css
│   │   │   │
│   │   │   ├── lib/                 # Utilities & Helpers
│   │   │   │   ├── api/
│   │   │   │   │   ├── client.ts    # Axios/Fetch wrapper
│   │   │   │   │   ├── endpoints.ts
│   │   │   │   │   └── interceptors.ts
│   │   │   │   ├── auth/
│   │   │   │   │   ├── session.ts
│   │   │   │   │   └── tokens.ts
│   │   │   │   ├── hooks/           # Custom React hooks
│   │   │   │   │   ├── useAuth.ts
│   │   │   │   │   ├── useCart.ts
│   │   │   │   │   ├── useOrders.ts
│   │   │   │   │   └── useWebSocket.ts
│   │   │   │   ├── utils/
│   │   │   │   │   ├── formatters.ts
│   │   │   │   │   ├── validators.ts
│   │   │   │   │   └── constants.ts
│   │   │   │   └── websocket/
│   │   │   │       └── client.ts
│   │   │   │
│   │   │   ├── store/               # State Management (Zustand/Redux)
│   │   │   │   ├── slices/
│   │   │   │   │   ├── authSlice.ts
│   │   │   │   │   ├── cartSlice.ts
│   │   │   │   │   ├── orderSlice.ts
│   │   │   │   │   └── uiSlice.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── types/               # TypeScript types
│   │   │   │   ├── api.types.ts
│   │   │   │   ├── user.types.ts
│   │   │   │   ├── product.types.ts
│   │   │   │   ├── order.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── styles/              # Global styles
│   │   │       ├── theme.ts
│   │   │       └── tailwind.config.ts
│   │   │
│   │   ├── .env.local
│   │   ├── .env.example
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── .dockerignore
│   │
│   └── api/                          # Django Backend
│       ├── config/                   # Django settings
│       │   ├── settings/
│       │   │   ├── base.py
│       │   │   ├── development.py
│       │   │   ├── production.py
│       │   │   └── __init__.py
│       │   ├── urls.py
│       │   ├── wsgi.py
│       │   └── asgi.py
│       │
│       ├── apps/                     # Django apps (services)
│       │   │
│       │   ├── users/                # Auth & User Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── admin.py
│       │   │   ├── services.py
│       │   │   ├── permissions.py
│       │   │   └── tests/
│       │   │
│       │   ├── stores/               # Store Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── services.py
│       │   │   └── tests/
│       │   │
│       │   ├── products/             # Product & Inventory Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── services.py
│       │   │   └── tests/
│       │   │
│       │   ├── orders/               # Order Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── services.py
│       │   │   ├── tasks.py         # Celery tasks
│       │   │   └── tests/
│       │   │
│       │   ├── payments/             # Payment Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── razorpay_client.py
│       │   │   └── tests/
│       │   │
│       │   ├── riders/               # Rider Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── services.py
│       │   │   └── tests/
│       │   │
│       │   ├── notifications/        # Notification Service
│       │   │   ├── migrations/
│       │   │   ├── models.py
│       │   │   ├── serializers.py
│       │   │   ├── views.py
│       │   │   ├── urls.py
│       │   │   ├── firebase_client.py
│       │   │   ├── sms_client.py
│       │   │   └── tests/
│       │   │
│       │   └── analytics/            # Analytics Service
│       │       ├── migrations/
│       │       ├── models.py
│       │       ├── serializers.py
│       │       ├── views.py
│       │       ├── urls.py
│       │       └── tests/
│       │
│       ├── core/                     # Shared utilities
│       │   ├── permissions.py
│       │   ├── pagination.py
│       │   ├── exceptions.py
│       │   ├── validators.py
│       │   └── middleware.py
│       │
│       ├── websockets/               # WebSocket handlers
│       │   ├── consumers.py
│       │   ├── routing.py
│       │   └── middleware.py
│       │
│       ├── requirements/
│       │   ├── base.txt
│       │   ├── development.txt
│       │   └── production.txt
│       │
│       ├── manage.py
│       ├── Dockerfile
│       ├── .env
│       └── .env.example
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .gitignore
├── README.md
└── ARCHITECTURE.md
```

---

## 🏗️ Architecture Principles

### 1. **Atomic Design (Frontend)**
- **Atoms**: Indivisible UI components (Button, Input, Icon)
- **Molecules**: Simple composites (SearchBar = Input + Button)
- **Organisms**: Complex sections (Navbar, ProductGrid)
- **Templates**: Page layouts (BuyerLayout, SellerLayout)
- **Pages**: Final implementations (app router pages)

### 2. **Service-Oriented Backend (Django)**
Each app is a bounded context:
- `users` - Authentication, roles, profiles
- `stores` - Store management, location
- `products` - Inventory, catalog
- `orders` - Order lifecycle
- `payments` - Transaction handling
- `riders` - Delivery partner management
- `notifications` - Push, SMS, WhatsApp
- `analytics` - KPIs, reports

### 3. **Component Co-location**
Each component folder contains:
```
ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx   # Unit tests
└── index.ts                 # Barrel export
```

### 4. **State Management Strategy**
- **Local State**: React useState for component-level
- **Global State**: Zustand/Redux for cart, auth, orders
- **Server State**: React Query for API data
- **WebSocket State**: Custom hook for real-time updates

### 5. **API Architecture**
```
Frontend → API Client (lib/api) → Django REST Framework → Services → Database
                                                        ↓
                                                    Celery Tasks
                                                        ↓
                                                    Redis/WebSocket
```

---

## 📋 Phase Execution Plan

### **Phase 1: Foundation (Atoms)**
**Goal**: Build basic UI components with Storybook

**Tasks**:
1. Setup Storybook configuration
2. Create atoms: Button, Input, Icon, Typography, Badge, Avatar, Spinner
3. Write stories for each atom
4. Setup Tailwind theme
5. Add basic tests

**Deliverable**: Functional component library visible in Storybook

---

### **Phase 2: Molecules**
**Goal**: Compose atoms into functional groups

**Components**:
- SearchBar (Input + Icon + Button)
- FormField (Label + Input + Error message)
- ProductCard (Image + Typography + Button)
- StoreCard (Avatar + Typography + Badge)
- OrderStatusBadge (Badge + Icon)
- PriceDisplay (Typography + formatting)
- RatingStars (Icon array + Typography)

**Deliverable**: Reusable composite components

---

### **Phase 3: Organisms**
**Goal**: Build complex UI sections

**Components**:
- Navbar (Brand + SearchBar + Cart icon + User menu)
- Footer (Links + Typography)
- ProductGrid (ProductCard array + filtering)
- CartSidebar (ProductCard list + PriceDisplay + Button)
- OrderTracker (Timeline + StatusBadge + real-time updates)
- StoreList (StoreCard array + filtering)
- LoginForm (FormField array + Button + validation)
- InventoryManager (Product list + toggle switches)

**Deliverable**: Feature-complete UI sections

---

### **Phase 4: Templates**
**Goal**: Create page layouts

**Layouts**:
- AuthLayout (Centered card, no navbar)
- BuyerLayout (Navbar + Footer + main content)
- SellerLayout (Sidebar + Navbar + main content)
- RiderLayout (Minimal navbar + map view)
- AdminLayout (Full dashboard with sidebar)

**Deliverable**: Reusable page structures

---

### **Phase 5: Pages & Routing**
**Goal**: Implement actual pages using templates

**Routes**:
- Buyer: /, /products/:id, /cart, /checkout, /orders, /orders/:id
- Seller: /seller/dashboard, /seller/inventory, /seller/orders
- Rider: /rider/dashboard, /rider/orders
- Admin: /admin/dashboard, /admin/users, /admin/stores
- Auth: /login, /register

**Deliverable**: Complete user journeys

---

### **Phase 6: Backend API Setup**
**Goal**: Django project initialization

**Tasks**:
1. Initialize Django apps (users, stores, products, orders, payments, riders)
2. Setup PostgreSQL + PostGIS
3. Configure JWT authentication
4. Create base models
5. Setup Django REST Framework
6. Configure CORS

**Deliverable**: API foundation

---

### **Phase 7: Backend Services**
**Goal**: Implement business logic per service

**Services**:
- Auth: OTP login, JWT refresh
- Store: CRUD, location-based search
- Inventory: Stock management, availability toggle
- Order: Creation, status updates, assignment
- Payment: Razorpay integration, webhook handling
- Rider: Assignment logic, location tracking

**Deliverable**: Functional APIs

---

### **Phase 8: Real-time Features**
**Goal**: WebSocket implementation

**Features**:
- Order status updates
- Rider location tracking
- Notifications

**Stack**: Django Channels + Redis

**Deliverable**: Live tracking system

---

### **Phase 9: Integration**
**Goal**: Connect frontend to backend

**Tasks**:
1. Setup API client (axios/fetch)
2. Implement authentication flow
3. Connect all pages to APIs
4. Add error handling
5. Implement loading states

**Deliverable**: End-to-end functionality

---

### **Phase 10: Testing & Deployment**
**Goal**: Production readiness

**Tasks**:
1. Unit tests (frontend + backend)
2. Integration tests
3. E2E tests (Playwright/Cypress)
4. Docker optimization
5. CI/CD setup
6. Environment configs

**Deliverable**: Production-ready application

---

## 🔄 Handoff Instructions for Next Chat

When continuing in a new chat, provide this context:

```
# Project Context

We are building a hyper-local delivery platform with:
- Next.js (frontend) + Django (backend)
- Atomic Design component structure
- Storybook for component documentation
- Docker Compose orchestration

## Current Phase: [Phase Number]

## Completed:
- [List completed tasks]

## Next Steps:
- [List next tasks]

## Important Files:
- Project structure: [paste structure]
- Current component: [specify]

## Question:
[Your specific request]
```

---

## 📦 Key Dependencies

### Frontend
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0"
  },
  "devDependencies": {
    "@storybook/react": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
```

### Backend
```txt
Django==5.0
djangorestframework==3.14.0
channels==4.0.0
channels-redis==4.1.0
celery==5.3.0
redis==5.0.0
psycopg2-binary==2.9.9
djangorestframework-simplejwt==5.3.0
razorpay==1.4.0
firebase-admin==6.3.0
```

---

## 🎯 Next Immediate Action

**Start with Phase 1: Atoms**

1. Setup Storybook
2. Create Button component
3. Create Input component
4. Test in Storybook

---

## ✅ Component Checklist Template

Use this for each component:

```
[ ] Create component file (.tsx)
[ ] Add TypeScript props interface
[ ] Implement component logic
[ ] Add Tailwind styling
[ ] Create Storybook story (.stories.tsx)
[ ] Add variants in Storybook
[ ] Write unit tests (.test.tsx)
[ ] Add JSDoc comments
[ ] Export in index.ts
[ ] Verify in Storybook UI
```

---

This structure ensures:
✅ Scalability
✅ Maintainability
✅ Clear separation of concerns
✅ Easy onboarding
✅ Testability
✅ Documentation

Ready to start Phase 1?
