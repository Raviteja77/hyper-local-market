'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/templates';
import { LoginForm } from '@/components/organisms';
import { useAuthStore } from '@/store';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const phoneRef = useRef('');

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
        phoneRef.current = data.phone;
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
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleSubmit}
        onResendOTP={handleResendOTP}
        loading={loading}
        error={error}
      />
      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-gray-500">
          For testing, use OTP: <strong>1234</strong>
        </p>
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}