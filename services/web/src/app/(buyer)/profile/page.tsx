"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Icon } from "@/components/atoms";
import { BuyerLayout } from "@/components/templates";
import { useAuthStore } from "@/store";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Show loading state while checking auth
  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <BuyerLayout userName={user.name} userAvatar={user.avatar} cartItems={[]} activeRoute="profile" showFooter={false}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 pt-8 pb-6 px-4">
          <div className="max-w-2xl mx-auto flex items-center gap-5">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
                {getInitials(user.name)}
              </div>
            )}
            <div>
              <Typography variant="h2" weight="bold" className="text-gray-900">
                {user.name}
              </Typography>
              <Typography variant="body" color="muted">
                {user.phone}
              </Typography>
              {user.email && (
                <Typography variant="caption" color="muted">
                  {user.email}
                </Typography>
              )}
              <div className="mt-2">
                <Button
                  variant="ghost"
                  
                  className="text-blue-600 p-0 h-auto font-medium"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Saved Addresses */}
          <section>
            <div className="flex justify-between items-center mb-3 px-1">
              <Typography variant="h4" weight="bold" className="text-gray-800">
                Saved Addresses
              </Typography>
              <Button
                variant="ghost"
                className="text-blue-600 text-sm font-semibold hover:bg-blue-50"
              >
                + Add New
              </Button>
            </div>

            <div className="space-y-3">
              {/* Address Card */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-start transition-shadow hover:shadow-md">
                <div className="mt-1 p-2 bg-gray-50 rounded-full">
                  <Icon name="Home" className="text-gray-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Typography
                      variant="body"
                      weight="bold"
                      className="text-gray-900"
                    >
                      Home
                    </Typography>
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wide">
                      Default
                    </span>
                  </div>
                  <Typography
                    variant="caption"
                    className="text-gray-500 leading-relaxed"
                  >
                    Flat 402, Galaxy Apartments, MG Road, Indiranagar, Bangalore -
                    560038
                  </Typography>
                </div>
                <Button
                  variant="ghost"
                  
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="Edit" size={18} />
                </Button>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <Button
              variant="secondary"
              className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 py-3"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>

          <div className="text-center pb-8">
            <Typography variant="caption" color="muted" className="text-xs">
              Version 1.0.0
            </Typography>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
