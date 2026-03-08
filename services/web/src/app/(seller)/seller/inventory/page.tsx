"use client";

import React, { useState } from "react";
import { InventoryManager } from "@/components/organisms";
import { Typography } from "@/components/atoms";

export default function SellerInventoryPage() {
  const [inventory, setInventory] = useState([
    {
      id: "1",
      name: "Organic Fresh Milk",
      category: "Dairy",
      price: 65,
      inStock: true,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200",
    },
    {
      id: "2",
      name: "Whole Wheat Bread",
      category: "Bakery",
      price: 40,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
    },
    {
      id: "3",
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 30,
      inStock: false,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200",
    },
    {
      id: "4",
      name: "Premium Rice",
      category: "Grains",
      price: 120,
      inStock: true,
    },
    {
      id: "5",
      name: "Fresh Bananas",
      category: "Fruits",
      price: 50,
      inStock: false,
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200",
    },
    {
      id: "6",
      name: "Greek Yogurt",
      category: "Dairy",
      price: 85,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200",
    },
    {
      id: "7",
      name: "Olive Oil",
      category: "Oils",
      price: 450,
      inStock: true,
    },
    {
      id: "8",
      name: "Fresh Spinach",
      category: "Vegetables",
      price: 25,
      inStock: false,
    },
    {
      id: "9",
      name: "Brown Bread",
      category: "Bakery",
      price: 45,
      inStock: true,
    },
    {
      id: "10",
      name: "Orange Juice",
      category: "Beverages",
      price: 120,
      inStock: true,
    },
  ]);

  const handleToggleStock = (itemId: string, inStock: boolean) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, inStock } : item))
    );
    console.log(`Item ${itemId} stock updated to:`, inStock);
  };

  const handleUpdatePrice = (itemId: string, price: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price } : item))
    );
    console.log(`Item ${itemId} price updated to:`, price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Typography variant="h2" weight="bold" className="mb-2">
          Inventory Management
        </Typography>
        <Typography variant="body" color="muted">
          Manage your product availability and prices. Toggle stock status to
          control what customers can order.
        </Typography>
      </div>

      {/* Inventory Manager */}
      <InventoryManager
        items={inventory}
        onToggleStock={handleToggleStock}
        onUpdatePrice={handleUpdatePrice}
        showPriceEdit={true}
      />
    </div>
  );
}
