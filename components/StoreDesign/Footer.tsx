'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

export const Footer: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <footer
      className="w-full mt-16 pt-12 pb-6"
      style={{ backgroundColor: palette.primary, color: palette.accent }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b" style={{ borderColor: palette.secondary }}>
          {/* Store Info */}
          <div>
            <h4 className="font-bold mb-4">{config.storeName}</h4>
            <p className="text-sm opacity-75">{config.tagline}</p>
            <p className="text-xs opacity-50 mt-4">© 2024 جميع الحقوق محفوظة</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">الروابط المهمة</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="#" className="hover:opacity-100 transition">من نحن</a></li>
              <li><a href="#" className="hover:opacity-100 transition">تواصل معنا</a></li>
              <li><a href="#" className="hover:opacity-100 transition">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:opacity-100 transition">بلاغ عطل</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold mb-4">السياسات</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="#" className="hover:opacity-100 transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:opacity-100 transition">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:opacity-100 transition">سياسة الشحن</a></li>
              <li><a href="#" className="hover:opacity-100 transition">سياسة الاسترجاع</a></li>
            </ul>
          </div>

          {/* Payment & Social */}
          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-3 mb-6">
              {['📘', '🐦', '📸', '▶️'].map((icon, idx) => (
                <button
                  key={idx}
                  className="text-xl hover:scale-110 transition-transform"
                >
                  {icon}
                </button>
              ))}
            </div>
            <h4 className="font-bold mb-2 text-sm">طرق الدفع</h4>
            <div className="flex gap-2 text-sm">
              {['💳', '📱', '🏦'].map((icon, idx) => (
                <span key={idx}>{icon}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs opacity-50">
          <p>تم تطويره بواسطة AIA - منصة تصميم المتاجر الإلكترونية الحديثة</p>
        </div>
      </div>
    </footer>
  );
};
