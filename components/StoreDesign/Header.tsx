'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

export const StoreHeader: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <header
      className="w-full border-b border-light"
      style={{ backgroundColor: palette.accent }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: palette.primary }}
            >
              {config.storeName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-lg" style={{ color: palette.primary }}>
                {config.storeName}
              </h1>
              <p className="text-xs text-gray-600">{config.tagline}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 flex-grow justify-center">
            {['الرئيسية', 'الفئات', 'المفضلة', 'العروض'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: palette.primary }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            <button className="p-2 hover:bg-light rounded-lg transition-colors">
              🔍
            </button>
            <button className="p-2 hover:bg-light rounded-lg transition-colors">
              ❤️
            </button>
            <button
              className="p-2 text-white font-semibold rounded-lg flex items-center gap-1"
              style={{ backgroundColor: palette.secondary }}
            >
              🛒
              <span className="text-xs bg-danger rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
