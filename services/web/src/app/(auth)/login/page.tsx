'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/templates';
import { LoginForm } from '@/components/organisms';
import { useAuthStore } from '@/store';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (data: { phone: string; otp?: string }) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.otp) {
        // Verify OTP - Mock authentication
        if (data.otp === '1234') {
          // Mock user data
          const user = {
            id: `user-${Date.now()}`,
            name: 'John Doe',
            phone: data.phone,
            role: 'buyer' as const,
            avatar: 'https://i.pravatar.cc/150?img=1',
          };
          
          // Mock tokens
          const accessToken = `mock-access-token-${Date.now()}`;
          const refreshToken = `mock-refresh-token-${Date.now()}`;
          
          // Login using auth store
          login(user, accessToken, refreshToken);
          
          // Redirect to buyer home page
          router.push('/');
        } else {
          setError('Invalid OTP. Use 1234 for testing.');
        }
      } else {
        // Send OTP
        console.log('Sending OTP to:', data.phone);
        setPhoneNumber(data.phone);
        setMode('otp');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resending OTP to:', phoneNumber);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Sign in to continue shopping</p>
        <LoginForm
          onSubmit={handleSubmit}
          onResendOTP={handleResendOTP}
          loading={loading}
          error={error}
          mode={mode}
          phoneNumber={phoneNumber}
        />
        <p className="text-sm text-gray-500 mt-4 text-center">
          For testing, use OTP: <strong>1234</strong>
        </p>
      </div>
    </AuthLayout>
  );
}