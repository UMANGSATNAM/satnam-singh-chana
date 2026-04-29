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
  ShieldCheck,
  RotateCcw,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { getProductEmoji } from '@/lib/product-display';
import type { StoreSettings } from '@/types';

interface HomePageProps {
  settings: StoreSettings | null;
}

const categories = [
  { slug: 'sing', name: 'Sing', subtitle: 'Roasted Peanuts', emoji: '🥜', gradient: 'from-emerald-500 to-emerald-700', bgLight: 'from-emerald-50 to-green-50' },
  { slug: 'chana', name: 'Chana', subtitle: 'Roasted Chickpeas', emoji: '🌰', gradient: 'from-amber-500 to-amber-700', bgLight: 'from-amber-50 to-yellow-50' },
  { slug: 'mix-namkeen', name: 'Mix & Namkeen', subtitle: 'Snack Mixes', emoji: '🍿', gradient: 'from-orange-500 to-red-600', bgLight: 'from-orange-50 to-red-50' },
  { slug: 'roasted-seeds', name: 'Roasted Seeds', subtitle: 'Healthy Seeds', emoji: '🌻', gradient: 'from-lime-500 to-green-600', bgLight: 'from-lime-50 to-green-50' },
  { slug: 'specialty', name: 'Specialty', subtitle: 'Premium Blends', emoji: '⭐', gradient: 'from-teal-500 to-cyan-600', bgLight: 'from-teal-50 to-cyan-50' },
];

const testimonials = [
  {
    name: 'Rajesh Patel',
    location: 'Mumbai',
    text: 'Best roasted peanuts I have ever had! The Kala Sing is absolutely addictive. My family finishes a pack every week.',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    text: 'The Masala Chana reminds me of my grandmother\'s recipe. Authentic flavors, great quality. Will order again!',
    rating: 5,
    avatar: '👩',
  },
  {
    name: 'Amit Joshi',
    location: 'Ahmedabad',
    text: 'Fast delivery, fresh products. The Chana Sing Mix is perfect for evening snacks. Highly recommended!',
    rating: 4,
    avatar: '👨‍💼',
  },
];

