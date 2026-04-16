'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';
import { StoreHeader, Footer } from '@/components/StoreDesign/index';

export const ProductDetailsPage: React.FC<{ productId?: number }> = ({ productId = 1 }) => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  const product = {
    id: productId,
    name: 'منتج احترافي فاخر',
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    reviews: 234,
    stock: 12,
    images: ['📱', '📱', '📱', '📱'],
    description: 'هذا المنتج تم اختياره بعناية ليوفر أفضل جودة وأداء. مصنوع من أفضل المواد مع ضمان شامل.',
    features: [
      '✨ جودة عالية',
      '🏆 أكثر المبيعات',
      '🚚 شحن سريع مجاني',
      '🔄 استرجاع سهل',
      '💯 ضمان 2 سنة',
      '🛡️ دفع آمن',
    ],
    colors: ['أسود', 'ذهبي', 'أبيض', 'فضي'],
    sizes: ['S', 'M', 'L', 'XL'],
    relatedProducts: [
      { id: 2, name: 'منتج مشابه 1', price: 199, image: '👜' },
      { id: 3, name: 'منتج مشابه 2', price: 249, image: '⌚' },
      { id: 4, name: 'منتج مشابه 3', price: 179, image: '🎧' },
    ],
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <StoreHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm mb-8 text-gray-600">
          {['الرئيسية', 'الفئات', 'المنتجات', product.name].map((item, idx, arr) => (
            <div key={idx}>
              <a href="#" className="hover:text-primary transition">
                {item}
              </a>
              {idx < arr.length - 1 && <span className="mx-2">/</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div
              className="w-full aspect-square rounded-xl flex items-center justify-center text-9xl mb-4"
              style={{ backgroundColor: palette.accent }}
            >
              {product.images[selectedImage]}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg flex items-center justify-center text-4xl border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-secondary'
                      : 'border-light hover:border-secondary'
                  }`}
                  style={{
                    backgroundColor: selectedImage === idx ? palette.accent : palette.light,
                  }}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title & Rating */}
            <h1 className="text-3xl font-bold mb-2" style={{ color: palette.primary }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= Math.floor(product.rating) ? '⭐' : '☆'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} تقييم)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-4xl font-bold"
                style={{ color: palette.secondary }}
              >
                {product.price} {config.currency}
              </span>
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice}
              </span>
              <span
                className="px-3 py-1 rounded-lg text-white text-sm font-bold"
                style={{ backgroundColor: palette.primary }}
              >
                -{((1 - product.price / product.originalPrice) * 100).toFixed(0)}%
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6 p-3 rounded-lg" style={{ backgroundColor: palette.light }}>
              <p className="text-sm">
                <span className="font-semibold">الحالة:</span>{' '}
                <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                  {product.stock > 0 ? `متوفر (${product.stock} في المخزن)` : 'غير متوفر'}
                </span>
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-6">
              {/* Color */}
              <div>
                <label className="font-semibold text-sm mb-2 block">اللون</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 rounded-lg border-2 border-light hover:border-secondary transition-all"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="font-semibold text-sm mb-2 block">الحجم</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 rounded-lg border-2 border-light hover:border-secondary transition-all flex items-center justify-center"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="font-semibold text-sm mb-2 block">الكمية</label>
                <div className="flex items-center gap-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border border-light rounded-lg hover:bg-light transition-all"
                  >
                    −
                  </button>
                  <span className="px-6">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 border border-light rounded-lg hover:bg-light transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                className="flex-1 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90 text-lg"
                style={{ backgroundColor: palette.secondary, color: palette.primary }}
              >
                أضف إلى السلة
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                ❤️ أضف للمفضلة
              </button>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-light rounded-lg">
              {product.features.map((feature, idx) => (
                <div key={idx} className="text-xs text-center">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: palette.primary }}
          >
            الوصف
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>

          {/* Detailed Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-6 bg-light rounded-lg">
            {[
              { label: 'الوزن', value: '250g' },
              { label: 'الأبعاد', value: '20x10x5cm' },
              { label: 'المادة', value: 'مادة فاخرة' },
              { label: 'الضمان', value: 'سنتان' },
            ].map((spec, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-gray-600 mb-1">{spec.label}</p>
                <p className="font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: palette.primary }}
          >
            التقييمات ({product.reviews})
          </h2>

          <div className="space-y-4">
            {[
              { name: 'أحمد', rating: 5, text: 'منتج ممتاز جداً، جودة عالية' },
              { name: 'فاطمة', rating: 4, text: 'جيد جداً، توصيل سريع' },
              { name: 'محمد', rating: 5, text: 'أفضل ما يمكن، ينصح به' },
            ].map((review, idx) => (
              <div key={idx} className="p-4 border border-light rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <span>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: palette.primary }}
          >
            منتجات ذات صلة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map((prod) => (
              <div key={prod.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div
                  className="w-full h-40 flex items-center justify-center text-6xl"
                  style={{ backgroundColor: palette.accent }}
                >
                  {prod.image}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{prod.name}</h3>
                  <p className="font-bold" style={{ color: palette.secondary }}>
                    {prod.price} {config.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
