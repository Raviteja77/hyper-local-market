# HANDOFF INSTRUCTIONS - Hyper-Local Market Project

> **Use this file when starting a new chat to provide complete context**

---

## 📌 Project Overview

**Project Name**: Hyper-Local Decentralized Grocery Delivery Platform

**Tech Stack**:
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Backend: Django + Django REST Framework
- Database: PostgreSQL + PostGIS
- Real-time: Redis + WebSockets (Django Channels)
- State: Zustand + React Query
- UI Docs: Storybook
- Container: Docker + Docker Compose

**Architecture**: Atomic Design (Atoms → Molecules → Organisms → Templates → Pages)

---

## 🎯 Project Goal

Build a platform connecting:
1. **Buyers** (customers ordering groceries)
2. **Sellers** (local kirana stores with inventory)
3. **Riders** (delivery partners)
4. **Admin** (operations management)

**Key Features**:
- Location-based store search
- Real-time inventory management
- Live order tracking (WebSocket)
- Multi-language seller interface
- Payment integration (Razorpay)
- SLA-based delivery

---

## 📁 Folder Structure Summary

```
hyper-local-market/
├── services/
│   ├── web/                    # Next.js Frontend
│   │   ├── .storybook/         # Storybook config
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── atoms/      # Button, Input, Icon, etc.
│   │   │   │   ├── molecules/  # SearchBar, FormField, ProductCard
│   │   │   │   ├── organisms/  # Navbar, CartSidebar, OrderTracker
│   │   │   │   └── templates/  # AuthLayout, BuyerLayout, etc.
│   │   │   ├── app/            # Next.js pages (App Router)
│   │   │   ├── lib/            # API client, hooks, utils
│   │   │   ├── store/          # Zustand state slices
│   │   │   └── types/          # TypeScript types
│   │
│   └── api/                    # Django Backend
│       ├── config/             # Django settings
│       ├── apps/
│       │   ├── users/          # Auth & user service
│       │   ├── stores/         # Store management
│       │   ├── products/       # Inventory service
│       │   ├── orders/         # Order lifecycle
│       │   ├── payments/       # Payment gateway
│       │   ├── riders/         # Delivery partners
│       │   └── notifications/  # Push/SMS/WhatsApp
│       └── websockets/         # Real-time handlers
│
└── docker-compose.yml
```

---

## 🚀 Phase Execution Plan

### **Current Phase**: [SPECIFY CURRENT PHASE]

### **Phase Checklist**:

- [ ] **Phase 1: Atoms** - Basic components (Button, Input, Icon, Typography, Badge, Avatar, Spinner)
- [ ] **Phase 2: Molecules** - Composites (SearchBar, FormField, ProductCard, StoreCard, RatingStars)
- [ ] **Phase 3: Organisms** - Complex sections (Navbar, Footer, ProductGrid, CartSidebar, OrderTracker, LoginForm)
- [ ] **Phase 4: Templates** - Layouts (AuthLayout, BuyerLayout, SellerLayout, RiderLayout, AdminLayout)
- [ ] **Phase 5: Pages** - Routes (Buyer, Seller, Rider, Admin flows)
- [ ] **Phase 6: Backend API** - Django setup, models, JWT auth
- [ ] **Phase 7: Services** - Business logic per module
- [ ] **Phase 8: Real-time** - WebSocket implementation
- [ ] **Phase 9: Integration** - Frontend ↔ Backend connection
- [ ] **Phase 10: Deployment** - Testing, CI/CD, production

---

