"""
WebSocket authentication middleware.
"""
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from urllib.parse import parse_qs

User = get_user_model()


class JWTAuthMiddleware(BaseMiddleware):
    """
    JWT authentication middleware for WebSocket connections.
    
    Extracts JWT token from query string and authenticates the user.
    Token should be passed as: ws://example.com/ws/orders/?token=<jwt_token>
    """
    
    async def __call__(self, scope, receive, send):
        # Parse query string to get token
        query_string = scope.get('query_string', b'').decode('utf-8')
        query_params = parse_qs(query_string)
        token = query_params.get('token', [None])[0]
        
        # Try to authenticate user
        if token:
            scope['user'] = await self.get_user_from_token(token)
        else:
            scope['user'] = AnonymousUser()
        
        return await super().__call__(scope, receive, send)
    
    @database_sync_to_async
    def get_user_from_token(self, token):
        """
        Get user from JWT access token.
        """
        try:
            # Decode token
            access_token = AccessToken(token)
            user_id = access_token.payload.get('user_id')
            
            # Get user from database
            user = User.objects.get(id=user_id)
            return user
        except (InvalidToken, TokenError, User.DoesNotExist):
            return AnonymousUser()
