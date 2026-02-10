from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Store
from apps.products.models import Inventory
from .serializers import (
    StoreSerializer, 
    StoreDetailSerializer,
    StoreInventorySerializer
)


class StoreViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Store operations.
    
    list: Get all active and verified stores
    retrieve: Get store detail
    inventory: Get store's inventory
    """
    permission_classes = [AllowAny]  # Public browsing
    
    def get_queryset(self):
        """Filter active and verified stores"""
        queryset = Store.objects.filter(is_active=True, is_verified=True)
        
        # Filter by location (nearby search)
        lat = self.request.query_params.get('lat')
        lon = self.request.query_params.get('lon')
        
        if lat and lon:
            # For simplicity, we're returning all stores
            # In production, you'd want to filter by radius
            # or use PostGIS for geospatial queries
            queryset = queryset.order_by('id')
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer"""
        if self.action == 'retrieve':
            return StoreDetailSerializer
        return StoreSerializer
    
    def get_serializer_context(self):
        """Pass user location to serializer context"""
        context = super().get_serializer_context()
        lat = self.request.query_params.get('lat')
        lon = self.request.query_params.get('lon')
        if lat and lon:
            context['user_lat'] = lat
            context['user_lon'] = lon
        return context
    
    def list(self, request, *args, **kwargs):
        """List stores, sorted by distance if location provided"""
        queryset = self.get_queryset()
        
        # Get pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            
            # Sort by distance if available
            lat = request.query_params.get('lat')
            lon = request.query_params.get('lon')
            if lat and lon:
                data = sorted(data, key=lambda x: x['distance'] if x['distance'] is not None else float('inf'))
            
            return self.get_paginated_response(data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def inventory(self, request, pk=None):
        """
        Get store's inventory with product details.
        
        Query params:
        - in_stock: Filter by stock availability (true/false)
        - category: Filter by product category
        """
        store = self.get_object()
        
        # Get inventory for this store
        queryset = Inventory.objects.filter(store=store).select_related('product')
        
        # Filter by stock availability
        in_stock = request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(in_stock=True)
        
        # Filter by product category
        category = request.query_params.get('category')
        if category:
            queryset = queryset.filter(product__category=category)
        
        # Paginate results
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = StoreInventorySerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = StoreInventorySerializer(queryset, many=True)
        return Response(serializer.data)
