'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/useStore';
import { formatPrice, getDiscountPercent } from '@/lib/helpers';
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

  const categoryColors: Record<string, string> = {
    sing: 'bg-emerald-100 text-emerald-700',
    chana: 'bg-green-100 text-green-700',
  };

  const badgeColors: Record<string, string> = {
    'Best Seller': 'bg-green-500 text-white',
    'New': 'bg-blue-500 text-white',
    'Sale': 'bg-red-500 text-white',
    'Limited': 'bg-purple-500 text-white',
  };

  const productImages: Record<string, string> = {
    'khari-sing': '/products/khari-sing.png',
    'masala-sing': '/products/masala-sing.png',
    'mori-sing': '/products/mori-sing.png',
    'khara-chana': '/products/khara-chana.png',
    'masala-chana': '/products/masala-chana.png',
    'mora-chana': '/products/mora-chana.png',
  };

  const categoryEmojis: Record<string, string> = {
    sing: '🥜',
    chana: '🌰',
  };

  const productImage = productImages[product.slug];

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
        className="group cursor-pointer overflow-hidden border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                  {categoryEmojis[product.categorySlug] || '🥜'}
                </span>
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <Badge
                className={`absolute top-2 left-2 text-[10px] font-semibold ${badgeColors[product.badge] || 'bg-gray-500 text-white'}`}
              >
                {product.badge}
              </Badge>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px] font-semibold border-0">
                {discount}% OFF
              </Badge>
            )}

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center transition-all hover:scale-110"
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
          <div className="p-3 sm:p-4">
            {/* Category */}
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-1.5 ${categoryColors[product.categorySlug] || 'bg-gray-100 text-gray-600'}`}>
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
              <div className="flex gap-1.5 mb-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariantIdx(idx);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      idx === selectedVariantIdx
                        ? 'bg-emerald-600 text-white border-emerald-600'
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
                  <span className="text-xs text-green-600 font-medium">Save {formatPrice(saveAmount)}</span>
                </>
              )}
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm h-9"
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
