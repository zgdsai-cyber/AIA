'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

const features = [
  { icon: '🚀', title: 'شحن سريع', description: 'توصيل سريع وآمن' },
  { icon: '🔒', title: 'دفع آمن', description: 'معاملات آمنة 100%' },
  { icon: '↩️', title: 'استرجاع سهل', description: 'استرجاع مجاني في 30 يوم' },
  { icon: '💬', title: 'دعم فني', description: 'دعم عملاء متاح 24/7' },
];

export const FeaturesSection: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="text-center p-6 rounded-xl border border-light hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3
              className="font-semibold mb-2"
              style={{ color: palette.primary }}
            >
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
