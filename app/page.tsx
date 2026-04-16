'use client';

import React from 'react';
import { FormBuilder } from '@/components/FormBuilder/FormBuilder';
import { StoreFrontPage } from '@/components/StoreDesign';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';

export default function Home() {
  const [designComplete, setDesignComplete] = React.useState(false);
  const { config } = useStoreConfig();

  if (designComplete) {
    return <StoreFrontPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-light" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <div>
              <h1 className="font-bold text-2xl text-primary">AIA</h1>
              <p className="text-xs text-gray-600">منصة تصميم المتاجر الإلكترونية الحديثة</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              صمّم متجرك الإلكتروني الاحترافي
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              منصة ذكية لإنشاء متاجر إلكترونية احترافية متكاملة بسهولة
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                '🎨 تصميمات حديثة واحترافية',
                '📱 متجاوب مع جميع الأجهزة',
                '🚀 سهل الاستخدام والتخصيص',
                '💼 تحسين معدلات التحويل',
                '🔒 آمن وموثوق',
                '🌍 دعم اللغة العربية والإنجليزية',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-2xl">{feature.split(' ')[0]}</span>
                  <span className="text-gray-700">{feature.substring(3)}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">1000+</p>
                <p className="text-xs text-gray-600">متجر تم إنشاؤه</p>
              </div>
              <div className="text-center border-l border-r border-light">
                <p className="text-2xl font-bold text-secondary">50K+</p>
                <p className="text-xs text-gray-600">مستخدم نشط</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">98%</p>
                <p className="text-xs text-gray-600">رضا المستخدمين</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex items-center">
            <FormBuilder onComplete={() => setDesignComplete(true)} />
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-primary mb-6">يثق بنا الآلاف من التجار</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['🏪 المحلات التجارية', '📦 المتاجر الإلكترونية', '🎁 متاجر الخدمات', '🌟 الشركات الناشئة'].map((item) => (
              <div key={item} className="text-sm font-semibold text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white mt-16 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm opacity-75">
          <p>© 2024 AIA - منصة تصميم المتاجر الإلكترونية. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
