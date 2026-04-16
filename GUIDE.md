# دليل الاستخدام الشامل - AIA منصة تصميم المتاجر الإلكترونية

## جدول المحتويات
1. [البدء السريع](#البدء-السريع)
2. [شاشات واجهة المستخدم](#شاشات-واجهة-المستخدم)
3. [البيانات المطلوبة](#البيانات-المطلوبة)
4. [التخصيص والألوان](#التخصيص-والألوان)
5. [التكامل مع Supabase و Vercel](#التكامل)
6. [الصفحات والمسارات](#الصفحات-والمسارات)

---

## البدء السريع

### التثبيت على جهازك المحلي

```bash
# 1. استنساخ المستودع
cd /workspaces/AIA

# 2. تثبيت الحزم
npm install

# 3. copy ملف الإعدادات
cp .env.example .env.local

# 4. تشغيل الخادم
npm run dev

# 5. فتح المتصفح
# http://localhost:3000
```

### النشر على Vercel

```bash
# 1. قم بدفع الكود إلى GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. قم بربط المستودع بـ Vercel
# https://vercel.com/new

# 3. تحديد متغيرات البيئة
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Deploy التطبيق
```

---

## شاشات واجهة المستخدم

### 1. الصفحة الرئيسية (Landing Page)
**العنوان:** `/`
**الوصف:** صفحة ترحيب وتجميع البيانات الأولية

**المحتوى:**
- عنوان داخلي وشعار
- عرض المميزات الرئيسية
- نموذج جمع البيانات (FormBuilder)
- إحصائيات المنصة
- قسم الثقة والعملاء

**التفاعلات:**
- ملء نموذج البيانات
- الانتقال إلى معاين التصميم

---

### 2. نموذج جمع البيانات (Form Builder) - 4 خطوات

#### الخطوة 1: معلومات المتجر الأساسية
- اسم المتجر (متطلب)
- نوع النشاط (متطلب)
- الفئة المستهدفة
- المنطقة المستهدفة
- الشعار/الوصف

#### الخطوة 2: الهوية البصرية
- اختيار لوحة الألوان
- معاينة الألوان
- أسلوب التصميم
- هل توجد نسخة تطبيق جوال؟

#### الخطوة 3: المزايا والدفع
- عدد الأقسام الرئيسية
- اختيار طرق الدفع
- اختيار طرق الشحن
- هل توجد عروض موسمية؟

#### الخطوة 4: المراجعة والتأكيد
- عرض جميع البيانات المدخلة
- زر تأكيد نهائي

---

### 3. معاين المتجر الإلكتروني

#### أ. الصفحة الرئيسية (StoreFrontPage)
**العنوان:** `/store`
**المحتويات:**
- Header احترافي
- Hero Section (CTA)
- عرض التصنيفات
- شبكة المنتجات
- قسم المزايا
- نشرة بريدية
- Footer

#### ب. صفحة السلة (CartPage)
**العنوان:** `/store/cart`
**المحتويات:**
- قائمة المنتجات المختارة
- تعديل الكميات
- ملخص الطلب
- حساب الإجمالي والضرائب

#### ج. صفحة الدفع (CheckoutPage)
**العنوان:** `/store/checkout`
**المحتويات:**
- مؤشر التقدم (5 خطوات)
- بيانات العميل
- عنوان الشحن
- اختيار طريقة الشحن
- اختيار طريقة الدفع
- مراجعة الطلب

#### د. صفحة تفاصيل المنتج (ProductDetailsPage)
**العنوان:** `/store/product/:id`
**المحتويات:**
- معرض الصور
- معلومات المنتج
- السعر والخصم
- خيارات اللون والحجم
- التقييمات والمراجعات
- المنتجات ذات الصلة

---

## البيانات المطلوبة

### البيانات الإجبارية:
```
- storeName: string (اسم المتجر)
- storeType: string (نوع النشاط)
- colorPalette: string (لوحة الألوان)
- desireStyle: string (أسلوب التصميم)
- targetRegion: string (المنطقة المستهدفة)
```

### البيانات الاختيارية:
```
- targetAudience: string
- tagline: string
- hasApp: boolean
- numberOfCategories: number
- hasSeasonalOffers: boolean
- paymentMethods: string[]
- shippingMethods: string[]
```

---

## التخصيص والألوان

### لوحات الألوان المتاحة:

#### 1. فاخرة (Luxury)
```
Primary: #1a1a1a (أسود)
Secondary: #d4af37 (ذهبي)
Accent: #f5f5f5 (أبيض ناعم)
```

#### 2. عصرية (Modern)
```
Primary: #2c3e50 (أزرق داكن)
Secondary: #3498db (أزرق سماوي)
Accent: #ecf0f1 (رمادي فاتح)
```

#### 3. تقنية (Tech)
```
Primary: #0f1419 (أسود داكن)
Secondary: #00d4ff (أزرق فيروزي)
Accent: #f0f0f0 (أبيض)
```

#### 4. أنيقة (Elegant)
```
Primary: #2d2d2d (رمادي داكن)
Secondary: #8b7355 (بني فاتح)
Accent: #faf9f7 (أبيض كريمي)
```

#### 5. بسيطة (Simple)
```
Primary: #1a1a1a (أسود)
Secondary: #6c63ff (أرجواني)
Accent: #ffffff (أبيض)
```

#### 6. شبابية (Youthful)
```
Primary: #ff6b9d (وردي)
Secondary: #feca57 (أصفر)
Accent: #ffffff (أبيض)
```

### تخصيص الألوان:
```typescript
// استخدام أداة colorUtils
import { getColorPalette, lightenColor, darkenColor } from '@/lib/colorUtils';

const palette = getColorPalette('luxury');
const lightened = lightenColor(palette.primary, 20);
const darkened = darkenColor(palette.primary, 20);
```

---

## التكامل

### التكامل مع Supabase

#### الإعداد:
```bash
1. إنشاء حساب على https://supabase.com
2. إنشاء مشروع جديد
3. نسخ بيانات الاتصال
4. تحديث .env.local
```

#### المتغيرات المطلوبة:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

#### الجداول المقترحة:
```sql
-- جدول المتاجر
CREATE TABLE stores (
  id UUID PRIMARY KEY,
  store_name VARCHAR,
  store_type VARCHAR,
  color_palette VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- جدول الطلبات
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  store_id UUID,
  customer_info JSONB,
  items JSONB,
  total_amount DECIMAL,
  status VARCHAR,
  created_at TIMESTAMP
);

-- جدول العملاء
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  store_id UUID,
  name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP
);
```

### التكامل مع Vercel

#### الخطوات:
1. ربط مستودع GitHub
2. تحديد متغيرات البيئة
3. الـ Deploy التلقائي عند كل تحديث

#### بيانات البيئة على Vercel:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## الصفحات والمسارات

### الروابط الرئيسية:
```
/ - الصفحة الرئيسية (Landing Page)
/store - معاينة المتجر
/store/product/:id - تفاصيل المنتج
/store/cart - السلة
/store/checkout - الدفع
/store/account - حسابي (قريباً)
/store/favorites - المفضلة (قريباً)
/about - من نحن (قريباً)
/contact - تواصل معنا (قريباً)
/faq - أسئلة شائعة (قريباً)
/policies - السياسات (قريباً)
```

---

## نصائح التطوير

### إضافة صفحة جديدة:

```typescript
// 1. إنشاء المكون
// components/StoreDesign/NewPage.tsx
export const NewPage: React.FC = () => {
  const { config } = useStoreConfig();
  const palette = getColorPalette(config.colorPalette || 'luxury');

  return (
    <div dir="rtl">
      {/* محتوى الصفحة */}
    </div>
  );
};

// 2. إضافة إلى التصدير
// components/StoreDesign/index.ts
export { NewPage } from './NewPage';

// 3. استخدام الصفحة
import { NewPage } from '@/components/StoreDesign';
```

### تخصيص الألوان:

```typescript
// استخدام المتغيرات من الـ palette
style={{ backgroundColor: palette.primary }}
style={{ color: palette.secondary }}
className="hover:bg-light" // hover backgrounds
```

### الحالات المختلفة:

```typescript
// حالة التحميل
{isLoading && <span>جاري التحميل...</span>}

// حالة الخطأ
{error && <div className="text-danger">{error}</div>}

// حالة النجاح
{success && <div className="text-success">تم بنجاح!</div>}
```

---

## الدعم والمساعدة

### الأسئلة الشائعة:

**س: كيف أغير لون المتجر؟**
ج: استخدم نموذج جمع البيانات واختر لوحة الألوان المفضلة في الخطوة 2.

**س: هل يمكن إضافة قسم جديد؟**
ج: نعم، قم بتعديل عدد الأقسام في النموذج (خطوة 3).

**س: كيف أنشر المتجر على الإنترنت؟**
ج: استخدم Vercel كما هو موضح في دليل النشر.

---

## الملفات المهمة

```
AIA/
├── app/page.tsx           # الصفحة الرئيسية
├── components/FormBuilder # نموذج جمع البيانات
├── components/StoreDesign # مكونات المتجر
├── store/storeConfig.ts   # حالة التطبيق
├── lib/                   # أدوات وبرامج
└── constants/design.ts    # الثوابت والإعدادات
```

---

**آخر تحديث:** أبريل 2026
**الإصدار:** 0.1.0
