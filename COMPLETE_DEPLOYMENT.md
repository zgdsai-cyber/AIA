# 📖 دليل النشر الشامل - AIA

## 🎯 النشر على 3 خطوات (الطريقة السريعة)

```bash
# 1️⃣ دفع إلى GitHub
git add .
git commit -m "Initial commit: AIA e-commerce platform"
git push origin main

# 2️⃣ نشر على Vercel
vercel

# 3️⃣ إعداد Supabase
# (تفاصيل أسفله)
```

---

## 📋 ما قبل النشر

### تحقق من الآتي:
- [ ] تثبيت Node.js و npm
- [ ] لديك حساب GitHub
- [ ] لديك حساب Vercel
- [ ] لديك حساب Supabase

### المتطلبات الإجبارية:
```bash
# تثبيت الحزم
npm install

# اختبار البناء محلياً
npm run build

# تشغيل الخادم
npm run dev
```

---

## 🔧 الخطوة 1: إعداد GitHub

### 1.1 إنشاء مستودع GitHub جديد

```bash
# 1. اذهب إلى: https://github.com/new

# 2. املأ البيانات:
Repository name: AIA
Description: AI-Powered E-commerce Store Design Platform
Public/Private: Public (اختياري)

# 3. لا تختر "Initialize with README" (لديك بالفعل)
```

### 1.2 دفع الكود المحلي

```bash
# في المشروع المحلي:
cd /workspaces/AIA

# ابدأ Git إن لم يكن موجود
git init

# أضف التوثيق البعيد (Remote)
git remote add origin https://github.com/YOUR_USERNAME/AIA.git

# أضف جميع الملفات
git add .

# أول commit
git commit -m "🚀 Initial commit: AIA e-commerce platform MVP"

# دفع إلى main
git branch -M main
git push -u origin main
```

### 1.3 التحقق

```bash
# تأكد من أن الملفات موجودة على GitHub
# زر: https://github.com/YOUR_USERNAME/AIA
```

---

## ☁️ الخطوة 2: النشر على Vercel

### 2.1 الربط مع Vercel

```bash
# تثبيت CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# أجب على الأسئلة:
# Project name: AIA
# Directory: ./
# Build command: npm run build ✓
# Start command: npm start ✓
# Env: Skip for now (سنضيفها بعد)
```

### 2.2 إضافة متغيرات البيئة

#### الطريقة 1: عبر واجهة Vercel

```bash
# 1. اذهب إلى: https://vercel.com/dashboard

# 2. اختر مشروعك: AIA

# 3. اضغط Settings → Environment Variables

# 4. أضف:
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_AI_KEY = your_google_ai_key (optional)
```

#### الطريقة 2: عبر CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_GOOGLE_AI_KEY
```

### 2.3 النشر

```bash
# نشر الفرع الحالي
vercel

# نشر إلى الإنتاج
vercel --prod
```

### 2.4 التحقق

```bash
# الموقع سيكون متاح على:
# https://aia-yourdomain.vercel.app
```

---

## 🗄️ الخطوة 3: إعداد Supabase

### 3.1 إنشاء مشروع

```
1. اذهب إلى: https://supabase.com
2. سجل الدخول أو أنشئ حساب
3. اضغط "New Project"
4. املأ البيانات:
   - Team: (الفريق الجديد أو الموجود)
   - Database Name: aia
   - Password: (كلمة قوية)
   - Region: (الأقرب إليك)
5. اضغط "Create new project"

التفاصيل ستظهر في:
Project Settings → API
```

### 3.2 نسخ بيانات الاتصال

```bash
# في Supabase Dashboard:
# 1. اذهب إلى: Settings → API

# 2. انسخ:
# - Project URL → NEXT_PUBLIC_SUPABASE_URL
# - anon/public → NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. حفظ في .env.local (محلي) و Vercel (الإنتاج)
```

### 3.3 إنشاء الجداول

#### الطريقة 1: استخدام SQL Editor

```bash
# 1. في Supabase، اذهب إلى: SQL Editor

# 2. اضغط: "New Query"

# 3. انسخ محتوى: SUPABASE_SETUP.md

# 4. اضغط: "Run"
```

#### الطريقة 2: استخدام CLI

```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# تطبيق migrations
supabase db push
```

### 3.4 تفعيل RLS (Row Level Security)

```bash
# في SQL Editor، شغل:

