from django.contrib import admin
from .models import Store


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'city', 'is_active', 'is_verified', 'rating']
    list_filter = ['is_active', 'is_verified', 'city']
    search_fields = ['name', 'owner__username', 'phone']
