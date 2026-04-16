# دليل إعداد Supabase

## 1. إنشاء حساب Supabase

1. اذهب إلى [https://supabase.com](https://supabase.com)
2. انقر على "Start your project"
3. سجل دخول أو أنشئ حساب جديد
4. انقر على "New Project"

## 2. تفاصيل المشروع

```
Project Name: AIA Store Designer
Database Password: (احفظ كلمة المرور)
Region: (اختر الأقرب لك - مثل: eu-west-1)
Pricing Plan: free أو pro
```

## 3. بعد إنشاء المشروع

### أ. النسخ من متغيرات البيئة:

في لوحة التحكم، اذهب إلى:
- **Settings** → **API**

ستجد:
- `Project URL` - انسخها إلى `NEXT_PUBLIC_SUPABASE_URL`
- `Anon Key` - انسخها إلى `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `Service Role Key` - احفظها بأمان (للخادم فقط)

### ب. حفظ في .env.local:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here (للخادم)
```

## 4. تنفيذ الـ Schema

### الطريقة 1: عبر Supabase Studio (الأسهل)

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. انقر **New Query**
5. انسخ محتوى ملف `schema.sql` بالكامل
6. انقر **Run** ✅

### الطريقة 2: عبر Supabase CLI

```bash
# تثبيت CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# إنشاء ملف Migration
supabase migration new create_schema

# تشغيل Migration
supabase db push
```

## 5. إعداد Authentication

اذهب إلى **Authentication** → **Providers**

### فعّل:
- ✅ Email/Password
- ✅ Google (اختياري)
- ✅ GitHub (اختياري)

### إعدادات البريد الإلكتروني:

```
Autoconfirm users: OFF (للأمان)
Email confirmatio required: ON
```

## 6. إعداد Storage Buckets

### إنشاء Buckets:

1. اذهب إلى **Storage** → **Buckets**
2. انقر **New Bucket**

#### Bucket 1: project-logos
```
Name: project-logos
Privacy: Public (للعرض العام)
```

#### Bucket 2: product-images
```
Name: product-images
Privacy: Public
```

#### Bucket 3: category-images
```
Name: category-images
Privacy: Public
```

### سياسات التخزين:

#### للـ Upload (project-logos):
```sql
CREATE POLICY "Users can upload their own logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-logos' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own logos"
ON storage.objects FOR UPDATE
WITH CHECK (
  bucket_id = 'project-logos'
  AND auth.role() = 'authenticated'
);
```

#### للـ Download:
```sql
CREATE POLICY "Public can view project logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-logos');
```

## 7. إعداد Row Level Security (RLS)

تم تضمين جميع السياسات في `schema.sql`! 

اختبر بـ:
1. اذهب إلى **SQL Editor**
2. جرّب INSERT/SELECT/UPDATE على جداول مختلفة
3. تأكد أن المستخدمين يرون فقط بياناتهم

## 8. اختبار الاتصال

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// محاولة الحصول على المستخدم
const { data: { user } } = await supabase.auth.getUser();
console.log(user);
```

## 9. أفضل الممارسات

### الأمان:
- ✅ لا تشارك Service Role Key
- ✅ استخدم RLS على جميع الجداول
- ✅ تحقق من الإذن دائماً

### الأداء:
- ✅ أنشئ indexes على الأعمدة المستخدمة كثيراً
- ✅ استخدم Pagination للبيانات الكبيرة
- ✅ Cache النتائج محلياً

### النسخ الاحتياطية:
- ✅ Supabase تنسخ احتياطياً تلقائياً
- ✅ يمكنك تنزيل النسخ يدوياً من Dashboard

## 10. استكشاف الأخطاء

### خطأ "PGRST116: The schema definition"
```
السبب: لم يتم تنفيذ schema.sql
الحل: انسخ schema.sql كاملاً وشغّله
```

### خطأ "RLS policy not found"
```
السبب: لم تُنشأ السياسات
الحل: تأكد من تشغيل كل الـ CREATE POLICY
```

### خطأ في الاتصال
```
السبب: متغيرات البيئة غير صحيحة
الحل: تحقق من .env.local
```

## الخطوات التالية:

1. ✅ أنشئ المشروع
2. ✅ نفّذ Schema
3. ✅ إعداد Authentication
4. ✅ إعداد Storage
5. ⏳ ربط التطبيق

---

**ملاحظة:** احفظ جميع بيانات الاتصال في مكان آمن!
