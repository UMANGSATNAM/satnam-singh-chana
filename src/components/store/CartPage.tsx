'use client';

import { useStore, getCartTotal, getCartMrpTotal, getCartItemCount, getShippingCost, getDiscount } from '@/stores/useStore';
import { formatPrice } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X, ShoppingBag, Tag, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    setView,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const subtotal = getCartTotal(cart);
  const mrpTotal = getCartMrpTotal(cart);
  const totalSavings = mrpTotal - subtotal;
  const itemCount = getCartItemCount(cart);
  const shipping = getShippingCost(subtotal);
  const discount = getDiscount(subtotal, appliedPromo);
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setTimeout(() => {
      const code = promoCode.toUpperCase().trim();
      if (code === 'KALA25') {
        const disc = Math.round(subtotal * 0.25);
        applyPromo({ valid: true, discount: disc, message: '25% off applied!', code: 'KALA25' });
        toast.success('Promo code applied! 25% off');
      } else if (code === 'SAVE50') {
        applyPromo({ valid: true, discount: 50, message: '₹50 off applied!', code: 'SAVE50' });
        toast.success('Promo code applied! ₹50 off');
      } else {
        toast.error('Invalid promo code');
      }
      setPromoLoading(false);
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-7xl block mb-4">🛒</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any snacks yet!</p>
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => setView('products')}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('products')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500">{itemCount} items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {totalSavings > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-sm text-green-700 font-medium">
                🎉 You&apos;re saving {formatPrice(totalSavings)} on this order!
              </p>
            </div>
          )}

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.variantId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-3xl">🥜</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.productName}</h3>
                            <p className="text-sm text-gray-500">{item.variantWeight}</p>
                          </div>
                          <button
                            onClick={() => {
                              removeFromCart(item.variantId);
                              toast.success('Item removed from cart');
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded-lg">
                            <button
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                              onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                              onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                            {item.mrp > item.price && (
                              <p className="text-xs text-gray-400 line-through">{formatPrice(item.mrp * item.quantity)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Promo code */}
              {!appliedPromo?.valid ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoLoading || !promoCode.trim()}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 shrink-0"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">{appliedPromo.code}</span>
                  </div>
                  <button onClick={() => removePromo()} className="text-gray-400 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Item Savings</span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-gray-900 text-lg pt-1">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  Add {formatPrice(500 - subtotal)} more for free shipping
                </p>
              )}

              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-11"
                onClick={() => setView('checkout')}
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                className="w-full text-amber-600 hover:text-amber-700"
                onClick={() => setView('products')}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
