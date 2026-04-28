'use client';

import { useStore } from '@/stores/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import { SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGrid() {
  const { filteredProducts, filters, setFilters, clearFilters, searchQuery } = useStore();

  const activeFiltersCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.weight,
    filters.badge,
    filters.search,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {searchQuery ? `Search: "${searchQuery}"` : filters.category ? `${filters.category === 'sing' ? 'Sing' : 'Chana'} Products` : 'All Products'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
        {/* Category tabs */}
        <div className="flex gap-1">
          {[
            { label: 'All', value: undefined },
            { label: 'Sing', value: 'sing' },
            { label: 'Chana', value: 'chana' },
          ].map((cat) => (
            <Button
              key={cat.label}
              variant={filters.category === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ category: cat.value })}
              className={
                filters.category === cat.value
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                  : 'border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="h-6 w-px bg-emerald-200 hidden sm:block" />

        {/* Weight filter */}
        <Select
          value={filters.weight || '__all__'}
          onValueChange={(val) => setFilters({ weight: val === '__all__' ? undefined : val })}
        >
          <SelectTrigger className="w-[120px] h-8 text-xs border-emerald-200">
            <SelectValue placeholder="Weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Weights</SelectItem>
            <SelectItem value="250g">250g</SelectItem>
            <SelectItem value="500g">500g</SelectItem>
          </SelectContent>
        </Select>

        {/* Badge filter */}
        <Select
          value={filters.badge || '__all__'}
          onValueChange={(val) => setFilters({ badge: val === '__all__' ? undefined : val })}
        >
          <SelectTrigger className="w-[130px] h-8 text-xs border-emerald-200">
            <SelectValue placeholder="Badge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Badges</SelectItem>
            <SelectItem value="Best Seller">Best Seller</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Sale">Sale</SelectItem>
            <SelectItem value="Limited">Limited</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sortBy || '__default__'}
          onValueChange={(val) => setFilters({ sortBy: val === '__default__' ? undefined : val as 'price_asc' | 'price_desc' | 'name' | 'newest' })}
        >
          <SelectTrigger className="w-[140px] h-8 text-xs border-emerald-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__default__">Default</SelectItem>
            <SelectItem value="price_asc">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
            <SelectItem value="name">Name: A → Z</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Products grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">🔍</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <Button onClick={clearFilters} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            Clear all filters
          </Button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}