## 📝 Component Creation Pattern

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
└── index.ts                   # Export
```

**Example Component Template**:

```typescript
// Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  // Implementation
  return <button>{children}</button>;
};
```

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

---

## 🔧 Current Working Context

### **Last Completed**:
[SPECIFY WHAT WAS COMPLETED - e.g., "Created Button and Input atoms with Storybook stories"]

### **Next Task**:
[SPECIFY NEXT TASK - e.g., "Create Icon atom component with multiple icon variants"]

### **Blockers/Notes**:
[ANY ISSUES OR IMPORTANT NOTES]

---

## 💡 Key Implementation Rules

### **Frontend**:
1. **Always use TypeScript** with proper interfaces
2. **Tailwind CSS only** - no inline styles or CSS modules
3. **Each component needs**:
   - Props interface
   - Storybook story
   - Unit test
   - JSDoc comments
4. **Barrel exports** in index.ts for each level
5. **Responsive design** - mobile-first approach

### **Backend**:
1. **Django apps** follow service-oriented architecture
2. **Use serializers** for all API responses
3. **JWT authentication** with refresh tokens
4. **Celery tasks** for async operations (email, notifications)
5. **PostGIS** for location queries

### **State Management**:
- **Local state**: useState
- **Global state**: Zustand (auth, cart, UI)
- **Server state**: React Query
- **Real-time**: WebSocket custom hook

---

## 📦 Dependencies Reference

### **Frontend** (package.json):
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@storybook/react": "^7.6.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
```

### **Backend** (requirements/base.txt):
```
Django==5.0
djangorestframework==3.14.0
channels==4.0.0
celery==5.3.0
redis==5.0.0
psycopg2-binary==2.9.9
djangorestframework-simplejwt==5.3.0
```

---

## 🎨 Design System

### **Colors** (Tailwind Config):
```javascript
colors: {
  primary: '#10B981',    // Green
  secondary: '#3B82F6',  // Blue
  accent: '#F59E0B',     // Amber
  danger: '#EF4444',     // Red
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Amber
}
```

### **Spacing Scale**: 4px base (4, 8, 12, 16, 24, 32, 48, 64)

### **Typography**:
- Display: text-4xl font-bold
- Heading 1: text-3xl font-semibold
- Heading 2: text-2xl font-semibold
- Body: text-base
- Small: text-sm

---

## 🐛 Common Patterns

### **API Call Pattern**:
```typescript
// lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **WebSocket Hook Pattern**:
```typescript
// lib/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useWebSocket = (event: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL);
    socket.on(event, setData);
    return () => socket.disconnect();
  }, [event]);

  return data;
};
```

---

## 📋 Task Checklist Template

Use this for each component/feature:

```
[ ] Create component/feature file
[ ] Add TypeScript types/interfaces
[ ] Implement core logic
[ ] Add styling (Tailwind)
[ ] Create Storybook story (frontend only)
[ ] Write unit tests
[ ] Add documentation (JSDoc/comments)
[ ] Export in index.ts
[ ] Verify functionality
[ ] Update this handoff document
```

---

## 🔄 How to Use This File in Next Chat

**Copy-paste this exact prompt**:

```
I'm continuing work on the Hyper-Local Market project. Here's the complete context:

[PASTE ENTIRE HANDOFF_INSTRUCTIONS.md]

Current Phase: [Phase X]
Last Completed: [What you finished]
Next Task: [What you need help with]

My question: [Your specific question]
```

---

## 🎯 Immediate Next Steps

Based on current phase, the next tasks are:

**If Phase 1 (Atoms)**:
1. Setup Storybook configuration
2. Create Button component with variants
3. Create Input component with validation states
4. Create Icon component using lucide-react

**If Phase 2 (Molecules)**:
1. Build SearchBar (Input + Icon)
2. Build FormField (Label + Input + Error)
3. Build ProductCard (Image + Text + Button)

**If Phase 3 (Organisms)**:
1. Build Navbar (Logo + SearchBar + Cart + User)
2. Build ProductGrid (ProductCard array + filters)
3. Build CartSidebar (Cart items + total + checkout)

[Continue for other phases...]

---

## 📞 Key Questions to Ask in New Chat

1. "I need help creating [Component Name] in the [atoms/molecules/organisms] folder"
2. "Show me the implementation for [specific feature]"
3. "How do I connect [Component] to the backend API?"
4. "What's the proper structure for [specific file/folder]?"
5. "Can you review my [component/code] and suggest improvements?"

---

## ✅ Success Criteria

Each phase is complete when:
- [ ] All components built per phase plan
- [ ] Storybook shows all variants
- [ ] Tests pass
- [ ] Code follows patterns above
- [ ] Documentation updated
- [ ] Ready for next phase

---

**Last Updated**: [DATE]
**Current Phase**: [PHASE NUMBER]
**Next Milestone**: [DESCRIPTION]

---

