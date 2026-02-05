"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Button } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { AuthLayout } from "@/components/templates";
import { useAuthStore } from "@/store";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: "buyer" | "seller" | "rider";
  address?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "buyer",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock user registration
      const user = {
        id: `user-${Date.now()}`,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.userType,
        avatar: 'https://i.pravatar.cc/150?img=2',
      };
      
      // Mock tokens
      const accessToken = `mock-access-token-${Date.now()}`;
      const refreshToken = `mock-refresh-token-${Date.now()}`;
      
      // Auto-login after registration
      login(user, accessToken, refreshToken);
      
      // Redirect based on user type
      if (formData.userType === 'buyer') {
        router.push('/');
      } else if (formData.userType === 'seller') {
        router.push('/seller/dashboard');
      } else if (formData.userType === 'rider') {
        router.push('/rider/dashboard');
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-600 mb-6">Join us and start shopping</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            required
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <FormField
            label="Email Address"
            required
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormField
            label="Phone Number"
            required
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Manual Select Field since FormField only supports Input */}
          <div className="w-full">
            <label className="block mb-1.5">
              <Typography variant="caption" weight="medium" color="primary">
                Account Type <span className="text-danger ml-1">*</span>
              </Typography>
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white transition-all duration-200"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="rider">Rider</option>
            </select>
          </div>

          {formData.userType === "seller" && (
            <FormField
              label="Store Address"
              required
              type="text"
              name="address"
              placeholder="Enter your store address"
              value={formData.address}
              onChange={handleChange}
            />
          )}

          <FormField
            label="Password"
            required
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
          />

          <FormField
            label="Confirm Password"
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Typography variant="body" className="text-gray-600">
            Already have an account?
          </Typography>
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
