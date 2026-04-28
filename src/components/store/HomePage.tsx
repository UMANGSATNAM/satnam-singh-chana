'use client';

import { useStore } from '@/stores/useStore';
import HeroBanner from './HeroBanner';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Truck, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import type { StoreSettings } from '@/types';

interface HomePageProps {
  settings: StoreSettings | null;
}

const testimonials = [
  {
    name: 'Rajesh Patel',
    location: 'Mumbai',
    text: 'Best roasted peanuts I have ever had! The Kala Sing is absolutely addictive. My family finishes a pack every week.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    text: 'The Masala Chana reminds me of my grandmother\'s recipe. Authentic flavors, great quality. Will order again!',
    rating: 5,
  },
  {
    name: 'Amit Joshi',
    location: 'Ahmedabad',
    text: 'Fast delivery, fresh products. The Crunchy Chana Mix is perfect for evening snacks. Highly recommended!',
    rating: 4,
  },
];

export default function HomePage({ settings }: HomePageProps) {
  const { products, setView, setFilters } = useStore();

  const bestSellers = products.filter((p) => p.badge === 'Best Seller');
  const newArrivals = products.filter((p) => p.badge === 'New' || p.badge === 'Limited');
  const freeShippingAbove = settings?.freeShippingAbove || 500;

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Strip */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className="cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => {
                setFilters({ category: 'sing' });
                setView('products');
              }}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-5xl">🥜</span>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">Sing</h3>
                    <p className="text-white/80 text-[10px] sm:text-sm">Roasted Peanuts</p>
                    <p className="text-white/60 text-[9px] sm:text-xs mt-0.5">
                      {products.filter((p) => p.categorySlug === 'sing').length} products
                    </p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-white/70" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className="cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => {
                setFilters({ category: 'chana' });
                setView('products');
              }}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-5xl">🌰</span>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">Chana</h3>
                    <p className="text-white/80 text-[10px] sm:text-sm">Roasted Chickpeas</p>
                    <p className="text-white/60 text-[9px] sm:text-xs mt-0.5">
                      {products.filter((p) => p.categorySlug === 'chana').length} products
                    </p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-white/70" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-sm text-gray-500">Our most loved snacks</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setFilters({ badge: 'Best Seller' });
                setView('products');
              }}
              className="text-amber-600 hover:text-amber-700"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[240px] sm:min-w-[260px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-3">Limited Time Offer</Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Flat 25% OFF on Kala Chana!
            </h3>
            <p className="text-white/85 text-sm mb-4">
              Use code <span className="font-mono bg-white/20 px-2 py-0.5 rounded">KALA25</span> at checkout
            </p>
            <Button
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold"
              onClick={() => {
                setFilters({ category: 'chana' });
                setView('products');
              }}
            >
              Shop Now <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-sm text-gray-500">Fresh additions to our menu</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setView('products')}
              className="text-amber-600 hover:text-amber-700"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-sm text-gray-500 mt-1">Real reviews from real snack lovers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border-amber-100">
              <CardContent className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-3 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mt-10 mb-6">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <span className="absolute right-4 top-2 text-[100px] opacity-10 select-none">🛒</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Order Now & Get Free Shipping!
            </h3>
            <p className="text-white/85 text-sm mb-5">
              Free delivery on all orders above ₹{freeShippingAbove}. No coupon needed.
            </p>
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold shadow-lg"
              onClick={() => setView('products')}
            >
              Shop All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
