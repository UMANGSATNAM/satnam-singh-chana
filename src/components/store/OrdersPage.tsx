'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/stores/useStore';
import { formatPrice } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-indigo-100 text-indigo-700',
  packed: 'bg-emerald-100 text-emerald-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  returned: 'bg-green-100 text-green-700',
};

export default function OrdersPage() {
  const { user, setView, orders, setOrders } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.data as Order[]);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, setOrders]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">🔒</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Please login to view orders</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4" onClick={() => setView('login')}>
          Login
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Your order history will appear here</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setView('products')}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView('order-detail', order.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                        <Badge className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700'} text-[10px]`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
