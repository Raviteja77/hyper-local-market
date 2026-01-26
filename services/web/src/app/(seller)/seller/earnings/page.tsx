"use client";

import React, { useState } from "react";
import { Typography, Button, Icon, Badge } from "@/components/atoms";

export default function SellerEarningsPage() {
  const [dateRange, setDateRange] = useState("This Month");

  // Mock Stats
  const stats = [
    {
      label: "Total Earnings",
      value: "₹45,250",
      change: "+12%",
      isPositive: true,
    },
    {
      label: "Pending Payout",
      value: "₹4,500",
      change: "Due tomorrow",
      isPositive: true,
    },
    {
      label: "Completed Orders",
      value: "128",
      change: "+8%",
      isPositive: true,
    },
    {
      label: "Average Order Value",
      value: "₹350",
      change: "-2%",
      isPositive: false,
    },
  ];

  // Mock Transactions
  const transactions = [
    {
      id: "TXN-1001",
      date: "Oct 24, 2023",
      type: "Payout",
      amount: 12500,
      status: "Completed",
    },
    {
      id: "ORD-8852",
      date: "Oct 24, 2023",
      type: "Order Payment",
      amount: 340,
      status: "Pending",
    },
    {
      id: "ORD-8851",
      date: "Oct 23, 2023",
      type: "Order Payment",
      amount: 280,
      status: "Completed",
    },
    {
      id: "ORD-8850",
      date: "Oct 23, 2023",
      type: "Order Payment",
      amount: 450,
      status: "Completed",
    },
    {
      id: "TXN-1000",
      date: "Oct 20, 2023",
      type: "Payout",
      amount: 8000,
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Typography variant="h2" weight="bold">
            Earnings
          </Typography>
          <Typography variant="body" color="muted">
            Track your revenue and payouts.
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Icon name="Calendar" size={16} /> {dateRange}
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Icon name="Download" size={16} /> Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <Typography variant="small" color="muted" className="mb-1">
              {stat.label}
            </Typography>
            <Typography variant="h3" weight="bold" className="mb-2">
              {stat.value}
            </Typography>
            <div
              className={`text-sm font-medium ${stat.isPositive ? "text-success" : "text-danger"}`}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <Typography variant="h4" weight="bold">
            Recent Transactions
          </Typography>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Typography variant="body" weight="medium">
                      {txn.id}
                    </Typography>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Typography variant="body" color="muted">
                      {txn.date}
                    </Typography>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Typography variant="body">{txn.type}</Typography>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        txn.status === "Completed" ? "success" : "warning"
                      }
                      size="sm"
                    >
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Typography
                      variant="body"
                      weight="bold"
                      color={txn.type === "Payout" ? "error" : "success"}
                    >
                      {txn.type === "Payout" ? "-" : "+"}₹{txn.amount}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
