// services/web/src/lib/hooks/useAuth.ts
import { useState } from 'react';
import { useAuthStore, User } from '@/store';
import { authAPI } from '@/lib/api/endpoints';
import { useRouter } from 'next/navigation';

interface SendOTPResponse {
  success: boolean;
  message: string;
}

interface VerifyOTPResponse {
  user: User;
  access: string;
  refresh: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    user,
    isAuthenticated,
    login,
    logout: storeLogout,
    updateUser,
    setLoading: setStoreLoading,
    setError: setStoreError,
  } = useAuthStore();

  // Send OTP to phone number
  const sendOTP = async (phone: string): Promise<SendOTPResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.sendOTP(phone);
      setIsLoading(false);
      return {
        success: true,
        message: 'OTP sent successfully',
      };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      setIsLoading(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  // Verify OTP and login
  const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      const response = await authAPI.verifyOTP(phone, otp);
      
      // Store user and tokens
      login(response.user, response.access, response.refresh);
      
      setIsLoading(false);
      setStoreLoading(false);

      // Redirect based on user role
      redirectAfterLogin(response.user.role);

      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid OTP';
      setError(errorMessage);
      setStoreError(errorMessage);
      setIsLoading(false);
      setStoreLoading(false);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);

    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      storeLogout();
      setIsLoading(false);
      router.push('/login');
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await authAPI.updateProfile(updates);
      updateUser(updatedUser);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Fetch current user (useful for refreshing user data)
  const fetchCurrentUser = async (): Promise<boolean> => {
    setIsLoading(true);

    try {
      const currentUser = await authAPI.getCurrentUser();
      updateUser(currentUser);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
      setIsLoading(false);
      return false;
    }
  };

  // Helper function to redirect after login based on role
  const redirectAfterLogin = (role: User['role']) => {
    switch (role) {
      case 'buyer':
        router.push('/');
        break;
      case 'seller':
        router.push('/seller/dashboard');
        break;
      case 'rider':
        router.push('/rider/dashboard');
        break;
      case 'admin':
        router.push('/admin/dashboard');
        break;
      default:
        router.push('/');
    }
  };

  // Check if user has specific role
  const hasRole = (role: User['role']): boolean => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles: User['role'][]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    sendOTP,
    verifyOTP,
    logout,
    updateProfile,
    fetchCurrentUser,

    // Helpers
    hasRole,
    hasAnyRole,
    redirectAfterLogin,
  };
};