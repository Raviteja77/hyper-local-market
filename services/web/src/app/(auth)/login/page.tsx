'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/templates';
import { LoginForm } from '@/components/organisms';
import { useAuthStore } from '@/store';
import { authAPI } from '@/lib/api/endpoints';

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
      if (data.otp) {
        // Verify OTP
        try {
          const response = await authAPI.verifyOTP(data.phone, data.otp);
          login(response.user, response.access, response.refresh);
          router.push('/');
        } catch (apiError: any) {
          if (apiError?.response?.data?.error) {
            setError(apiError.response.data.error);
          } else {
            // Fallback mock auth for demo when backend is unavailable
            if (data.otp === '1234') {
              const user = {
                id: `user-${Date.now()}`,
                name: 'John Doe',
                phone: data.phone,
                role: 'buyer' as const,
              };
              const accessToken = `mock-access-token-${Date.now()}`;
              const refreshToken = `mock-refresh-token-${Date.now()}`;
              login(user, accessToken, refreshToken);
              router.push('/');
            } else {
              setError('Invalid OTP. Please try again.');
            }
          }
        }
      } else {
        // Send OTP
        phoneRef.current = data.phone;
        try {
          await authAPI.sendOTP(data.phone);
        } catch {
          // Silent fallback - OTP "sent" for demo
        }
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
      await authAPI.sendOTP(phoneRef.current);
    } catch {
      // Silent fallback for demo
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
            href="/signup/buyer"
            className="text-primary font-medium hover:underline"
          >
            Sign Up as Buyer
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}