// Auth Store - Buyer Flow Regression Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/slices/authSlice';

describe('Auth Store - Buyer Flow', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  describe('Initial State', () => {
    it('should start with no authenticated user', () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('Buyer Login', () => {
    it('should login a buyer user with tokens', () => {
      const { login } = useAuthStore.getState();
      const buyerUser = {
        id: 'buyer-1',
        name: 'Test Buyer',
        phone: '9876543210',
        role: 'buyer' as const,
        email: 'buyer@test.com',
      };

      login(buyerUser, 'access-token-123', 'refresh-token-456');

      const state = useAuthStore.getState();
      expect(state.user).toEqual(buyerUser);
      expect(state.accessToken).toBe('access-token-123');
      expect(state.refreshToken).toBe('refresh-token-456');
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set user role as buyer', () => {
      const { login } = useAuthStore.getState();
      login(
        { id: 'b1', name: 'Buyer', phone: '1234567890', role: 'buyer' },
        'at',
        'rt'
      );

      expect(useAuthStore.getState().user?.role).toBe('buyer');
    });

    it('should clear any previous errors on login', () => {
      useAuthStore.setState({ error: 'Previous error' });
      const { login } = useAuthStore.getState();

      login(
        { id: 'b1', name: 'Buyer', phone: '1234567890', role: 'buyer' },
        'at',
        'rt'
      );

      expect(useAuthStore.getState().error).toBeNull();
    });
  });

  describe('Buyer Logout', () => {
    it('should clear all auth state on logout', () => {
      // First, login
      useAuthStore.getState().login(
        { id: 'b1', name: 'Buyer', phone: '1234567890', role: 'buyer' },
        'access-token',
        'refresh-token'
      );

      // Verify logged in
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Logout
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('Profile Update', () => {
    it('should update buyer profile fields', () => {
      // Login first
      useAuthStore.getState().login(
        { id: 'b1', name: 'Old Name', phone: '1234567890', role: 'buyer' },
        'at',
        'rt'
      );

      // Update profile
      useAuthStore.getState().updateUser({ name: 'New Name', email: 'new@test.com' });

      const user = useAuthStore.getState().user;
      expect(user?.name).toBe('New Name');
      expect(user?.email).toBe('new@test.com');
      expect(user?.phone).toBe('1234567890'); // unchanged
      expect(user?.role).toBe('buyer'); // unchanged
    });

    it('should not update user if not logged in', () => {
      useAuthStore.getState().updateUser({ name: 'New Name' });
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe('Token Management', () => {
    it('should set tokens separately', () => {
      useAuthStore.getState().setTokens('new-access', 'new-refresh');

      const state = useAuthStore.getState();
      expect(state.accessToken).toBe('new-access');
      expect(state.refreshToken).toBe('new-refresh');
    });
  });

  describe('Loading and Error States', () => {
    it('should track loading state', () => {
      useAuthStore.getState().setLoading(true);
      expect(useAuthStore.getState().isLoading).toBe(true);

      useAuthStore.getState().setLoading(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });

    it('should set and clear errors', () => {
      useAuthStore.getState().setError('Login failed');
      expect(useAuthStore.getState().error).toBe('Login failed');
      expect(useAuthStore.getState().isLoading).toBe(false);

      useAuthStore.getState().clearError();
      expect(useAuthStore.getState().error).toBeNull();
    });
  });
});
