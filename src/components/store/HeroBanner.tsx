'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const banners = [
  {
    title: 'Premium Roasted Snacks',
    subtitle: 'Handcrafted with traditional spices since 1965. Taste the legacy.',
    cta: 'Shop Now',
    gradient: 'from-emerald-700 via-green-600 to-emerald-800',
    emoji: '🥜',
    accent: 'emerald',
  },
  {
    title: 'Spicy & Crunchy Delights',
    subtitle: 'From Masala Sing to Peri Peri — ignite your taste buds with bold flavors.',
    cta: 'Explore Flavors',
    gradient: 'from-black via-emerald-900 to-green-800',
    emoji: '🌶️',
    accent: 'green',
  },
  {
    title: 'Healthy Roasted Seeds',
    subtitle: 'Flax, Sunflower, Pumpkin & Quinoa — nutrition meets crunch.',
    cta: 'Shop Seeds',
    gradient: 'from-emerald-600 via-lime-600 to-green-700',
    emoji: '🌻',
    accent: 'lime',
  },
  {
    title: 'Free Shipping on ₹500+',
    subtitle: 'Order your favorite snacks and enjoy free delivery across India.',
    cta: 'Start Shopping',
    gradient: 'from-emerald-600 via-green-700 to-emerald-900',
    emoji: '🚚',
    accent: 'emerald',
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
      className="relative overflow-hidden mx-4 mt-4 rounded-2xl shadow-lg shadow-emerald-200/30"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`relative bg-gradient-to-r ${banners[current].gradient} px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20 min-h-[240px] sm:min-h-[300px] md:min-h-[380px] flex items-center`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-white/8 blur-2xl" />
            <div className="absolute bottom-0 left-1/4 w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-black/10 blur-2xl" />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white/5 blur-xl" />
            {/* Large background emoji */}
            <span className="absolute right-4 sm:right-8 bottom-0 text-[100px] sm:text-[140px] md:text-[200px] opacity-15 select-none leading-none">
              {banners[current].emoji}
            </span>
            {/* Floating dots */}
            <div className="absolute top-6 right-1/4 w-2 h-2 rounded-full bg-white/20" />
            <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-white/15" />
            <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4"
            >
              <span className="text-xl">{banners[current].emoji}</span>
              <span className="text-white/90 text-xs font-medium tracking-wide uppercase">Satnam Singh Chana</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight"
            >
              {banners[current].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white/80 mb-5 sm:mb-7 max-w-md leading-relaxed"
            >
              {banners[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg hover:shadow-xl transition-all rounded-lg px-6"
              >
                {banners[current].cta}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-lg px-6"
              >
                View Menu
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        aria-label="Next banner"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
