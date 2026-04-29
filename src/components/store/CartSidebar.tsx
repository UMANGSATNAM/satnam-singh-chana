'use client';

import { useStore, getCartTotal, getCartMrpTotal, getCartItemCount, getShippingCost, getDiscount } from '@/stores/useStore';
import { formatPrice } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Minus, Plus, ShoppingBag, Tag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { getProductEmoji } from '@/lib/product-display';

export default function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    setCartSidebar,
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

  const handleCheckout = () => {
    setCartSidebar(false);
    setView('checkout');
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setCartSidebar(false)}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-emerald-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <h2 className="font-semibold text-gray-900">Your Cart</h2>
            <span className="text-xs text-gray-500">({itemCount} items)</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCartSidebar(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart items */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <span className="text-6xl mb-4">🛒</span>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Looks like you haven&apos;t added any snacks yet!
            </p>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              onClick={() => {
                setCartSidebar(false);
                setView('products');
              }}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {/* Savings badge */}
                {totalSavings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-center">
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
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Product emoji */}
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-2xl">{getProductEmoji(item.productSlug)}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.productName}</h4>
                        <p className="text-xs text-gray-500">{item.variantWeight}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md bg-white">
                            <button
                              className="h-7 w-7 flex items-center justify-center hover:bg-gray-100"
                              onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              className="h-7 w-7 flex items-center justify-center hover:bg-gray-100"
                              onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => {
                                removeFromCart(item.variantId);
                                toast.success('Item removed from cart');
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Promo & Total */}
            <div className="border-t bg-white p-4 space-y-3">
              {/* Promo code */}
              {!appliedPromo?.valid ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="text-sm h-9"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={promoLoading || !promoCode.trim()}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">{appliedPromo.code}</span>
                    <span className="text-xs text-green-600">{appliedPromo.message}</span>
                  </div>
                  <button
                    onClick={() => {
                      removePromo();
                      toast.success('Promo code removed');
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Separator />

              {/* Price breakdown */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
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
                <div className="flex justify-between font-semibold text-gray-900 text-base pt-1">
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout — {formatPrice(total)}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-emerald-600 hover:text-emerald-700"
                onClick={() => {
                  setCartSidebar(false);
                  setView('products');
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
