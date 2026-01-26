"use client";

import React, { useState } from "react";
import { Typography, Button, Icon, Badge } from "@/components/atoms";
import { OrderStatusBadge } from "@/components/molecules";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  status:
    | "pending"
    | "preparing"
    | "ready"
    | "picked_up"
    | "delivered"
    | "cancelled";
  createdAt: string;
  paymentStatus: "paid" | "cod";
}

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Mock data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-8852",
      customerName: "Rahul Gupta",
      items: [
        { name: "Amul Butter 500g", quantity: 1 },
        { name: "Farm Fresh Eggs (6pcs)", quantity: 2 },
      ],
      totalAmount: 340,
      status: "pending",
      createdAt: "Just now",
      paymentStatus: "paid",
    },
    {
      id: "2",
      orderNumber: "ORD-8851",
      customerName: "Priya Singh",
      items: [{ name: "Fortune Atta 5kg", quantity: 1 }],
      totalAmount: 280,
      status: "preparing",
      createdAt: "15 mins ago",
      paymentStatus: "cod",
    },
    {
      id: "3",
      orderNumber: "ORD-8850",
      customerName: "Amit Kumar",
      items: [
        { name: "Tata Salt 1kg", quantity: 1 },
        { name: "Sugar 1kg", quantity: 1 },
        { name: "Tea Powder 250g", quantity: 1 },
      ],
      totalAmount: 450,
      status: "ready",
      createdAt: "45 mins ago",
      paymentStatus: "paid",
    },
    {
      id: "4",
      orderNumber: "ORD-8849",
      customerName: "Sneha Reddy",
      items: [{ name: "Basmati Rice 5kg", quantity: 1 }],
      totalAmount: 850,
      status: "picked_up",
      createdAt: "2 hours ago",
      paymentStatus: "paid",
    },
  ]);

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending" },
    { id: "preparing", label: "Preparing" },
    { id: "ready", label: "Ready for Pickup" },
    { id: "completed", label: "Completed" },
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : activeTab === "completed"
        ? orders.filter((o) =>
            ["picked_up", "delivered", "cancelled"].includes(o.status)
          )
        : orders.filter((o) => o.status === activeTab);

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Typography variant="h2" weight="bold">
            Orders
          </Typography>
          <Typography variant="body" color="muted">
            Manage your incoming orders and track delivery status.
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Icon name="Download" size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ShoppingBag" size={32} color="#9CA3AF" />
            </div>
            <Typography variant="h4" weight="medium" className="mb-1">
              No orders found
            </Typography>
            <Typography variant="body" color="muted">
              There are no orders in this category.
            </Typography>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Typography variant="h4" weight="bold">
                      {order.orderNumber}
                    </Typography>
                    <OrderStatusBadge status={order.status} size="sm" />
                    {order.paymentStatus === "cod" && (
                      <Badge variant="warning" size="sm">
                        Cash on Delivery
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Icon name="Clock" size={16} />
                    <Typography variant="small">{order.createdAt}</Typography>
                    <span>•</span>
                    <Typography variant="small">
                      {order.customerName}
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.quantity}x {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions & Total */}
                <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                  <div className="text-right">
                    <Typography variant="small" color="muted">
                      Total Amount
                    </Typography>
                    <Typography variant="h3" weight="bold" color="primary">
                      ₹{order.totalAmount}
                    </Typography>
                  </div>

                  <div className="flex gap-2 w-full justify-end">
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(order.id, "preparing")
                          }
                          className="flex-1 sm:flex-none"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-danger hover:bg-red-50 flex-1 sm:flex-none"
                          onClick={() =>
                            handleStatusUpdate(order.id, "cancelled")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {order.status === "preparing" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, "ready")}
                        fullWidth
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === "ready" && (
                      <Button variant="secondary" size="sm" disabled fullWidth>
                        Waiting for Rider
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
