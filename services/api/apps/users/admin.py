from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Address


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'phone', 'role', 'is_phone_verified', 'created_at']
    list_filter = ['role', 'is_phone_verified', 'is_active']
    search_fields = ['username', 'email', 'phone']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('role', 'phone', 'avatar', 'is_phone_verified')
        }),
    )


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'type', 'full_name', 'city', 'pincode', 'is_default']
    list_filter = ['type', 'is_default', 'city']
    search_fields = ['user__username', 'full_name', 'phone', 'city']
