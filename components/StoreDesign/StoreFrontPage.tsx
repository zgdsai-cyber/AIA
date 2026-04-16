'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';
import { StoreHeader, HeroSection, ProductGrid, FeaturesSection, Footer } from '@/components/StoreDesign/index';

export const StoreFrontPage: React.FC = () => {
  const { config } = useStoreConfig();

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <StoreHeader />
      <HeroSection />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">التصنيفات الرئيسية</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: config.numberOfCategories || 6 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg border-2 border-light p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all cursor-pointer group"
            >
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {['👔', '👜', '📱', '🏠', '👟', '⌚'][idx % 6]}
              </span>
              <span className="text-xs font-semibold">فئة {idx + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <ProductGrid />
      <FeaturesSection />

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-12">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">اشترك في نشرتنا البريدية</h2>
          <p className="mb-6 opacity-90">احصل على أحدث العروض والمنتجات مباشرة إلى بريدك</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-primary focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all">
              اشترك
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
