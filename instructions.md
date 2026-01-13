# Component Architecture (Atomic Design)

This project follows Atomic Design principles for organizing components.

## Structure

### 1. Atoms (`/atoms`)
**Basic building blocks.**
- Cannot be broken down further.
- Examples: `Button`, `Input`, `Icon`, `Typography`.
- *Dependencies:* None (mostly).

### 2. Molecules (`/molecules`)
**Simple groups of UI elements.**
- Combinations of atoms functioning together.
- Examples: `SearchBar` (Input + Button), `FormField` (Label + Input + Error).
- *Dependencies:* Atoms.

### 3. Organisms (`/organisms`)
**Complex UI sections.**
- Distinct sections of an interface.
- Examples: `Navbar`, `ProductCard`, `Footer`, `LoginForm`.
- *Dependencies:* Molecules, Atoms.

### 4. Templates (`/templates`)
**Page layouts.**
- Skeletal structures of pages.
- Examples: `AuthLayout`, `DashboardLayout`, `CheckoutPageTemplate`.
