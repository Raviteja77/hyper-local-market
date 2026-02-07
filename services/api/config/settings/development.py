# config/settings/development.py
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

# Database will be configured via environment variable DATABASE_URL
# or default to SQLite if not provided