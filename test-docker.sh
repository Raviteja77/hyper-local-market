#!/bin/bash
# Test script to verify Docker setup

echo "Testing Docker Compose setup..."
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker Compose is available"
echo ""

# Stop any running containers
echo "Stopping existing containers..."
docker-compose down > /dev/null 2>&1

# Remove old volumes for clean start
echo "Removing old volumes..."
docker-compose down -v > /dev/null 2>&1

echo ""
echo "Starting services..."
echo "This may take a few minutes on first run..."
echo ""

# Start services with build
docker-compose up -d --build

echo ""
echo "Waiting for services to be ready..."
sleep 10

# Check service status
echo ""
echo "Service Status:"
docker-compose ps

echo ""
echo "Checking backend logs (last 20 lines):"
docker-compose logs --tail=20 backend

echo ""
echo "Testing backend connection..."
max_wait=60
waited=0

while [ $waited -lt $max_wait ]; do
    if curl -s http://localhost:8000/admin/ > /dev/null 2>&1; then
        echo "✅ Backend is responding!"
        echo ""
        echo "Access points:"
        echo "  - Backend API: http://localhost:8000"
        echo "  - Admin Panel: http://localhost:8000/admin"
        echo "  - Admin Credentials: admin / admin123"
        echo ""
        echo "To view logs: docker-compose logs -f"
        echo "To stop: docker-compose down"
        exit 0
    fi
    sleep 2
    waited=$((waited + 2))
    echo "Waiting for backend... ($waited/$max_wait seconds)"
done

echo ""
echo "❌ Backend did not respond in time"
echo ""
echo "Debugging information:"
echo ""
echo "Database logs:"
docker-compose logs --tail=30 db
echo ""
echo "Backend logs:"
docker-compose logs --tail=50 backend

exit 1
