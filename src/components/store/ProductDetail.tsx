'use client';

import { useState } from 'react';
import { useStore } from '@/stores/useStore';
import { formatPrice, getDiscountPercent } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  ChevronRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

export default function ProductDetail() {
  const { products, selectedProductId, addToCart, toggleWishlist, wishlist, setView } = useStore();
  const product = products.find((p) => p.id === selectedProductId);

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Product not found</h2>
        <Button onClick={() => setView('home')} variant="outline">
          Back to Home
        </Button>
      </div>
    );
  }

  const variant = product.variants[selectedVariantIdx];
  const discount = getDiscountPercent(variant.mrp, variant.price);
  const saveAmount = variant.mrp - variant.price;
  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = products.filter(
    (p) => product.relatedProducts.includes(p.id) || (p.categorySlug === product.categorySlug && p.id !== product.id)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${variant.id}-${Date.now()}`,
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      variantWeight: variant.weight,
      variantSku: variant.sku,
      price: variant.price,
      mrp: variant.mrp,
      quantity,
      maxStock: variant.stock,
    });

    toast.success(`Added ${quantity}× ${product.name} (${variant.weight}) to cart`);
    setQuantity(1);
  };

  const categoryEmojis: Record<string, string> = {
    sing: '🥜',
    chana: '🌰',
  };

  const badgeColors: Record<string, string> = {
    'Best Seller': 'bg-green-500 text-white',
    'New': 'bg-blue-500 text-white',
    'Sale': 'bg-red-500 text-white',
    'Limited': 'bg-purple-500 text-white',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => setView('home')} className="cursor-pointer text-amber-600">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                setView('products');
              }}
              className="cursor-pointer text-amber-600"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                useStore.getState().setFilters({ category: product.categorySlug });
                setView('products');
              }}
              className="cursor-pointer text-amber-600"
            >
              {product.categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-700">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Image area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center overflow-hidden border border-amber-100">
            <span className="text-[120px] sm:text-[160px] opacity-50">
              {categoryEmojis[product.categorySlug] || '🥜'}
            </span>
            {product.badge && (
              <Badge className={`absolute top-4 left-4 text-sm font-semibold ${badgeColors[product.badge] || 'bg-gray-500 text-white'}`}>
                {product.badge}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Category & Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
              {product.categoryName}
            </Badge>
            {product.badge && (
              <Badge className={`${badgeColors[product.badge] || 'bg-gray-500 text-white'} text-xs`}>
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          {product.averageRating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(product.averageRating!)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Weight variants */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select Weight:</p>
            <div className="flex gap-2">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVariantIdx(idx);
                    setQuantity(1);
                  }}
                  className={`relative px-4 py-3 rounded-xl border-2 transition-all text-center min-w-[100px] ${
                    idx === selectedVariantIdx
                      ? 'border-amber-500 bg-amber-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <span className="text-sm font-semibold">{v.weight}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">{formatPrice(v.price)}</span>
                  {v.weight === '500g' && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] h-4 px-1.5 border-0">
                      Best Value
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="bg-amber-50 rounded-xl p-4 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(variant.price)}</span>
              {variant.mrp > variant.price && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(variant.mrp)}</span>
              )}
            </div>
            {discount > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600 font-semibold">{discount}% OFF</span>
                <span className="text-green-600">You save {formatPrice(saveAmount)}</span>
              </div>
            )}
            <p className="text-xs text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.min(variant.stock, quantity + 1))}
                disabled={quantity >= variant.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold h-11"
              onClick={handleAddToCart}
              disabled={variant.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {variant.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 border-gray-200"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
            </Button>
          </div>

          {/* Stock info */}
          {variant.stock > 0 && variant.stock <= 10 && (
            <p className="text-xs text-orange-600 font-medium">🔥 Only {variant.stock} left in stock!</p>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
              <Truck className="h-5 w-5 text-amber-600" />
              <span className="text-[10px] text-gray-600 text-center">Free Shipping 500+</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
              <RotateCcw className="h-5 w-5 text-amber-600" />
              <span className="text-[10px] text-gray-600 text-center">7-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <span className="text-[10px] text-gray-600 text-center">100% Authentic</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-amber-50 text-amber-700 hover:bg-amber-100">
                  <Tag className="h-2.5 w-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews placeholder */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-6 w-6 ${
                    s <= Math.round(product.averageRating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              {product.averageRating
                ? `${product.averageRating.toFixed(1)} out of 5 • ${product.reviewCount} reviews`
                : 'No reviews yet'}
            </p>
            <p className="text-gray-400 text-xs mt-2">Reviews feature coming soon!</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
