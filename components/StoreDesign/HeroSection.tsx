'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

export const HeroSection: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <div
      className="w-full py-16 md:py-24 text-white text-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: palette.secondary }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="text-secondary text-sm font-semibold mb-2">مرحباً بك</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {config.storeName || 'متجرك الإلكتروني'}
        </h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          {config.tagline || 'اكتشف مجموعة واسعة من المنتجات الفخمة والعصرية بأفضل الأسعار'}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className="px-8 py-3 font-semibold rounded-lg bg-white text-primary hover:shadow-lg transition-all"
            style={{ color: palette.primary }}
          >
            تسوق الآن
          </button>
          <button
            className="px-8 py-3 font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all"
          >
            اعرف أكثر
          </button>
        </div>
      </div>
    </div>
  );
};
