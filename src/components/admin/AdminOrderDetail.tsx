'use client';

import { useStore } from '@/stores/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from 'lucide-react';
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

const statusFlow = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];

export default function AdminOrderDetail() {
  const setView = useStore((s) => s.setView);
  const [newStatus, setNewStatus] = useState('confirmed');
  const [tracking, setTracking] = useState('');
  const [partner, setPartner] = useState('');

  // Mock order detail
  const order = {
    orderNumber: 'SSC-2024-002',
    customer: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    date: '2024-12-16',
    status: 'shipped',
    payment: 'completed',
    method: 'COD',
    items: [
      { name: 'Masala Chana', weight: '500g', qty: 1, price: 120 },
      { name: 'Khari Sing', weight: '250g', qty: 2, price: 60 },
    ],
    address: { name: 'Priya Patel', phone: '+91 98765 43210', line1: '45, MG Road', line2: 'Navrangpura', city: 'Ahmedabad', state: 'Gujarat', pincode: '380009' },
    subtotal: 240,
    shipping: 0,
    discount: 0,
    codFee: 0,
    total: 240,
  };

  const currentStatusIndex = statusFlow.indexOf(order.status);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setView('admin-orders')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Order {order.orderNumber}</h2>
          <p className="text-sm text-gray-500">Placed on {order.date}</p>
        </div>
        <Badge className={`ml-2 ${statusColors[order.status]}`}>{order.status}</Badge>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {statusFlow.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= currentStatusIndex ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1}
                </div>
                <span className={`ml-2 text-xs font-medium ${i <= currentStatusIndex ? 'text-emerald-700' : 'text-gray-400'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
                {i < statusFlow.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${i < currentStatusIndex ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Update Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-600" /> Update Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Update Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="focus:ring-emerald-500 focus:border-emerald-500"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="packed">Packed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tracking Number</Label>
              <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="AWB / Tracking #" className="focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="space-y-2">
              <Label>Delivery Partner</Label>
              <Select value={partner} onValueChange={setPartner}>
                <SelectTrigger className="focus:ring-emerald-500 focus:border-emerald-500"><SelectValue placeholder="Select partner" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="shiprocket">Shiprocket</SelectItem>
                  <SelectItem value="delhivery">Delhivery</SelectItem>
                  <SelectItem value="ekart">Ekart</SelectItem>
                  <SelectItem value="ecom">Ecom Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Update Order</Button>
          </CardContent>
        </Card>

        {/* Customer & Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" /> Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.address.name}</p>
              <p className="text-gray-600">{order.address.line1}</p>
              {order.address.line2 && <p className="text-gray-600">{order.address.line2}</p>}
              <p className="text-gray-600">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
              <p className="text-gray-600 mt-2">{order.address.phone}</p>
            </div>
            <Separator className="my-4" />
            <div className="text-sm">
              <p className="font-medium">{order.customer}</p>
              <p className="text-gray-600">{order.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.weight} × {item.qty}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-600">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{order.discount}</span></div>}
            {order.codFee > 0 && <div className="flex justify-between"><span className="text-gray-500">COD Fee</span><span>₹{order.codFee}</span></div>}
            <Separator />
            <div className="flex justify-between font-semibold text-base"><span>Total</span><span className="text-emerald-600">₹{order.total}</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-600" /> Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-medium">{order.method}</p>
            </div>
            <div>
              <p className="text-gray-500">Payment Status</p>
              <Badge className={order.payment === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}>
                {order.payment}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
