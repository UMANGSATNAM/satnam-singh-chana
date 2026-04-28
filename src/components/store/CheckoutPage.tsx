'use client';

import { useState } from 'react';
import { useStore, getCartTotal, getCartItemCount, getShippingCost, getDiscount } from '@/stores/useStore';
import { formatPrice } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Banknote,
  Wallet,
  Truck,
  MapPin,
  Package,
  PartyPopper,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { Address, PaymentMethod } from '@/types';

type CheckoutStep = 'address' | 'payment' | 'review';

export default function CheckoutPage() {
  const { cart, setView, appliedPromo, user, clearCart } = useStore();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Address form
  const [address, setAddress] = useState<Address>({
    id: user?.addresses?.[0]?.id || 'new',
    label: 'Home',
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: user?.addresses?.[0]?.addressLine1 || '',
    addressLine2: user?.addresses?.[0]?.addressLine2 || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    country: 'India',
    isDefault: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const subtotal = getCartTotal(cart);
  const itemCount = getCartItemCount(cart);
  const shipping = getShippingCost(subtotal);
  const discount = getDiscount(subtotal, appliedPromo);
  const codFee = paymentMethod === 'cod' ? 30 : 0;
  const total = subtotal + shipping + codFee - discount;

  const steps: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { key: 'address', label: 'Address', icon: <MapPin className="h-4 w-4" /> },
    { key: 'payment', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
    { key: 'review', label: 'Review', icon: <Package className="h-4 w-4" /> },
  ];

  const currentStepIdx = steps.findIndex((s) => s.key === step);

  const isAddressValid =
    address.name.trim() &&
    address.phone.trim() &&
    address.addressLine1.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    address.pincode.trim();

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantWeight: item.variantWeight,
            quantity: item.quantity,
            price: item.price,
            mrp: item.mrp,
          })),
          address,
          paymentMethod,
          promoCode: appliedPromo?.code,
          userId: user?.id,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setOrderNumber(data.data.orderNumber);
        setOrderPlaced(true);
        clearCart();
        toast.success('Order placed successfully! 🎉');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Order success state
  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="h-10 w-10 text-green-600" />
          </div>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h1>
        <p className="text-gray-500 mb-4">Your delicious snacks are on their way!</p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="text-xl font-bold text-emerald-700">{orderNumber}</p>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setView('orders')}
          >
            View My Orders
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setView('home')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // Empty cart redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4" onClick={() => setView('products')}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('cart')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, idx) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                idx <= currentStepIdx
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {idx < currentStepIdx ? (
                <Check className="h-4 w-4" />
              ) : (
                s.icon
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-1 ${idx < currentStepIdx ? 'bg-emerald-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 'address' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    placeholder="House no., Building, Street"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={address.addressLine2 || ''}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    placeholder="Landmark, Area (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="360001"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setStep('payment')}
                    disabled={!isAddressValid}
                  >
                    Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                  <div className="flex items-center space-x-3 p-4 border rounded-xl hover:border-emerald-300 transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Banknote className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-xs text-gray-500">Pay when you receive your order (+₹30 COD fee)</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-xl opacity-60">
                    <RadioGroupItem value="razorpay" id="razorpay" disabled />
                    <Label htmlFor="razorpay" className="flex-1 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-400">Razorpay</p>
                          <p className="text-xs text-gray-400">UPI, Cards, Net Banking — Coming soon</p>
                        </div>
                      </div>
                    </Label>
                    <Badge variant="secondary" className="text-[10px]">Soon</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-xl opacity-60">
                    <RadioGroupItem value="stripe" id="stripe" disabled />
                    <Label htmlFor="stripe" className="flex-1 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-400">Stripe</p>
                          <p className="text-xs text-gray-400">International Cards — Coming soon</p>
                        </div>
                      </div>
                    </Label>
                    <Badge variant="secondary" className="text-[10px]">Soon</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-xl opacity-60">
                    <RadioGroupItem value="wallet" id="wallet" disabled />
                    <Label htmlFor="wallet" className="flex-1 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-400">Wallet</p>
                          <p className="text-xs text-gray-400">Paytm, PhonePe — Coming soon</p>
                        </div>
                      </div>
                    </Label>
                    <Badge variant="secondary" className="text-[10px]">Soon</Badge>
                  </div>
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep('address')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setStep('review')}
                  >
                    Review Order <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Order Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-700">Delivery Address</p>
                    <button
                      onClick={() => setStep('address')}
                      className="text-xs text-emerald-600 hover:text-emerald-700"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-900">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-sm text-gray-600">{address.addressLine2}</p>}
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} — {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>

                {/* Payment */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-gray-700">Payment Method</p>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-xs text-emerald-600 hover:text-emerald-700"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {paymentMethod === 'cod' ? '💵 Cash on Delivery' : paymentMethod}
                  </p>
                </div>

                {/* Items */}
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-2">Items ({itemCount})</p>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.variantId} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5">
                        <div className="flex items-center gap-2">
                          <span>🥜</span>
                          <div>
                            <p className="text-gray-900">{item.productName}</p>
                            <p className="text-xs text-gray-500">{item.variantWeight} × {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep('payment')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? 'Placing Order...' : `Place Order — ${formatPrice(total)}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order summary sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>COD Fee</span>
                  <span>{formatPrice(codFee)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {paymentMethod === 'cod' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-700">
                  <Truck className="h-3.5 w-3.5 inline mr-1" />
                  COD orders include a ₹30 handling fee
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
