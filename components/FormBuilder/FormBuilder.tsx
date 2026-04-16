'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { Input, Select, Button, Card } from '@/components/Common';
import {
  storeTypes,
  targetAudience,
  targetRegions,
  designStyles,
  colorPalettes,
  paymentMethods,
  shippingMethods,
} from '@/constants/design';

interface FormBuilderProps {
  onComplete: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ onComplete }) => {
  const { config, updateConfig } = useStoreConfig();
  const [step, setStep] = React.useState(1);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    updateConfig({ [field]: value } as any);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!config.storeName?.trim()) newErrors.storeName = 'الرجاء إدخال اسم المتجر';
      if (!config.storeType) newErrors.storeType = 'الرجاء اختيار نوع المتجر';
    }

    if (step === 2) {
      if (!config.colorPalette) newErrors.colorPalette = 'الرجاء اختيار لوحة الألوان';
      if (!config.desireStyle) newErrors.desireStyle = 'الرجاء اختيار أسلوب التصميم';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    if (validateStep()) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                s <= step ? 'bg-secondary' : 'bg-light'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">الخطوة {step} من 4</p>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">معلومات المتجر الأساسية</h2>
          <div className="space-y-4">
            <Input
              label="اسم المتجر"
              value={config.storeName || ''}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
              placeholder="مثال: متجر الفخامة"
              error={errors.storeName}
            />

            <Select
              label="نوع النشاط"
              options={storeTypes}
              value={config.storeType || ''}
              onChange={(e) => handleInputChange('storeType', e.target.value)}
              error={errors.storeType}
            />

            <Select
              label="الفئة المستهدفة"
              options={targetAudience}
              value={config.targetAudience || ''}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />

            <Select
              label="المنطقة المستهدفة"
              options={targetRegions}
              value={config.targetRegion || ''}
              onChange={(e) => {
                const region = targetRegions.find((r) => r.value === e.target.value);
                if (region) {
                  handleInputChange('targetRegion', e.target.value);
                  handleInputChange('currency', region.currency);
                }
              }}
            />

            <Input
              label="الشعار (وصف أو رابط)"
              value={config.tagline || ''}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              placeholder="مثال: جودة وأناقة بكل منتج"
            />
          </div>
        </Card>
      )}

      {/* Step 2: Design & Branding */}
      {step === 2 && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">الهوية البصرية والتصميم</h2>
          <div className="space-y-4">
            <Select
              label="لوحة الألوان"
              options={Object.entries(colorPalettes).map(([key, val]) => ({
                value: key,
                label: val.name,
              }))}
              value={config.colorPalette || ''}
              onChange={(e) => handleInputChange('colorPalette', e.target.value)}
              error={errors.colorPalette}
            />

            {config.colorPalette && (
              <div className="p-4 bg-light rounded-lg">
                <p className="text-sm font-semibold mb-3">معاينة الألوان:</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.values(
                    colorPalettes[config.colorPalette as keyof typeof colorPalettes]
                  )
                    .slice(0, -1)
                    .map((color: any, idx: number) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-lg border-2 border-gray-300"
                        style={{ backgroundColor: typeof color === 'string' ? color : undefined }}
                        title={typeof color === 'string' ? color : ''}
                      />
                    ))}
                </div>
              </div>
            )}

            <Select
              label="أسلوب التصميم"
              options={designStyles}
              value={config.desireStyle || ''}
              onChange={(e) => handleInputChange('desireStyle', e.target.value)}
              error={errors.desireStyle}
            />

            <div>
              <label className="font-semibold text-sm text-primary">
                هل تريد تطبيق جوال أيضاً؟
              </label>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleInputChange('hasApp', true)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    config.hasApp
                      ? 'bg-secondary text-primary border-secondary'
                      : 'border-light hover:border-secondary'
                  }`}
                >
                  نعم
                </button>
                <button
                  onClick={() => handleInputChange('hasApp', false)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    !config.hasApp
                      ? 'bg-secondary text-primary border-secondary'
                      : 'border-light hover:border-secondary'
                  }`}
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Features & Payment */}
      {step === 3 && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">المزايا والدفع والشحن</h2>
          <div className="space-y-4">
            <Input
              type="number"
              label="عدد الأقسام الرئيسية"
              value={config.numberOfCategories || 6}
              onChange={(e) => handleInputChange('numberOfCategories', parseInt(e.target.value))}
              min="3"
              max="15"
            />

            <div>
              <label className="font-semibold text-sm text-primary">
                طرق الدفع المطلوبة
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => {
                      const methods = config.paymentMethods || [];
                      const updated = methods.includes(method.value)
                        ? methods.filter((m) => m !== method.value)
                        : [...methods, method.value];
                      handleInputChange('paymentMethods', updated);
                    }}
                    className={`px-3 py-2 rounded-lg border-2 text-sm transition-colors ${
                      (config.paymentMethods || []).includes(method.value)
                        ? 'bg-secondary text-primary border-secondary'
                        : 'border-light hover:border-secondary'
                    }`}
                  >
                    {method.icon} {method.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm text-primary">
                طرق الشحن المطلوبة
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {shippingMethods.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => {
                      const methods = config.shippingMethods || [];
                      const updated = methods.includes(method.value)
                        ? methods.filter((m) => m !== method.value)
                        : [...methods, method.value];
                      handleInputChange('shippingMethods', updated);
                    }}
                    className={`px-3 py-2 rounded-lg border-2 text-sm transition-colors ${
                      (config.shippingMethods || []).includes(method.value)
                        ? 'bg-secondary text-primary border-secondary'
                        : 'border-light hover:border-secondary'
                    }`}
                  >
                    {method.icon} {method.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm text-primary">
                هل توجد عروض موسمية؟
              </label>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleInputChange('hasSeasonalOffers', true)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    config.hasSeasonalOffers
                      ? 'bg-secondary text-primary border-secondary'
                      : 'border-light hover:border-secondary'
                  }`}
                >
                  نعم
                </button>
                <button
                  onClick={() => handleInputChange('hasSeasonalOffers', false)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    !config.hasSeasonalOffers
                      ? 'bg-secondary text-primary border-secondary'
                      : 'border-light hover:border-secondary'
                  }`}
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 4: Summary & Confirmation */}
      {step === 4 && (
        <Card>
          <h2 className="text-2xl font-bold mb-6">مراجعة البيانات</h2>
          <div className="space-y-3 text-sm">
            <div className="border-b pb-2">
              <span className="font-semibold">اسم المتجر:</span> {config.storeName}
            </div>
            <div className="border-b pb-2">
              <span className="font-semibold">نوع النشاط:</span>{' '}
              {storeTypes.find((t) => t.value === config.storeType)?.label}
            </div>
            <div className="border-b pb-2">
              <span className="font-semibold">أسلوب التصميم:</span>{' '}
              {designStyles.find((s) => s.value === config.desireStyle)?.label}
            </div>
            <div className="border-b pb-2">
              <span className="font-semibold">لوحة الألوان:</span>{' '}
              {
                colorPalettes[config.colorPalette as keyof typeof colorPalettes]?.name
              }
            </div>
            <div className="border-b pb-2">
              <span className="font-semibold">طرق الدفع:</span>{' '}
              {(config.paymentMethods || [])
                .map((m) => paymentMethods.find((p) => p.value === m)?.label)
                .join(' + ')}
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            سيتم إنشاء تصميم متجرك الآن. قد يستغرق هذا لحظات قليلة...
          </p>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={step === 1}
          className="flex-1"
        >
          السابق
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext} className="flex-1">
            التالي
          </Button>
        ) : (
          <Button onClick={handleComplete} className="flex-1">
            إنشاء المتجر
          </Button>
        )}
      </div>
    </div>
  );
};
