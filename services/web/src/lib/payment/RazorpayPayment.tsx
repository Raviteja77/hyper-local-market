'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { paymentAPI } from '../api/endpoints';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  orderId: string;
  amount: number;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Razorpay Payment Component
 * 
 * Integrates with Razorpay payment gateway to process online payments.
 */
export function RazorpayPayment({
  orderId,
  amount,
  onSuccess,
  onFailure,
  onDismiss,
  disabled = false,
  children,
  className = '',
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      console.error('Razorpay SDK not loaded');
      return;
    }

    setIsLoading(true);

    try {
      // Create payment intent on backend
      const paymentData = await paymentAPI.createPaymentIntent(orderId);

      // Check if Razorpay is configured
      if (!paymentData.razorpay_key_id || !paymentData.razorpay_order_id) {
        throw new Error('Razorpay not configured on server');
      }

      const options: RazorpayOptions = {
        key: paymentData.razorpay_key_id,
        amount: paymentData.amount,
        currency: paymentData.currency || 'INR',
        name: 'Hyper Local Market',
        description: `Payment for order ${orderId}`,
        order_id: paymentData.razorpay_order_id,
        prefill: {
          name: paymentData.user?.name || '',
          email: paymentData.user?.email || '',
          contact: paymentData.user?.phone || '',
        },
        theme: {
          color: '#10B981',
        },
        handler: (response: RazorpayResponse) => {
          setIsLoading(false);
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            onDismiss?.();
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response: any) => {
        setIsLoading(false);
        onFailure?.(response.error);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setIsLoading(false);
      onFailure?.(error);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => console.error('Failed to load Razorpay SDK')}
      />
      <button
        onClick={handlePayment}
        disabled={disabled || isLoading || !isScriptLoaded}
        className={className}
      >
        {isLoading ? 'Processing...' : children || 'Pay Now'}
      </button>
    </>
  );
}

/**
 * Hook to verify Razorpay payment
 */
export function useRazorpayVerification() {
  const verifyPayment = async (
    paymentId: string,
    orderId: string,
    signature: string
  ) => {
    try {
      const response = await paymentAPI.verifyPayment(paymentId, signature);
      return { success: true, data: response };
    } catch (error) {
      console.error('Payment verification failed:', error);
      return { success: false, error };
    }
  };

  return { verifyPayment };
}

/**
 * Razorpay payment button with full flow
 */
interface RazorpayPaymentButtonProps {
  orderId: string;
  amount: number;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
  className?: string;
  children?: React.ReactNode;
}

export function RazorpayPaymentButton({
  orderId,
  amount,
  onSuccess,
  onFailure,
  className = '',
  children,
}: RazorpayPaymentButtonProps) {
  const { verifyPayment } = useRazorpayVerification();
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    setIsVerifying(true);
    
    try {
      // Verify payment signature
      const result = await verifyPayment(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature
      );

      if (result.success) {
        onSuccess?.();
      } else {
        onFailure?.(result.error);
      }
    } catch (error) {
      onFailure?.(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const buttonClassName = className || 'w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <RazorpayPayment
      orderId={orderId}
      amount={amount}
      onSuccess={handlePaymentSuccess}
      onFailure={onFailure}
      disabled={isVerifying}
      className={buttonClassName}
    >
      {isVerifying ? 'Verifying...' : children || 'Pay with Razorpay'}
    </RazorpayPayment>
  );
}
