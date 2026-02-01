'use client';

import { useEffect } from 'react';
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "@/components/organisms";
import { useCartStore } from "@/store";

const inter = Inter({
  subsets: ["latin"],
});

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setDeliveryFee } = useCartStore();
  
  // Set default delivery fee on mount
  useEffect(() => {
    setDeliveryFee(20); // Default ₹20 delivery fee
  }, [setDeliveryFee]);
  
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gray-50`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
