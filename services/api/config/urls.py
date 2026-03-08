from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.users.views import SendOTPView, VerifyOTPView, ProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # JWT Authentication
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # OTP Authentication
    path('api/auth/send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('api/auth/verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh_alt'),
    
    # User Profile
    path('api/auth/me/', ProfileView.as_view(), name='profile'),
    
    # App URLs
    path('api/users/', include('apps.users.urls')),
    path('api/stores/', include('apps.stores.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/payments/', include('apps.payments.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
