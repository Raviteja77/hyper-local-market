from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Product
from .serializers import (
    ProductSerializer, 
    ProductDetailSerializer, 
    CategorySerializer
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Product operations.
    
    list: Get all active products with pagination
    retrieve: Get product detail with inventory
    search: Search products with filters
    categories: List all product categories
    """
    permission_classes = [AllowAny]  # Public browsing
    
    def get_queryset(self):
        """Filter active products"""
        queryset = Product.objects.filter(is_active=True)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(mrp__gte=min_price)
        if max_price:
            queryset = queryset.filter(mrp__lte=max_price)
        
        # Filter by stock availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(inventory__in_stock=True).distinct()
        
        # Filter by store
        store_id = self.request.query_params.get('store_id')
        if store_id:
            queryset = queryset.filter(inventory__store_id=store_id).distinct()
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer"""
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer
    
    def get_serializer_context(self):
        """Pass store_id to serializer context"""
        context = super().get_serializer_context()
        store_id = self.request.query_params.get('store_id')
        if store_id:
            context['store_id'] = store_id
        return context
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Search products by name.
        
        Query params:
        - q: Search query
        - category: Filter by category
        - min_price, max_price: Price range
        - in_stock: Filter by stock availability
        - store_id: Filter by store
        """
        query = request.query_params.get('q', '')
        
        if not query:
            return Response(
                {'error': 'Search query parameter "q" is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Search in name and description
        queryset = self.get_queryset().filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
        
        # Paginate results
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """
        List all available product categories.
        """
        categories = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Product.CATEGORY_CHOICES
        ]
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
