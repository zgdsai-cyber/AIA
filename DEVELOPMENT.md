# AIA - ملف التطوير

## معلومات إضافية للمطورين

### هيكل المشروع

```
AIA/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # صفحة الهبوط والنموذج
│   └── globals.css         # أنماط عامة
├── components/
│   ├── Common/             # مكونات عامة
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Card.tsx
│   ├── FormBuilder/        # جمع البيانات
│   │   └── FormBuilder.tsx
│   └── StoreDesign/        # مكونات المتجر
│       ├── Header.tsx
│       ├── HeroSection.tsx
│       ├── ProductGrid.tsx
│       ├── FeaturesSection.tsx
│       ├── Footer.tsx
│       ├── StoreFrontPage.tsx
│       ├── CartPage.tsx
│       ├── CheckoutPage.tsx
│       ├── ProductDetailsPage.tsx
│       └── index.ts
├── store/
│   └── storeConfig.ts      # Zustand store
├── lib/
│   ├── colorUtils.ts       # أدوات الألوان
│   └── supabase.ts         # عميل Supabase
├── constants/
│   └── design.ts           # الثوابت
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── .env.example
├── README.md
├── GUIDE.md
└── this file

```

### المتطلبات والحزم

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.38.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### أوامر مشهورة

```bash
# التطوير
npm run dev

# البناء الإنتاجي
npm run build

# البدء في الإنتاج
npm run start

# فحص الأخطاء
npm run lint
```

---

## Flow التطبيق

```
1. المستخدم يزور الموقع
   ↓
2. يملأ نموذج جمع البيانات (4 خطوات)
   ↓
3. البيانات تُخزن في Zustand store
   ↓
4. ينتقل إلى معاينة المتجر
   ↓
5. المتجر يُعاد صياغة بناءً على البيانات
   ↓
6. يمكن مشاهدة جميع الصفحات
   ↓
7. حفظ التصميم في Supabase (اختياري)
```

---

## إضافة ميزة جديدة

### مثال: إضافة صفحة "من نحن"

#### 1. إنشاء المكون

```typescript
// components/StoreDesign/AboutPage.tsx
'use client';

import React from 'react';
import { useStoreConfig } from '@/store/storeConfig';
import { getColorPalette } from '@/lib/colorUtils';
import { StoreHeader, Footer } from '@/components/StoreDesign/index';

export const AboutPage: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <StoreHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 style={{ color: palette.primary }}>من نحن</h1>
        {/* محتوى الصفحة */}
      </div>
      
      <Footer />
    </div>
  );
};
```

#### 2. إضافة التصدير

```typescript
// components/StoreDesign/index.ts
export { AboutPage } from './AboutPage';
```

#### 3. استخدام الصفحة

```typescript
import { AboutPage } from '@/components/StoreDesign';
```

---

## تخصيص المكونات

### مثال: تخصيص الزر

```typescript
// استخدام الزر الافتراضي
<Button variant="primary" size="lg">
  انقر هنا
</Button>

// استخدام متغيرات مخصصة
<Button
  variant="secondary"
  size="sm"
  isLoading={loading}
  onClick={handleClick}
  disabled={disabled}
>
  إرسال
</Button>
```

### الأنماط المتاحة:

```typescript
variant: 'primary' | 'secondary' | 'outline' | 'ghost'
size: 'sm' | 'md' | 'lg'
```

---

## متاجر البيانات (State Management)

### استخدام الـ Store:

```typescript
import { useStoreConfig } from '@/store/storeConfig';

const MyComponent = () => {
  const { config, updateConfig } = useStoreConfig();

  // قراءة البيانات
  console.log(config.storeName);

  // تحديث البيانات
  updateConfig({ storeName: 'متجري الجديد' });

  // إعادة تعيين
  // useStoreConfig().resetConfig();
};
```

---

## الربط مع Supabase

### مثال: حفظ المتجر

```typescript
import { getSupabaseClient } from '@/lib/supabase';

const saveStore = async (config: any) => {
  const supabase = getSupabaseClient();
  
  if (!supabase) return;

  const { error } = await supabase
    .from('stores')
    .insert([
      {
        store_name: config.storeName,
        store_type: config.storeType,
        color_palette: config.colorPalette,
        config: JSON.stringify(config),
      }
    ]);

  if (error) {
    console.error('Error saving store:', error);
  }
};
```

---

## الوحدات الطلبة

### المتطلبات الإضافية القادمة:

- [ ] صفحة حسابي المتقدمة
- [ ] نظام المفضلة
- [ ] البحث المتقدم
- [ ] نظام التقييمات
- [ ] نظام الإشعارات
- [ ] تصدير التصميم (PDF/HTML)
- [ ] نسخة تطبيق جوال
- [ ] لوحة تحكم الإدارة

---

## الاختبار

### اختبار المكونات يدويًا:

```bash
# قم بالتصفح عبر المتصفح
1. http://localhost:3000 - الصفحة الرئيسية
2. املأ النموذج وانقر "إنشاء المتجر"
3. اختبر جميع الصفحات التالية
```

---

## الأخطاء الشائعة

### 1. خطأ Hydration
**السبب:** عدم تطابق المحتوى بين الخادم والعميل
**الحل:** استخدم `'use client'` في بداية المكون

### 2. خطأ الألوان أو الأنماط
**السبب:** لم يتم تحميل Tailwind CSS
**الحل:** تأكد من وجود `globals.css` و `tailwind.config.js`

### 3. خطأ الحالة (State)
**السبب:** عدم تحديث الحالة بشكل صحيح
**الحل:** استخدم `updateConfig` من الـ Store بشكل صحيح

---

## نصائح الأداء

1. **استخدم useMemo للحسابات الثقيلة**
```typescript
const result = useMemo(() => expensiveCalculation(data), [data]);
```

2. **استخدم useCallback للدوال**
```typescript
const handleClick = useCallback(() => { /* ... */ }, [dependencies]);
```

3. **تقليل حجم الصور**
- استخدم Format الصور الحديثة (WebP)
- قم بضغط الصور

4. **Code Splitting**
- استخدم Dynamic Imports عند الحاجة

---

## الموارد المفيدة

- [Next.js Documentation](https://nextjs.org)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

---

**ملاحظة:** هذا المشروع قيد التطوير المستمر. يتم إضافة مميزات جديدة بانتظام.
