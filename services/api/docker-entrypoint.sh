#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done

echo "PostgreSQL is ready!"

echo "Running migrations..."
python manage.py migrate --noinput

echo "Creating sample data if needed..."
python manage.py populate_sample_data || echo "Sample data already exists or command not available"

echo "Starting server..."
exec "$@"
