# Docker Setup Guide

## ⚡ Quick Start

**Important:** On first run or after cleaning volumes, the database initialization may take 30-60 seconds. The backend will wait for the database to be ready before starting.

### Start all services (backend + database + redis):

```bash
docker-compose up --build
```

The backend will be available at `http://localhost:8000` (after database initialization)

### Automated Testing Script:

```bash
./test-docker.sh
```

This script will:
- Clean up old containers and volumes
- Build and start all services
- Wait for services to be ready
- Verify backend is responding
- Show access points and credentials

### Start in detached mode:

```bash
docker-compose up -d --build
```

### View logs:

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Database only
docker-compose logs -f db
```

### Stop services:

```bash
docker-compose down
```

### Stop and remove volumes (clean slate):

```bash
docker-compose down -v
```

## What Happens on Startup

The backend container automatically:
1. Waits for PostgreSQL to be ready
2. Runs database migrations
3. Creates sample data (if not already present)
4. Starts the Django development server

## Services

### Backend (Django API)
- Port: `8000`
- URL: `http://localhost:8000`
- Admin: `http://localhost:8000/admin`
- Settings: Automatically uses PostgreSQL from environment

### Database (PostgreSQL with PostGIS)
- Port: `5432`
- Database: `hyper_local_db`
- User: `postgres`
- Password: `postgres`

### Redis
- Port: `6379`
- Used for caching and Celery tasks

### Frontend (Next.js)
- Port: `3000`
- URL: `http://localhost:3000`
- Configured to connect to backend at `http://localhost:8000`

## Test Credentials

After startup, use these credentials:

**Admin Panel** (`http://localhost:8000/admin`):
- Username: `admin`
- Password: `admin123`

**API Testing**:
- Buyer: `buyer1` / `test123`
- Seller: `seller1` / `test123`
- Rider: `rider1` / `test123`

## Troubleshooting

### Port already in use

If you get "port already allocated" error:

```bash
# Check what's using the port
lsof -i :8000  # or :5432, :6379, :3000

# Stop the conflicting service or change the port in docker-compose.yml
```

### Database connection issues

If you see "db:5432 - no response" errors:

```bash
# Stop all services
docker-compose down

# Remove volumes to ensure clean state
docker-compose down -v

# Rebuild and start (this ensures fresh database)
docker-compose up --build

# OR if you want to keep data, just restart
docker-compose restart db
docker-compose restart backend
```

**Common causes:**
- Database container is still initializing (can take 10-30 seconds)
- Old volumes with corrupted data
- Port 5432 already in use on host

**Check database health:**
```bash
# Check database logs
docker-compose logs db

# Verify database is running
docker-compose ps

# Test database connection manually
docker-compose exec db psql -U postgres -d hyper_local_db -c "SELECT 1;"
```

### Reset everything

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Rebuild and start fresh
docker-compose up --build
```

### Execute commands in running container

```bash
# Open shell in backend container
docker-compose exec backend bash

# Run Django management commands
docker-compose exec backend python manage.py shell
docker-compose exec backend python manage.py createsuperuser
```

### Database migrations

Migrations run automatically on startup, but you can run manually:

```bash
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

### Populate sample data manually

```bash
docker-compose exec backend python manage.py populate_sample_data
```

## Development Workflow

1. **Start services**: `docker-compose up -d`
2. **Make code changes**: Edit files in `services/api/` or `services/web/`
3. **Changes auto-reload**: Both Django and Next.js have hot reload
4. **View logs**: `docker-compose logs -f backend`
5. **Stop when done**: `docker-compose down`

## Production Deployment

For production, use:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Make sure to:
- Set proper environment variables
- Use strong SECRET_KEY
- Set DEBUG=False
- Configure proper ALLOWED_HOSTS
- Use production-grade database credentials
- Set up SSL/HTTPS
- Configure proper CORS origins

## Notes

- The backend uses volume mounts, so code changes reflect immediately
- Database data persists in named volumes
- Sample data is created automatically on first run
- PostgreSQL with PostGIS is used for location features
