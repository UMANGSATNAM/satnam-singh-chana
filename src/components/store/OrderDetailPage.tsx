'use client';

import { useStore } from '@/stores/useStore';
import { formatPrice } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  Circle,
  Truck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const statusSteps = [
  { key: 'placed', label: 'Order Placed', icon: Package },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'packed', label: 'Packed', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

function getStatusIndex(status: string): number {
  const idx = statusSteps.findIndex((s) => s.key === status);
  if (status === 'cancelled') return -1;
  if (status === 'returned') return -2;
  return idx >= 0 ? idx : 0;
}

export default function OrderDetailPage() {
  const { orders, selectedOrderId, setView } = useStore();

  const order = orders.find((o) => o.id === selectedOrderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Order not found</h2>
        <Button onClick={() => setView('orders')} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  const currentStepIdx = getStatusIndex(order.status);
  const isCancelled = order.status === 'cancelled';
  const isReturned = order.status === 'returned';

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('orders')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Status tracker */}
      {!isCancelled && !isReturned && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
                <motion.div
                  className="h-full bg-amber-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              {statusSteps.map((step, idx) => {
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="relative flex flex-col items-center z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-amber-500 text-white'
                          : 'bg-white border-2 border-gray-200 text-gray-300'
                      } ${isCurrent ? 'ring-2 ring-amber-200 ring-offset-2' : ''}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`text-[10px] mt-1.5 text-center ${
                        isCompleted ? 'text-amber-700 font-medium' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancelled/Returned badge */}
      {(isCancelled || isReturned) && (
        <div className={`mb-6 p-4 rounded-xl text-center ${isCancelled ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
          <Badge className={`${isCancelled ? 'bg-red-500' : 'bg-orange-500'} text-white mb-2`}>
            {isCancelled ? 'Cancelled' : 'Returned'}
          </Badge>
          <p className={`text-sm ${isCancelled ? 'text-red-700' : 'text-orange-700'}`}>
            This order has been {order.status}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🥜</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                      <p className="text-xs text-gray-500">{item.variantWeight} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.total)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Address & Payment */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                Delivery Address
              </h2>
              {order.address && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{order.address.name}</p>
                  <p>{order.address.addressLine1}</p>
                  {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                  <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                  <p>{order.address.phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-500" />
                Payment Info
              </h2>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant="outline" className="text-xs">{order.paymentStatus}</Badge>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="text-sm space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
                </div>
                {order.codFee > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>COD Fee</span>
                    <span>{formatPrice(order.codFee)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-gray-900 pt-1">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
