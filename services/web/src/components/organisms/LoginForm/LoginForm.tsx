'use client';

import React, { useState } from 'react';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { FormField } from '../../molecules';
import { Button, Typography } from '../../atoms';

export interface LoginFormProps {
  onSubmit: (data: { phone: string; otp?: string }) => void;
  onResendOTP?: () => void;
  loading?: boolean;
  error?: string;
  mode?: 'phone' | 'otp';
  phoneNumber?: string;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onResendOTP,
  loading = false,
  error,
  mode: initialMode = 'phone',
  phoneNumber: initialPhone = '',
  className = '',
}) => {
  const [mode, setMode] = useState<'phone' | 'otp'>(initialMode);
  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!value) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateOTP = (value: string): boolean => {
    if (!value) {
      setOtpError('OTP is required');
      return false;
    }
    if (value.length < 4 || value.length > 6) {
      setOtpError('OTP must be 4-6 digits');
      return false;
    }
    setOtpError('');
    return true;
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      onSubmit({ phone });
      setMode('otp');
      setResendTimer(30);
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOTP(otp)) {
      onSubmit({ phone, otp });
    }
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      onResendOTP?.();
      setResendTimer(30);
      setOtp('');
    }
  };

  const handleChangeNumber = () => {
    setMode('phone');
    setOtp('');
    setOtpError('');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md ${className}`}>
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <ShoppingBag size={32} color="white" />
        </div>
      </div>

      <Typography variant="h2" weight="bold" className="mb-2">
        {mode === 'phone' ? 'Welcome Back' : 'Verify OTP'}
      </Typography>
      <Typography variant="body" color="muted" className="mb-6">
        {mode === 'phone'
          ? 'Enter your phone number to continue'
          : `Enter the 6-digit code sent to +91 ${phone}`}
      </Typography>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200-lg flex items-start gap-2">
          <AlertCircle size={20} color="#EF4444" />
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        </div>
      )}

      {mode === 'phone' ? (
        <form onSubmit={handlePhoneSubmit}>
          <FormField
            label="Phone Number"
            type="tel"
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError('');
            }}
            errorMessage={phoneError}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOTPSubmit}>
          <FormField
            label="OTP"
            type="text"
            placeholder="Enter 4-6 digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(value);
              setOtpError('');
            }}
            errorMessage={otpError}
            required
            disabled={loading}
          />

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleChangeNumber}
              className="text-sm text-primary hover:underline"
              disabled={loading}
            >
              Change Number
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              className={`text-sm ${
                resendTimer > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary hover:underline'
              }`}
              disabled={resendTimer > 0 || loading}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Typography variant="caption" color="muted">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Typography>
      </div>
    </div>
  );
};