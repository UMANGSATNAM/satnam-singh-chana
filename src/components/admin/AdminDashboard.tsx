'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/useStore';
import type { DashboardStats } from '@/types';
import {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockDashboard: DashboardStats = {
  totalOrdersToday: 12,
  totalOrdersWeek: 87,
  totalOrdersMonth: 342,
  revenueToday: 8540,
  revenueWeek: 62340,
  revenueMonth: 245800,
  totalCustomers: 156,
  newCustomersThisMonth: 23,
  pendingOrders: 8,
  pendingReturns: 3,
  lowStockProducts: 2,
  topSellingProducts: [
    { name: 'Khari Sing 500g', orders: 45, revenue: 5400 },
    { name: 'Masala Chana 500g', orders: 38, revenue: 4560 },
    { name: 'Khara Chana 500g', orders: 32, revenue: 3200 },
    { name: 'Masala Sing 500g', orders: 28, revenue: 3640 },
    { name: 'Mori Sing 500g', orders: 22, revenue: 2640 },
  ],
  revenueChart: [
    { label: 'Mon', revenue: 12400, orders: 15 },
    { label: 'Tue', revenue: 8900, orders: 11 },
    { label: 'Wed', revenue: 15600, orders: 18 },
    { label: 'Thu', revenue: 9200, orders: 12 },
    { label: 'Fri', revenue: 18300, orders: 22 },
    { label: 'Sat', revenue: 22100, orders: 28 },
    { label: 'Sun', revenue: 19800, orders: 24 },
  ],
};

const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export default function AdminDashboard() {
  const setView = useStore((s) => s.setView);
  const d = mockDashboard;

  const stats = [
    { title: "Today's Revenue", value: formatPrice(d.revenueToday), icon: DollarSign, trend: '+12%', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: "Today's Orders", value: d.totalOrdersToday, icon: ShoppingBag, trend: '+8%', up: true, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Total Customers', value: d.totalCustomers, icon: Users, trend: '+15%', up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Monthly Revenue', value: formatPrice(d.revenueMonth), icon: TrendingUp, trend: '+22%', up: true, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.up ? (
                        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-gray-400">vs last period</span>
                    </div>
                  </div>
                  <div className={`${stat.bg} p-2.5 rounded-xl`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
              <Badge variant="secondary" className="text-xs">Last 7 days</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: number) => [formatPrice(value), 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Orders This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={d.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setView('admin-products')} className="text-amber-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {d.topSellingProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.orders} orders</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatPrice(product.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Alerts & Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {d.pendingOrders > 0 && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-900">{d.pendingOrders} Pending Orders</p>
                    <p className="text-xs text-amber-600">Awaiting confirmation</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setView('admin-orders')} className="border-amber-300 text-amber-700">
                    View
                  </Button>
                </div>
              )}
              {d.pendingReturns > 0 && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <Package className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900">{d.pendingReturns} Return Requests</p>
                    <p className="text-xs text-orange-600">Awaiting review</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setView('admin-orders')} className="border-orange-300 text-orange-700">
                    View
                  </Button>
                </div>
              )}
              {d.lowStockProducts > 0 && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">{d.lowStockProducts} Low Stock Items</p>
                    <p className="text-xs text-red-600">Below threshold</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setView('admin-products')} className="border-red-300 text-red-700">
                    View
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-900">+{d.newCustomersThisMonth} New Customers</p>
                  <p className="text-xs text-emerald-600">This month</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setView('admin-customers')} className="border-emerald-300 text-emerald-700">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
