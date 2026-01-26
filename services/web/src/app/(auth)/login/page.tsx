'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/templates';
import { LoginForm } from '@/components/organisms';

export default function LoginPage() {
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
        // Verify OTP
        console.log('Verifying OTP:', data.otp, 'for phone:', data.phone);
        // Redirect to dashboard after successful login
        // router.push('/');
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
    <AuthLayout
      title="HyperLocal"
      subtitle="Fresh groceries from local stores, delivered fast"
    >
      <LoginForm
        onSubmit={handleSubmit}
        onResendOTP={handleResendOTP}
        loading={loading}
        error={error}
        mode={mode}
        phoneNumber={phoneNumber}
      />
    </AuthLayout>
  );
}