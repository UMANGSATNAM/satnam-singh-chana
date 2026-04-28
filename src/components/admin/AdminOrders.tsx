'use client';

import { useStore } from '@/stores/useStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye } from 'lucide-react';
import { useState } from 'react';

const statusColors: Record<string, string> = {
  placed: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  packed: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  returned: 'bg-green-100 text-green-700',
};

const paymentColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-green-100 text-green-700',
};

const mockOrders = [
  { id: '1', orderNumber: 'SSC-2024-001', customer: 'Rahul Sharma', email: 'rahul@example.com', date: '2024-12-15', items: 3, total: 380, status: 'delivered', payment: 'completed', method: 'razorpay' },
  { id: '2', orderNumber: 'SSC-2024-002', customer: 'Priya Patel', email: 'priya@example.com', date: '2024-12-16', items: 2, total: 240, status: 'shipped', payment: 'completed', method: 'cod' },
  { id: '3', orderNumber: 'SSC-2024-003', customer: 'Amit Desai', email: 'amit@example.com', date: '2024-12-17', items: 1, total: 130, status: 'placed', payment: 'pending', method: 'cod' },
  { id: '4', orderNumber: 'SSC-2024-004', customer: 'Sneha Joshi', email: 'sneha@example.com', date: '2024-12-17', items: 4, total: 520, status: 'confirmed', payment: 'completed', method: 'razorpay' },
  { id: '5', orderNumber: 'SSC-2024-005', customer: 'Vikram Singh', email: 'vikram@example.com', date: '2024-12-18', items: 2, total: 200, status: 'packed', payment: 'completed', method: 'stripe' },
  { id: '6', orderNumber: 'SSC-2024-006', customer: 'Meera Nair', email: 'meera@example.com', date: '2024-12-18', items: 1, total: 100, status: 'cancelled', payment: 'refunded', method: 'razorpay' },
];

export default function AdminOrders() {
  const setView = useStore((s) => s.setView);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockOrders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-sm text-gray-500">{mockOrders.length} total orders</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 focus:ring-emerald-500"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="placed">Placed</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="packed">Packed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50">
                <TableHead className="text-emerald-700">Order #</TableHead>
                <TableHead className="text-emerald-700">Customer</TableHead>
                <TableHead className="text-emerald-700">Date</TableHead>
                <TableHead className="text-emerald-700">Items</TableHead>
                <TableHead className="text-emerald-700">Total</TableHead>
                <TableHead className="text-emerald-700">Status</TableHead>
                <TableHead className="text-emerald-700">Payment</TableHead>
                <TableHead className="w-12 text-emerald-700"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-emerald-50/50" onClick={() => setView('admin-order-detail', order.id)}>
                  <TableCell className="font-medium text-sm">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.date}</TableCell>
                  <TableCell className="text-sm">{order.items}</TableCell>
                  <TableCell className="font-medium text-sm text-emerald-600">₹{order.total}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusColors[order.status] || ''}`}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${paymentColors[order.payment] || ''}`}>{order.payment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
