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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-white font-bold text-lg">SS</span>
          </div>
          <p className="text-emerald-400 font-semibold text-xl tracking-wide">Satnam Singh Chana</p>
          <p className="text-emerald-500/50 text-sm mt-1">Premium Roasted Snacks</p>
        </div>
      </div>
    );
  }

  return <StoreApp settings={settings} />;
}
