'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/useStore';
import { formatPrice, getDiscountPercent } from '@/lib/helpers';
import { getProductEmoji, getCategoryGradient, badgeColors } from '@/lib/product-display';
import { toast } from 'sonner';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, setView } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const variant = product.variants[selectedVariantIdx];
  const discount = getDiscountPercent(variant.mrp, variant.price);
  const saveAmount = variant.mrp - variant.price;

  const emoji = getProductEmoji(product.slug, product.categorySlug);
  const gradient = getCategoryGradient(product.categorySlug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;

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
      quantity: 1,
      maxStock: variant.stock,
    });

    toast.success(`Added ${product.name} (${variant.weight}) to cart`, {
      description: `${formatPrice(variant.price)} • Save ${formatPrice(saveAmount)}`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleCardClick = () => {
    setView('product-detail', product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-gray-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 rounded-xl"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          {/* Emoji Display Area */}
          <div className={`relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/15 blur-sm" />

            {/* Large emoji center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl sm:text-7xl md:text-8xl opacity-80 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                {emoji}
              </span>
            </div>

            {/* Badge */}
            {product.badge && (
              <Badge
                className={`absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-md ${badgeColors[product.badge] || 'bg-gray-500 text-white'}`}
              >
                {product.badge}
              </Badge>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <Badge className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[10px] font-semibold border-0 px-2 py-0.5 rounded-md">
                {discount}% OFF
              </Badge>
            )}

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-3.5 sm:p-4">
            {/* Category */}
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-1.5 bg-emerald-100/80 text-emerald-700">
              {product.categoryName}
            </span>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.averageRating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= Math.round(product.averageRating!)
                          ? 'fill-emerald-400 text-emerald-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
              </div>
            )}

            {/* Weight variants */}
            {product.variants.length > 1 && (
              <div className="flex gap-1.5 mb-2.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariantIdx(idx);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      idx === selectedVariantIdx
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">{formatPrice(variant.price)}</span>
              {variant.mrp > variant.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(variant.mrp)}</span>
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded">
                    Save {formatPrice(saveAmount)}
                  </span>
                </>
              )}
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm h-9 rounded-lg transition-all"
              disabled={variant.stock === 0}
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              {variant.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
