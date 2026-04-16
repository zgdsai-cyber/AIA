'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';
import { StoreHeader, Footer } from '@/components/StoreDesign/index';

export const CartPage: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  const cartItems = [
    { id: 1, name: 'منتج 1', price: 299, quantity: 1, image: '📱' },
    { id: 2, name: 'منتج 2', price: 199, quantity: 2, image: '👜' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <StoreHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: palette.primary }}>
          سلتك
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-light rounded-lg hover:shadow-md transition-all"
                  >
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center text-4xl"
                      style={{ backgroundColor: palette.accent }}
                    >
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.price} {config.currency}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 border border-light rounded">-</button>
                        <span className="px-4">{item.quantity}</span>
                        <button className="px-2 py-1 border border-light rounded">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold mb-2">
                        {item.price * item.quantity} {config.currency}
                      </p>
                      <button className="text-danger text-sm hover:underline">حذف</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">السلة فارغة</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-light rounded-lg p-6 h-fit sticky top-4">
            <h2
              className="font-bold text-lg mb-6"
              style={{ color: palette.primary }}
            >
              ملخص الطلب
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between text-sm">
                <span>المجموع الفرعي</span>
                <span>{subtotal} {config.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الشحن</span>
                <span>{shipping} {config.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الضريبة</span>
                <span>{tax} {config.currency}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>الإجمالي</span>
              <span style={{ color: palette.secondary }}>
                {total} {config.currency}
              </span>
            </div>

            <button
              className="w-full py-3 text-white font-bold rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: palette.primary }}
            >
              إكمال الشراء
            </button>

            <button className="w-full mt-3 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all">
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
