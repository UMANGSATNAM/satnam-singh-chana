'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const banners = [
  {
    title: 'Premium Roasted Snacks',
    subtitle: 'Handcrafted with traditional spices since 1965',
    cta: 'Shop Now',
    gradient: 'from-emerald-700 via-green-600 to-emerald-800',
    emoji: '🥜',
  },
  {
    title: 'Crispy, Crunchy & Delicious',
    subtitle: 'From farm-fresh peanuts & chickpeas to your doorstep',
    cta: 'Explore Products',
    gradient: 'from-black via-emerald-900 to-green-800',
    emoji: '🌰',
  },
  {
    title: 'Free Shipping on ₹500+',
    subtitle: 'Order your favorite snacks and save on delivery',
    cta: 'Start Shopping',
    gradient: 'from-emerald-600 via-green-700 to-emerald-900',
    emoji: '🚚',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, next]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl mx-4 mt-4"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`relative bg-gradient-to-r ${banners[current].gradient} px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white/10 blur-xl" />
            <div className="absolute bottom-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-black/10 blur-xl" />
            <span className="absolute right-4 bottom-2 text-[80px] sm:text-[120px] md:text-[160px] opacity-20 select-none">
              {banners[current].emoji}
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight"
            >
              {banners[current].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/85 mb-4 sm:mb-6"
            >
              {banners[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {banners[current].cta}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        aria-label="Next banner"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