-- تفعيل RLS للجداول
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- إنشاء Policies
-- (موجودة في SUPABASE_SETUP.md)
```

---

## 🔐 متغيرات البيئة الكاملة

### المتغيرات الإجبارية:

```env
# Supabase (متطلب)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Google AI (اختياري)
NEXT_PUBLIC_GOOGLE_AI_KEY=AIzaSyDxx...
```

### كيفية الحصول على كل واحد:

```
1. SUPABASE_URL:
   - https://supabase.com → Dashboard
   - Settings → API → Project URL

2. SUPABASE_ANON_KEY:
   - نفس الصفحة → api_key

3. GOOGLE_AI_KEY:
   - https://ai.google.dev
   - Get API Key
   - اختر المشروع
   - انسخ المفتاح
```

---

## 📡 الاتصال والتكامل

### التحقق من الاتصال

```typescript
// lib/test-connection.ts
import { getSupabaseClient } from '@/lib/supabase';

export const testSupabaseConnection = async () => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    const { data, error } = await supabase.from('stores').select('count');
    if (error) throw error;
    console.log('✓ Supabase connected');
    return true;
  } catch (error) {
    console.error('✗ Connection failed:', error);
    return false;
  }
};
```

---

## 🚀 خطوات النشر المفصلة

### W1: التحضير (30 دقيقة)

```bash
# 1. تنظيف الملفات
rm -rf node_modules .next
rm .env.local

# 2. تثبيت جديد
npm install

# 3. اختبار محلي
npm run dev

# 4. اختبار البناء
npm run build
npm start
```

### W2: إعداد الخدمات (20 دقيقة)

```
1. GitHub:
   - أنشئ مستودع جديد
   - سجل دخول محلي

2. Vercel:
   - أنشئ مشروع جديد
   - ربط مع GitHub

3. Supabase:
   - أنشئ مشروع جديد
   - انسخ المتغيرات
```

### W3: النشر (10 دقائق)

```bash
# 1. دفع إلى GitHub
git push origin main

# 2. Vercel ينشر تلقائياً
# (تفقد https://vercel.com/dashboard)

# 3. التحقق من الموقع
# https://aia-yourdomain.vercel.app
```

### W4: الإعدادات (15 دقيقة)

```bash
# 1. تشغيل SQL في Supabase
# 2. تفعيل RLS
# 3. إضافة متغيرات البيئة
# 4. اختبار الاتصال
```

---

## ✅ قائمة التحقق قبل الإطلاق

- [ ] جميع الملفات في المستودع
- [ ] البناء ينجح محلياً
- [ ] الموقع يعمل على Vercel
- [ ] الاتصال بـ Supabase يعمل
- [ ] الجداول موجودة في Supabase
- [ ] RLS مفعّل
- [ ] متغيرات البيئة صحيحة
- [ ] لا توجد رسائل خطأ في Console
- [ ] الموقع يعمل بكل المتصفحات

---

## 🆘 استكشاف الأخطاء

### المشكلة: خطأ في البناء

```bash
# الحل:
npm install
npm run build

# إذا استمرت:
rm -rf node_modules .next
npm install
npm run build
```

### المشكلة: Supabase غير متصل

```bash
# تحقق من:
1. المتغيرات في .env.local
2. API Key صحيح
3. الاتصال بالإنترنت
4. Supabase Project لم يحذف
```

### المشكلة: RLS يمنع الوصول

```bash
# الحل:
-- في SQL Editor، شغل:
DROP POLICY IF EXISTS "Public store access" ON stores;
ALTER TABLE stores DISABLE ROW LEVEL SECURITY;

-- ثم أضفه مجدداً بشكل صحيح
```

---

## 📊 مراقبة الإنتاج

### تفقد السجلات:

```bash
# Vercel Logs
vercel logs

# Supabase Database Activity
# https://supabase.com → Dashboard → Database → Monitor

# Vercel Analytics
# https://vercel.com → Dashboard → Analytics
```

---

## 🔄 التحديثات المستقبلية

### نشر تحديث جديد:

```bash
# 1. عدّل الكود محلياً

# 2. اختبر
npm run dev
npm run build

# 3. دفع إلى GitHub
git add .
git commit -m "feat: أوصف التحديث"
git push origin main

# 4. Vercel ينشر تلقائياً
```

---

## 🎓 موارد إضافية

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✨ تم النشر بنجاح! 🎉

الموقع الآن:
- 🌐 متاح على الإنترنت
- 🔒 آمن مع Supabase
- ⚡ سريع مع Vercel
- 🚀 جاهز للعملاء

استمتع! 🚀
