'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/stores/useStore';
import HeroBanner from './HeroBanner';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Truck,
  Star,
  ArrowRight,
  Leaf,
  Sprout,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  FlameKindling,
} from 'lucide-react';
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

// Mock countdown timer hook
function useCountdown(targetHours: number) {
  const [timeLeft, setTimeLeft] = useState({ hours: targetHours, minutes: 47, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          return { hours: targetHours, minutes: 0, seconds: 0 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetHours]);

  return timeLeft;
}

export default function HomePage({ settings }: HomePageProps) {
  const { products, setView, setFilters } = useStore();

  const bestSellers = products.filter((p) => p.badge === 'Best Seller');
  const newArrivals = products.filter((p) => p.badge === 'New' || p.badge === 'Limited');
  const saleProducts = products.filter((p) => p.badge === 'Sale' || p.badge === 'Best Seller');
  const freeShippingAbove = settings?.freeShippingAbove || 500;
  const flashTime = useCountdown(5);

  return (
    <div>
      {/* Announcement Bar */}
      <div className="bg-black text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="text-sm mx-4">🔥 Free Shipping on ₹500+ | Use code FIRST50 for 50% off | New Arrivals Weekly!</span>
          <span className="text-sm mx-4">🥜 Farm Fresh • No Preservatives • Since 1965</span>
          <span className="text-sm mx-4">🔥 Free Shipping on ₹500+ | Use code FIRST50 for 50% off | New Arrivals Weekly!</span>
          <span className="text-sm mx-4">🥜 Farm Fresh • No Preservatives • Since 1965</span>
          <span className="text-sm mx-4">🔥 Free Shipping on ₹500+ | Use code FIRST50 for 50% off | New Arrivals Weekly!</span>
        </div>
      </div>

      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Strip */}
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
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
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
                <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
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

      {/* 3. Offer Banner Row */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-emerald-700">25% OFF</div>
              <p className="text-xs text-emerald-600 mt-1">On all Chana products</p>
              <p className="text-[10px] text-emerald-500 mt-1 font-medium">Limited time only</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-emerald-700">Buy 2 Get 1</div>
              <p className="text-xs text-emerald-600 mt-1">Free on Sing products</p>
              <p className="text-[10px] text-emerald-500 mt-1 font-medium">Auto-applied at checkout</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-emerald-700">Free Shipping</div>
              <p className="text-xs text-emerald-600 mt-1">On orders above ₹{freeShippingAbove}</p>
              <p className="text-[10px] text-emerald-500 mt-1 font-medium">No code needed</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. Best Sellers - Horizontal scroll */}
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
              className="text-emerald-600 hover:text-emerald-700"
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

      {/* 5. Flash Sale Countdown */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-black to-emerald-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-green-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <FlameKindling className="h-5 w-5 text-emerald-400" />
              <Badge className="bg-emerald-500 text-white border-0">Flash Sale</Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">⚡ Lightning Deals</h3>
            <p className="text-emerald-200/80 text-sm mb-4">Hurry up! These deals won&apos;t last long</p>

            {/* Countdown timer */}
            <div className="flex gap-3 mb-6">
              {[
                { value: flashTime.hours, label: 'HRS' },
                { value: flashTime.minutes, label: 'MIN' },
                { value: flashTime.seconds, label: 'SEC' },
              ].map((unit) => (
                <div key={unit.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[56px]">
                  <div className="text-xl sm:text-2xl font-bold text-white">{String(unit.value).padStart(2, '0')}</div>
                  <div className="text-[10px] text-emerald-300">{unit.label}</div>
                </div>
              ))}
            </div>

            {/* Flash sale products */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {saleProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="min-w-[180px] sm:min-w-[200px] bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-3xl text-center mb-2">
                    {product.categorySlug === 'sing' ? '🥜' : '🌰'}
                  </div>
                  <p className="text-white text-sm font-medium text-center truncate">{product.name}</p>
                  <p className="text-emerald-300 text-xs text-center mt-1">
                    From ₹{product.variants[0]?.price || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-sm text-gray-500 mt-1">What makes Satnam Singh Chana special</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Sprout className="h-6 w-6" />, title: 'Farm Fresh', desc: 'Sourced directly from trusted farms' },
            { icon: <Leaf className="h-6 w-6" />, title: 'No Preservatives', desc: '100% natural ingredients only' },
            { icon: <FlameKindling className="h-6 w-6" />, title: 'Traditional Recipe', desc: 'Authentic Gujarati flavors since 1965' },
            { icon: <Truck className="h-6 w-6" />, title: 'Fast Delivery', desc: 'Pan-India delivery in 3-5 days' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all h-full">
                <CardContent className="p-4 sm:p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3 text-emerald-600">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
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
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
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

      {/* 8. New Arrivals */}
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
              className="text-emerald-600 hover:text-emerald-700"
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

      {/* 9. Brand Story */}
      <section className="mt-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-emerald-600 text-white border-0 mb-4">Since 1965</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                A Legacy of <span className="text-emerald-400">Flavor</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For over five decades, the Singh family has been perfecting the art of roasting peanuts and chickpeas.
                What started as a small stall in Rajkot&apos;s Main Market has grown into a beloved brand trusted by thousands.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our secret? Traditional recipes passed down through generations, combined with the freshest ingredients
                from Gujarat&apos;s finest farms. Every batch is roasted to perfection, seasoned with care, and delivered
                fresh to your doorstep.
              </p>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setView('products')}
              >
                Explore Our Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-900/50 rounded-xl p-5 text-center border border-emerald-800/50">
                <div className="text-3xl font-bold text-emerald-400">60+</div>
                <p className="text-sm text-gray-400 mt-1">Years of Legacy</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 text-center border border-emerald-800/50">
                <div className="text-3xl font-bold text-emerald-400">50K+</div>
                <p className="text-sm text-gray-400 mt-1">Happy Customers</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 text-center border border-emerald-800/50">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <p className="text-sm text-gray-400 mt-1">Natural Ingredients</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 text-center border border-emerald-800/50">
                <div className="text-3xl font-bold text-emerald-400">6+</div>
                <p className="text-sm text-gray-400 mt-1">Unique Flavors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-sm text-gray-500 mt-1">Real reviews from real snack lovers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border-emerald-100">
              <CardContent className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= t.rating ? 'fill-emerald-400 text-emerald-400' : 'text-gray-200'}`}
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

      {/* 11. Instagram/Social Connect */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Follow Us</h2>
          <p className="text-sm text-gray-500 mt-1">
            @satnamsinghchana on{' '}
            <span className="text-emerald-600 font-medium">Instagram</span>
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { emoji: '🥜', bg: 'from-emerald-100 to-green-100' },
            { emoji: '🌰', bg: 'from-green-100 to-emerald-100' },
            { emoji: '🌶️', bg: 'from-emerald-100 to-green-50' },
            { emoji: '🥜', bg: 'from-green-50 to-emerald-100' },
            { emoji: '🌰', bg: 'from-emerald-100 to-green-100' },
            { emoji: '📦', bg: 'from-green-100 to-emerald-50' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center cursor-pointer border border-emerald-200/50 hover:border-emerald-400 transition-colors`}
            >
              <span className="text-3xl sm:text-4xl">{item.emoji}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <a href="#" className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 12. Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 sm:p-8 text-center border border-emerald-200">
          <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Stay in the Loop</h3>
          <p className="text-sm text-gray-500 mb-4">Get exclusive offers, new product alerts & snack tips delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shrink-0">
              Subscribe
            </Button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">No spam, unsubscribe anytime</p>
        </div>
      </section>

      {/* 13. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mt-10 mb-6">
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
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
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg"
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
