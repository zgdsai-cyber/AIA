# 🚀 دليل النشر الكامل - AIA على GitHub, Vercel و Supabase

## المتطلبات الأساسية

✅ حساب GitHub
✅ حساب Vercel
✅ حساب Supabase
✅ Git مثبت على جهازك
✅ Node.js 18+

---

## المرحلة 1️⃣ - إعداد GitHub

### 1. تهيئة Git محلياً

```bash
# في مجلد المشروع
cd /workspaces/AIA

# تهيئة git إن لم يكن موجود
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit: AIA v0.1.0 MVP"

# عرض الحالة
git status
```

### 2. دفع إلى GitHub

**الخيار أ: مستودع جديد**

```bash
# إنشاء مستودع جديد على GitHub:
# - اذهب إلى https://github.com/new
# - اسم: AIA
# - وصف: E-commerce Store Design Platform
# - اختر: Public أو Private

# ثم في الـ Terminal:
git remote add origin https://github.com/YOUR_USERNAME/AIA.git
git branch -M main
git push -u origin main
```

### 3. تأكد من الدفع

```bash
# تحقق من المستودع
git log --oneline
```

---

## المرحلة 2️⃣ - إعداد Supabase

### 1. إنشاء مشروع جديد

1. اذهب إلى [https://app.supabase.com](https://app.supabase.com)
2. اضغط "New Project"
3. اختر المنطقة: Middle East
4. Password: حفظ قوي
5. اضغط "Create new project"

### 2. الحصول على بيانات الاتصال

1. اذهب إلى: **Settings** → **API**
2. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. إنشاء الجداول

1. اذهب إلى: **SQL Editor**
2. اضغط: "New Query"
3. انسخ محتوى: `supabase/migrations/001_initial_schema.sql`
4. الصق الكود وشغّله
5. اضغط: "Run"

### 4. تفعيل RLS

الكود يفعّل RLS تلقائياً. تحقق من:
- Setting → Database → RLS enabled

---

## المرحلة 3️⃣ - متغيرات البيئة

### في المشروع المحلي

```bash
cp .env.example .env.local
```

أضف القيم:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## المرحلة 4️⃣ - النشر على Vercel

### 1. ربط المستودع

اذهب إلى: [https://vercel.com/new](https://vercel.com/new)

1. اختر: "Import Git Repository"
2. أدخل: GitHub repo URL
3. اضغط: "Import"

### 2. إضافة متغيرات البيئة

في "Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL = https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs...
NEXT_PUBLIC_APP_ENV = production
```

### 3. النشر

اضغط: "Deploy" والانتظار

---

## ✅ التحقق من النجاح

```bash
# محلياً
npm run dev
# http://localhost:3000

# على Vercel
# https://your-aia.vercel.app
```

---

## 🔒 معلومات أمان مهمة

### لا تشارك:
❌ SUPABASE_SERVICE_ROLE_KEY
❌ Password ماستر Supabase

### آمن للمشاركة:
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY

---

**للمزيد:** اقرأ ملف [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### الصفحات القادمة:

- [ ] صفحة تفاصيل المنتج
- [ ] صفحة حسابي
- [ ] صفحة البحث
- [ ] صفحات السياسات

---

**تم إنشاؤها بواسطة: GitHub Copilot**
