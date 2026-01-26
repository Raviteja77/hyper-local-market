# Initial Setup Instructions

## Step 1: Create Project Structure

```bash
mkdir -p services/web services/api
```

## Step 2: Place Files

1. Copy `docker-compose.yml` to root
2. Copy `.gitignore` to root
3. Copy `Dockerfile` to `services/web/`
4. Copy `Dockerfile` to `services/api/`
5. Copy `package.json` to `services/web/`
6. Copy `requirements.txt` to `services/api/`

## Step 3: Initialize Next.js

```bash
# Create basic Next.js files
cd services/web
npx create-next-app@14.2.0 . --typescript --tailwind --app --no-src
cd ../..
```

## Step 4: Initialize Django

```bash
# Run Django initialization in Docker
docker-compose run --rm backend django-admin startproject config .
```

## Step 5: Build & Start

```bash
docker-compose build
docker-compose up
```

**Frontend**: http://localhost:3000
**Backend**: http://localhost:8000
**Storybook**: `docker-compose exec frontend npm run storybook`

## Step 6: Create Django Apps

```bash
docker-compose exec backend python manage.py startapp users apps/users
docker-compose exec backend python manage.py startapp stores apps/stores
docker-compose exec backend python manage.py startapp products apps/products
docker-compose exec backend python manage.py startapp orders apps/orders
docker-compose exec backend python manage.py startapp payments apps/payments
docker-compose exec backend python manage.py startapp riders apps/riders
docker-compose exec backend python manage.py startapp notifications apps/notifications
```

## Ready for Phase 1!

After setup, organize frontend into the atomic design structure and continue with atoms.