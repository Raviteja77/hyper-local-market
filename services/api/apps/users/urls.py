from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'users'

router = DefaultRouter()
router.register(r'addresses', views.AddressViewSet, basename='address')

urlpatterns = [
    path('signup/buyer/', views.BuyerSignupView.as_view(), name='buyer-signup'),
    path('', include(router.urls)),
]