const flavorTiles = [
  { name: 'Spicy', emoji: '🌶️', gradient: 'from-red-50 to-orange-50', border: 'border-red-200', text: 'text-red-700' },
  { name: 'Mild', emoji: '🌿', gradient: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-700' },
  { name: 'Salty', emoji: '🧂', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200', text: 'text-amber-700' },
  { name: 'Sweet', emoji: '🍫', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-800' },
  { name: 'Tangy', emoji: '🍋', gradient: 'from-yellow-50 to-lime-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  { name: 'Crunchy', emoji: '💪', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', text: 'text-emerald-700' },
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
  const popularProducts = products.filter((p) => p.badge === 'Popular' || p.badge === 'Best Seller');
  const saleProducts = products.filter((p) => p.badge === 'Sale' || p.badge === 'Best Seller');
  const freeShippingAbove = settings?.freeShippingAbove || 500;
  const flashTime = useCountdown(5);

  return (
    <div>
      {/* 1. Announcement Ticker */}
      <div className="bg-black text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2.5">
          <span className="text-sm mx-6">🔥 Free Shipping on ₹500+ | Use code FIRST50 for 50% off | New Arrivals Weekly!</span>
          <span className="text-sm mx-6">🥜 Farm Fresh • No Preservatives • Since 1965</span>
          <span className="text-sm mx-6">🌶️ 28+ Products • 5 Categories • 100% Natural</span>
          <span className="text-sm mx-6">📦 Order before 2 PM for same-day dispatch!</span>
          <span className="text-sm mx-6">🔥 Free Shipping on ₹500+ | Use code FIRST50 for 50% off | New Arrivals Weekly!</span>
          <span className="text-sm mx-6">🥜 Farm Fresh • No Preservatives • Since 1965</span>
          <span className="text-sm mx-6">🌶️ 28+ Products • 5 Categories • 100% Natural</span>
          <span className="text-sm mx-6">📦 Order before 2 PM for same-day dispatch!</span>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <HeroBanner />

      {/* 3. Category Navigation Strip */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <motion.div
              key={cat.slug}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="min-w-[140px] sm:min-w-[160px] snap-start"
            >
              <Card
                className="cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  setFilters({ category: cat.slug });
                  setView('products');
                }}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${cat.gradient} p-4 sm:p-5 flex flex-col items-center text-center gap-1.5`}>
                    <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                    <h3 className="text-white font-bold text-sm sm:text-base">{cat.name}</h3>
                    <p className="text-white/70 text-[10px] sm:text-xs">{cat.subtitle}</p>
                    <p className="text-white/50 text-[9px] sm:text-[10px] mt-0.5">
                      {products.filter((p) => p.categorySlug === cat.slug).length} products
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Offer Banner Row */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 sm:p-5 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-100/50 blur-lg" />
              <div className="relative">
                <div className="text-2xl font-bold text-emerald-700">25% OFF</div>
                <p className="text-xs text-emerald-600 mt-1">On all Chana products</p>
                <p className="text-[10px] text-emerald-500 mt-1 font-medium">Limited time only</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 sm:p-5 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-100/50 blur-lg" />
              <div className="relative">
                <div className="text-2xl font-bold text-emerald-700">Buy 2 Get 1</div>
                <p className="text-xs text-emerald-600 mt-1">Free on Sing products</p>
                <p className="text-[10px] text-emerald-500 mt-1 font-medium">Auto-applied at checkout</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="border-2 border-emerald-300 rounded-xl p-4 sm:p-5 text-center bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-100/50 blur-lg" />
              <div className="relative">
                <div className="text-2xl font-bold text-emerald-700">Free Shipping</div>
                <p className="text-xs text-emerald-600 mt-1">On orders above ₹{freeShippingAbove}</p>
                <p className="text-[10px] text-emerald-500 mt-1 font-medium">No code needed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Best Sellers - Horizontal scroll carousel */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">TOP PICKS</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-sm text-gray-500">Our most loved snacks</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setFilters({ badge: 'Best Seller' });
                setView('products');
              }}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
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

      {/* 6. Flash Sale Countdown */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-black via-emerald-950 to-emerald-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-36 h-36 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-emerald-400/5 blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <FlameKindling className="h-5 w-5 text-emerald-400" />
              <Badge className="bg-emerald-500 text-white border-0 text-xs">Flash Sale</Badge>
              <span className="text-emerald-400/60 text-xs hidden sm:inline">⚡ Limited time deals</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">⚡ Lightning Deals</h3>
            <p className="text-emerald-200/70 text-sm mb-5">Hurry up! These deals won&apos;t last long</p>

            {/* Countdown timer */}
            <div className="flex gap-3 mb-6">
              {[
                { value: flashTime.hours, label: 'HRS' },
                { value: flashTime.minutes, label: 'MIN' },
                { value: flashTime.seconds, label: 'SEC' },
              ].map((unit) => (
                <div key={unit.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[60px] border border-white/10">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{String(unit.value).padStart(2, '0')}</div>
                  <div className="text-[10px] text-emerald-300 font-medium mt-0.5">{unit.label}</div>
                </div>
              ))}
            </div>

            {/* Flash sale products */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {saleProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="min-w-[160px] sm:min-w-[180px] bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15 hover:border-white/30 transition-colors cursor-pointer" onClick={() => setView('product-detail', product.id)}>
                  <div className="text-3xl text-center mb-2">
                    {getProductEmoji(product.slug, product.categorySlug)}
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

      {/* 7. Shop By Flavor */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">EXPLORE</Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shop By Flavor</h2>
          <p className="text-sm text-gray-500 mt-1">Find your perfect taste</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {flavorTiles.map((flavor, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className={`bg-gradient-to-br ${flavor.gradient} border ${flavor.border} rounded-xl p-4 sm:p-5 text-center cursor-pointer hover:shadow-md transition-all`}>
                <span className="text-3xl sm:text-4xl block mb-2">{flavor.emoji}</span>
                <span className={`text-sm font-semibold ${flavor.text}`}>{flavor.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">OUR PROMISE</Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-sm text-gray-500 mt-1">What makes Satnam Singh Chana special</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Sprout className="h-6 w-6" />, title: 'Farm Fresh', desc: 'Sourced directly from trusted farms', emoji: '🌱' },
            { icon: <Leaf className="h-6 w-6" />, title: 'No Preservatives', desc: '100% natural ingredients only', emoji: '🌿' },
            { icon: <FlameKindling className="h-6 w-6" />, title: 'Traditional Recipe', desc: 'Authentic Gujarati flavors since 1965', emoji: '🔥' },
            { icon: <Truck className="h-6 w-6" />, title: 'Fast Delivery', desc: 'Pan-India delivery in 3-5 days', emoji: '🚚' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all h-full group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-white/8 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-36 h-36 rounded-full bg-white/8 blur-3xl" />
            <span className="absolute right-6 top-2 text-[80px] opacity-10 select-none">🎉</span>
          </div>
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-3 text-xs">Limited Time Offer</Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Flat 25% OFF on Chana Products!
            </h3>
            <p className="text-white/85 text-sm mb-5">
              Use code <span className="font-mono bg-white/20 px-2 py-0.5 rounded-md font-semibold">KALA25</span> at checkout
            </p>
            <Button
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold rounded-lg px-6"
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

      {/* 10. New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">JUST IN</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-sm text-gray-500">Fresh additions to our menu</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setView('products')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 11. Popular Products */}
      {popularProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">TRENDING</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Popular Products</h2>
              <p className="text-sm text-gray-500">Loved by thousands</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setFilters({ badge: 'Popular' });
                setView('products');
              }}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {popularProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 12. Brand Story */}
      <section className="mt-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge className="bg-emerald-600 text-white border-0 mb-4">Since 1965</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
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
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6"
                onClick={() => setView('products')}
              >
                Explore Our Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-900/50 rounded-xl p-5 sm:p-6 text-center border border-emerald-800/50 hover:border-emerald-700/50 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">60+</div>
                <p className="text-sm text-gray-400 mt-1">Years of Legacy</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 sm:p-6 text-center border border-emerald-800/50 hover:border-emerald-700/50 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">50K+</div>
                <p className="text-sm text-gray-400 mt-1">Happy Customers</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 sm:p-6 text-center border border-emerald-800/50 hover:border-emerald-700/50 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">100%</div>
                <p className="text-sm text-gray-400 mt-1">Natural Ingredients</p>
              </div>
              <div className="bg-emerald-900/50 rounded-xl p-5 sm:p-6 text-center border border-emerald-800/50 hover:border-emerald-700/50 transition-colors">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">28+</div>
                <p className="text-sm text-gray-400 mt-1">Unique Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">REVIEWS</Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-sm text-gray-500 mt-1">Real reviews from real snack lovers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-emerald-100 hover:shadow-md transition-all h-full">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= t.rating ? 'fill-emerald-400 text-emerald-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 14. Instagram/Social Connect */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <Badge className="bg-emerald-100 text-emerald-700 border-0 mb-2 text-[10px]">SOCIAL</Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Follow Us</h2>
          <p className="text-sm text-gray-500 mt-1">
            @satnamsinghchana on{' '}
            <span className="text-emerald-600 font-medium">Instagram</span>
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {[
            { emoji: '🥜', bg: 'from-emerald-100 to-green-100' },
            { emoji: '🌰', bg: 'from-amber-100 to-yellow-100' },
            { emoji: '🌶️', bg: 'from-red-100 to-orange-100' },
            { emoji: '🌻', bg: 'from-lime-100 to-green-100' },
            { emoji: '🍿', bg: 'from-orange-100 to-amber-100' },
            { emoji: '📦', bg: 'from-emerald-100 to-teal-100' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center cursor-pointer border border-white/50 hover:border-emerald-300 transition-colors shadow-sm hover:shadow-md`}
            >
              <span className="text-3xl sm:text-4xl">{item.emoji}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
          {[
            { icon: Instagram, label: 'Instagram' },
            { icon: Facebook, label: 'Facebook' },
            { icon: Twitter, label: 'Twitter' },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-all hover:scale-110"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </section>

      {/* 15. Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 text-center border border-emerald-200 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-100/50 blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-green-100/50 blur-xl" />
          <div className="relative">
            <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Stay in the Loop</h3>
            <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">Get exclusive offers, new product alerts & snack tips delivered to your inbox</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/20 bg-white"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shrink-0 rounded-lg px-5">
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* 16. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mt-10 mb-6">
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <span className="absolute right-6 top-2 text-[100px] opacity-10 select-none">🛒</span>
            <span className="absolute left-4 bottom-0 text-[60px] opacity-10 select-none">🥜</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              Order Now & Get Free Shipping!
            </h3>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Free delivery on all orders above ₹{freeShippingAbove}. No coupon needed.
            </p>
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg hover:shadow-xl transition-all rounded-lg px-8"
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
