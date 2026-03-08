#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL with timeout
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if pg_isready -h db -p 5432 -U postgres > /dev/null 2>&1; then
    echo "PostgreSQL is ready!"
    break
  fi
  
  attempt=$((attempt + 1))
  echo "Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "ERROR: PostgreSQL did not become ready in time"
  exit 1
fi

echo "Running migrations..."
python manage.py migrate --noinput

echo "Creating sample data if needed..."
python manage.py populate_sample_data || echo "Sample data already exists or failed to create"

echo "Starting Django server..."
exec "$@"
