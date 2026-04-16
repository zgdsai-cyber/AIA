'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

const sampleProducts = [
  {
    id: 1,
    name: 'المنتج الأول',
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 128,
    image: '📱',
  },
  {
    id: 2,
    name: 'المنتج الثاني',
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviews: 256,
    image: '👜',
  },
  {
    id: 3,
    name: 'المنتج الثالث',
    price: 149,
    originalPrice: 249,
    rating: 4.3,
    reviews: 89,
    image: '⌚',
  },
  {
    id: 4,
    name: 'المنتج الرابع',
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    reviews: 312,
    image: '🎧',
  },
];

export const ProductGrid: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-2" style={{ color: palette.primary }}>
        أحدث المنتجات
      </h2>
      <p className="text-gray-600 mb-8">اكتشف أحدث المضافات لمجموعتنا</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            {/* Image Container */}
            <div
              className="w-full h-48 flex items-center justify-center text-6xl relative overflow-hidden"
              style={{ backgroundColor: palette.accent }}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </span>
              {/* Discount Badge */}
              <div
                className="absolute top-3 right-3 bg-danger text-white px-2 py-1 rounded-lg text-xs font-bold"
              >
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-2 truncate">{product.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span>⭐ {product.rating}</span>
                <span className="text-gray-500">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-lg font-bold"
                  style={{ color: palette.primary }}
                >
                  {product.price} {config.currency}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg text-white font-semibold transition-all text-sm"
                  style={{ backgroundColor: palette.secondary, color: palette.primary }}
                >
                  أضف للسلة
                </button>
                <button
                  className="px-3 py-2 rounded-lg border-2 transition-all text-lg"
                  style={{ borderColor: palette.secondary }}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
