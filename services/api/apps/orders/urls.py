from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'orders'

router = DefaultRouter()
router.register(r'coupons', views.CouponViewSet, basename='coupon')

urlpatterns = [
    path('', include(router.urls)),
]
