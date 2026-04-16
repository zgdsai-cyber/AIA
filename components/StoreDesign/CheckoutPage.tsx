'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';
import { StoreHeader, Footer } from '@/components/StoreDesign/index';

export const CheckoutPage: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');
  const [step, setStep] = React.useState(1);

  const checkoutSteps = [
    { id: 1, label: 'بيانات العميل', icon: '👤' },
    { id: 2, label: 'عنوان الشحن', icon: '📍' },
    { id: 3, label: 'طريقة الشحن', icon: '🚚' },
    { id: 4, label: 'طريقة الدفع', icon: '💳' },
    { id: 5, label: 'المراجعة', icon: '✓' },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <StoreHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: palette.primary }}>
          إتمام الشراء
        </h1>

        {/* Progress Steps */}
        <div className="flex gap-2 md:gap-4 mb-12 overflow-x-auto pb-4">
          {checkoutSteps.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s.id <= step
                    ? 'text-white'
                    : 'bg-light text-gray-600'
                }`}
                style={{
                  backgroundColor: s.id <= step ? palette.secondary : undefined,
                }}
              >
                {s.id <= step ? s.icon : s.id}
              </div>
              <span className="text-xs md:text-sm font-semibold hidden md:inline">
                {s.label}
              </span>
              {idx < checkoutSteps.length - 1 && (
                <div
                  className={`w-8 h-1 mx-2 rounded transition-all ${
                    s.id < step ? 'bg-secondary' : 'bg-light'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-light rounded-lg p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>👤</span> بيانات العميل
                  </h2>
                  <input
                    type="text"
                    placeholder="الاسم كاملاً"
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>📍</span> عنوان الشحن
                  </h2>
                  <input
                    type="text"
                    placeholder="المدينة"
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    placeholder="الحي"
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                  <textarea
                    placeholder="العنوان التفصيلي"
                    rows={3}
                    className="w-full px-4 py-3 border border-light rounded-lg focus:outline-none focus:border-secondary"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>🚚</span> طريقة الشحن
                  </h2>
                  {config.shippingMethods?.map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 border border-light rounded-lg cursor-pointer hover:bg-light transition-all">
                      <input type="radio" name="shipping" className="w-4 h-4" />
                      <span className="font-semibold">
                        {method === 'standard' && '📦 شحن قياسي (3-7 أيام)'}
                        {method === 'express' && '⚡ شحن سريع (1-2 يوم)'}
                        {method === 'same' && '🚀 توصيل يوم واحد'}
                        {method === 'pickup' && '🏪 الاستلام من الفرع'}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>💳</span> طريقة الدفع
                  </h2>
                  {config.paymentMethods?.map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 border border-light rounded-lg cursor-pointer hover:bg-light transition-all">
                      <input type="radio" name="payment" className="w-4 h-4" />
                      <span className="font-semibold">
                        {method === 'creditcard' && '💳 بطاقة ائتمان'}
                        {method === 'cod' && '📦 الدفع عند الاستقبال'}
                        {method === 'bank' && '🏦 تحويل بنكي'}
                        {method === 'applepay' && '🍎 Apple Pay'}
                        {method === 'googleplay' && '🔵 Google Pay'}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>✓</span> المراجعة والتأكيد
                  </h2>
                  <div className="space-y-4 text-sm">
                    <p><span className="font-semibold">الاسم:</span> أحمد محمد</p>
                    <p><span className="font-semibold">البريد:</span> ahmed@example.com</p>
                    <p><span className="font-semibold">العنوان:</span> السعودية - الرياض</p>
                    <p><span className="font-semibold">الشحن:</span> قياسي</p>
                    <p><span className="font-semibold">الدفع:</span> بطاقة ائتمان</p>
                    <div className="mt-6 pt-4 border-t border-light">
                      <p className="text-center font-bold">الإجمالي: 1,299 SAR</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="flex-1 px-6 py-3 border-2 border-light rounded-lg font-semibold hover:bg-light transition-all disabled:opacity-50"
                >
                  السابق
                </button>
                {step < 5 ? (
                  <button
                    onClick={() => setStep(Math.min(5, step + 1))}
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                  >
                    التالي
                  </button>
                ) : (
                  <button
                    className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: palette.secondary, color: palette.primary }}
                  >
                    تأكيد الطلب
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-light rounded-lg p-6 h-fit sticky top-4">
            <h3
              className="font-bold text-lg mb-4"
              style={{ color: palette.primary }}
            >
              ملخص الطلب
            </h3>
            <div className="space-y-3 pb-4 border-b border-gray-300">
              <div className="flex justify-between text-sm">
                <span>3 منتجات</span>
                <span>1,099 {config.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الشحن</span>
                <span>50 {config.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الضريبة</span>
                <span>150 {config.currency}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>الإجمالي</span>
              <span style={{ color: palette.secondary }}>
                1,299 {config.currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
