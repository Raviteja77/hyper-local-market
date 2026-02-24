import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HyperLocal - Authentication',
  description: 'Login, Register, and manage your account',
};

export default function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}