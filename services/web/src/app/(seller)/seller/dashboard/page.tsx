"use client";

import { Icon, IconName, Typography } from "@/components/atoms";
import { OrderStatusBadge } from "@/components/molecules";
import { useState } from "react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: IconName;
  color: string;
}

interface RecentOrder {
  id: string;
  orderId: string;
  customerName: string;
  items: number;
  amount: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "picked_up";
  time: string;
}

export default function SellerDashboardPage() {
  const stats: StatCard[] = [
    {
      label: "Today's Orders",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: "ShoppingBag",
      color: "#10B981",
    },
    {
      label: "Today's Revenue",
      value: "₹3,450",
      change: "+8%",
      isPositive: true,
      icon: "DollarSign",
      color: "#3B82F6",
    },
    {
      label: "Pending Orders",
      value: "5",
      change: "-2",
      isPositive: true,
      icon: "Clock",
      color: "#F59E0B",
    },
    {
      label: "Average Rating",
      value: "4.5",
      change: "+0.2",
      isPositive: true,
      icon: "Star",
      color: "#F59E0B",
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: "1",
      orderId: "ORD-12345",
      customerName: "John Doe",
      items: 5,
      amount: 450,
      status: "pending",
      time: "2 mins ago",
    },
    {
      id: "2",
      orderId: "ORD-12344",
      customerName: "Jane Smith",
      items: 3,
      amount: 280,
      status: "preparing",
      time: "15 mins ago",
    },
    {
      id: "3",
      orderId: "ORD-12343",
      customerName: "Mike Johnson",
      items: 7,
      amount: 620,
      status: "ready",
      time: "25 mins ago",
    },
    {
      id: "4",
      orderId: "ORD-12342",
      customerName: "Sarah Lee",
      items: 4,
      amount: 350,
      status: "picked_up",
      time: "1 hour ago",
    },
  ];

  const handleAcceptOrder = (orderId: string) => {
    console.log("Accept order:", orderId);
  };

  const handleRejectOrder = (orderId: string) => {
    console.log("Reject order:", orderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Typography variant="h2" weight="bold" className="mb-2">
          Dashboard
        </Typography>
        <Typography variant="body" color="muted">
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon name={stat.icon} size={24} color={stat.color} />
              </div>
              <div
                className={`text-sm font-medium ${
                  stat.isPositive ? "text-success" : "text-danger"
                }`}
              >
                {stat.change}
              </div>
            </div>
            <Typography variant="small" color="muted" className="mb-1">
              {stat.label}
            </Typography>
            <Typography variant="h3" weight="bold">
              {stat.value}
            </Typography>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Typography variant="h4" weight="bold">
              Recent Orders
            </Typography>
            <button
              onClick={() => console.log("View all orders")}
              className="text-primary hover:underline text-sm"
            >
              View All
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Typography variant="body" weight="semibold">
                      {order.orderId}
                    </Typography>
                    <OrderStatusBadge status={order.status} size="sm" />
                  </div>
                  <Typography variant="small" color="muted">
                    {order.customerName} • {order.items} items • {order.time}
                  </Typography>
                </div>
                <Typography variant="h4" weight="bold" color="primary">
                  ₹{order.amount}
                </Typography>
              </div>

              {order.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptOrder(order.orderId)}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Accept Order
                  </button>
                  <button
                    onClick={() => handleRejectOrder(order.orderId)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="#10B981" />
            </div>
            <Typography variant="body" weight="semibold">
              Manage Inventory
            </Typography>
          </div>
          <Typography variant="small" color="muted">
            Update product availability and prices
          </Typography>
        </button>

        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="#3B82F6" />
            </div>
            <Typography variant="body" weight="semibold">
              View Analytics
            </Typography>
          </div>
          <Typography variant="small" color="muted">
            Check your sales performance
          </Typography>
        </button>

        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} color="#F59E0B" />
            </div>
            <Typography variant="body" weight="semibold">
              View Earnings
            </Typography>
          </div>
          <Typography variant="small" color="muted">
            Track your revenue and payouts
          </Typography>
        </button>
      </div>
    </div>
  );
}
