'use client';

import { useStore } from '@/stores/useStore';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { products, wishlist, setView } = useStore();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  if (wishlisted.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-rose-400" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save your favorite snacks for later!</p>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-sm text-gray-500 mt-1">{wishlisted.length} item{wishlisted.length !== 1 ? 's' : ''}</p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {wishlisted.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
