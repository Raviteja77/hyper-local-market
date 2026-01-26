'use client';

import { Icon, IconName, Typography } from '@/components/atoms';
import { OrderStatusBadge } from '@/components/molecules';
import { AdminLayout } from '@/components/templates';

interface StatCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: IconName;
  color: string;
}

interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'store' | 'rider';
  message: string;
  time: string;
}

export default function AdminDashboardPage() {
  const stats: StatCard[] = [
    {
      label: 'Total Orders',
      value: '1,234',
      change: '+12.5%',
      isPositive: true,
      icon: 'ShoppingBag',
      color: '#10B981',
    },
    {
      label: 'Active Users',
      value: '5,678',
      change: '+8.2%',
      isPositive: true,
      icon: 'Users',
      color: '#3B82F6',
    },
    {
      label: 'Total Stores',
      value: '234',
      change: '+5.1%',
      isPositive: true,
      icon: 'Store',
      color: '#8B5CF6',
    },
    {
      label: 'Revenue',
      value: '₹2.4M',
      change: '+15.3%',
      isPositive: true,
      icon: 'DollarSign',
      color: '#F59E0B',
    },
    {
      label: 'Active Riders',
      value: '89',
      change: '+3.4%',
      isPositive: true,
      icon: 'Bike',
      color: '#EC4899',
    },
    {
      label: 'Avg Delivery Time',
      value: '12 min',
      change: '-2.1 min',
      isPositive: true,
      icon: 'Clock',
      color: '#14B8A6',
    },
    {
      label: 'Customer Satisfaction',
      value: '4.6',
      change: '+0.2',
      isPositive: true,
      icon: 'Star',
      color: '#F59E0B',
    },
    {
      label: 'Pending Issues',
      value: '12',
      change: '-8',
      isPositive: true,
      icon: 'AlertCircle',
      color: '#EF4444',
    },
  ];

  const recentOrders = [
    {
      id: '1',
      orderId: 'ORD-12345',
      customer: 'John Doe',
      store: 'Sharma Kirana',
      amount: 450,
      status: 'out_for_delivery' as const,
      time: '2 mins ago',
    },
    {
      id: '2',
      orderId: 'ORD-12344',
      customer: 'Jane Smith',
      store: 'Fresh Mart',
      amount: 280,
      status: 'preparing' as const,
      time: '15 mins ago',
    },
    {
      id: '3',
      orderId: 'ORD-12343',
      customer: 'Mike Johnson',
      store: 'City Grocers',
      amount: 620,
      status: 'delivered' as const,
      time: '25 mins ago',
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'store',
      message: 'New store "Quick Shop" registered',
      time: '5 mins ago',
    },
    {
      id: '2',
      type: 'rider',
      message: 'Rider Rajesh Kumar completed 50 deliveries',
      time: '18 mins ago',
    },
    {
      id: '3',
      type: 'user',
      message: '23 new users registered today',
      time: '1 hour ago',
    },
    {
      id: '4',
      type: 'order',
      message: 'Order #12340 marked as cancelled',
      time: '2 hours ago',
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']): IconName => {
    switch (type) {
      case 'order':
        return 'ShoppingBag';
      case 'user':
        return 'Users';
      case 'store':
        return 'Store';
      case 'rider':
        return 'Bike';
    }
  };

  return (
    <AdminLayout
      adminName="Admin User"
      adminAvatar="https://i.pravatar.cc/150?img=5"
      activeMenuItem="dashboard"
      notificationCount={12}
      onMenuItemClick={(id) => console.log('Navigate to:', id)}
      onSearch={(query) => console.log('Search:', query)}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Typography variant="h2" weight="bold" className="mb-2">
            Dashboard Overview
          </Typography>
          <Typography variant="body" color="muted">
            Welcome back! Here's what's happening across the platform.
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
                    stat.isPositive ? 'text-success' : 'text-danger'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Typography variant="h4" weight="bold">
                  Recent Orders
                </Typography>
                <button
                  onClick={() => console.log('View all orders')}
                  className="text-primary hover:underline text-sm"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Typography variant="body" weight="semibold">
                        {order.orderId}
                      </Typography>
                      <Typography variant="small" color="muted">
                        {order.customer} • {order.store}
                      </Typography>
                    </div>
                    <Typography variant="body" weight="bold" color="primary">
                      ₹{order.amount}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <OrderStatusBadge status={order.status} size="sm" />
                    <Typography variant="small" color="muted">
                      {order.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <Typography variant="h4" weight="bold">
                Recent Activity
              </Typography>
            </div>

            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name={getActivityIcon(activity.type)} size={16} color="#6B7280" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="small" className="mb-1">
                        {activity.message}
                      </Typography>
                      <Typography variant="caption" color="muted">
                        {activity.time}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} color="#10B981" />
              </div>
              <Typography variant="body" weight="semibold">
                Manage Users
              </Typography>
            </div>
            <Typography variant="small" color="muted">
              View and manage all users
            </Typography>
          </button>

          <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name="Store" size={20} color="#3B82F6" />
              </div>
              <Typography variant="body" weight="semibold">
                Manage Stores
              </Typography>
            </div>
            <Typography variant="small" color="muted">
              Onboard and verify stores
            </Typography>
          </button>

          <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="Bike" size={20} color="#8B5CF6" />
              </div>
              <Typography variant="body" weight="semibold">
                Manage Riders
              </Typography>
            </div>
            <Typography variant="small" color="muted">
              Track delivery partners
            </Typography>
          </button>

          <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="#F59E0B" />
              </div>
              <Typography variant="body" weight="semibold">
                View Analytics
              </Typography>
            </div>
            <Typography variant="small" color="muted">
              Detailed reports and insights
            </Typography>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}