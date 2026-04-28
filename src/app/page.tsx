'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/stores/useStore';
import StoreApp from '@/components/store/StoreApp';
import type { Product, Category, StoreSettings } from '@/types';

export default function Home() {
  const setProducts = useStore((s) => s.setProducts);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, settingsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/settings'),
        ]);

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          if (productsData.success && productsData.data) {
            setProducts(productsData.data.products as Product[]);
          }
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.success && settingsData.data) {
            setSettings(settingsData.data as StoreSettings);
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-amber-700 font-medium text-lg">Loading Satnam Singh Chana...</p>
          <p className="text-amber-600/60 text-sm mt-1">Premium Roasted Snacks</p>
        </div>
      </div>
    );
  }

  return <StoreApp settings={settings} />;
}
