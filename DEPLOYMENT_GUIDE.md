# 🚀 دليل النشر الشامل - GitHub, Vercel, Supabase

## المرحلة 1️⃣: الإعداد المسبق

### ✅ المتطلبات:

- [x] حساب GitHub (free)
- [x] حساب Vercel (free)
- [x] حساب Supabase (free)
- [x] Git مثبت على جهازك
- [x] Node.js 18+

### ✅ المكونات المطلوبة:

- [x] ملف schema.sql الخاص بـ Supabase
- [x] ملف vercel.json
- [x] ملفات GitHub Workflows
- [x] ملفات .env

---

## المرحلة 2️⃣: إعداد GitHub

### الخطوة 1: إعداد Git محلياً

```bash
cd /workspaces/AIA

# تحقق من git
git --version

# إعداد البيانات الشخصية (إذا لم تكن معدة)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# تحقق من الحالة الحالية
git status
```

### الخطوة 2: إنشاء Repository على GitHub

1. اذهب إلى [https://github.com/new](https://github.com/new)
2. أملأ:
   - **Repository name:** `AIA`
   - **Description:** `E-commerce Store Design Platform - منصة تصميم المتاجر الإلكترونية`
   - **Visibility:** Public
   - **Initialize this repository:** ❌ (NO - لدينا بالفعل ملفات)

3. اضغط **Create Repository**

### الخطوة 3: دفع المشروع إلى GitHub

```bash
# أضف Remote (استبدل USERNAME - غيرها بـ GitHub username)
git remote add origin https://github.com/USERNAME/AIA.git

# تحقق من الـ Remote
git remote -v

# أول commit
git add .
git commit -m "🚀 Initial commit: AIA E-commerce Designer v0.1.0

- Full e-commerce store design platform
- 6 professional color palettes
- Responsive design (Mobile, Tablet, Desktop)
- Complete Supabase schema with RLS
- Ready for production deployment"

# أعد تسمية Branch (إذا لزم الأمر)
git branch -M main

# Push إلى GitHub
git push -u origin main
```

### الخطوة 4: تحقق من GitHub

```
اذهب إلى: https://github.com/USERNAME/AIA
يجب أن ترى جميع الملفات الآن! ✅
```

---

## المرحلة 3️⃣: إعداد Supabase

### الخطوة 1: إنشاء مشروع Supabase

1. اذهب إلى [https://app.supabase.com](https://app.supabase.com)
2. اضغط **New Project**
3. أملأ:
   - **Name:** `aia-designer` أو اسم آخر
   - **Password:** احفظ كلمة المرور! 🔐
   - **Region:** اختر الأقرب لك (EU, US, Asia, etc.)
   - **Pricing:** Free ✅

4. اضغط **Create New Project**

### الخطوة 2: انتظر التهيئة

بعد 2-5 دقائق، سيكون الـ Dashboard جاهز.

### الخطوة 3: نسخ بيانات الاتصال

اذهب إلى **Settings** → **API**

انسخ:
```
Project URL (NEXT_PUBLIC_SUPABASE_URL):
https://your-project-id.supabase.co

Anon Key (NEXT_PUBLIC_SUPABASE_ANON_KEY):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Service Role Key (احفظ للخادم فقط):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### الخطوة 4: حفظ في .env.local

```bash
# أنشئ أو عدّل ملف .env.local في المشروع
cat > /workspaces/AIA/.env.local << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Development
NODE_ENV=development
EOF
```

### الخطوة 5: تنفيذ Schema SQL

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. اضغط **New Query**
5. انسخ محتوى `/workspaces/AIA/supabase/schema.sql` بالكامل
6. اضغط **Run**

#### يجب أن ترى:
```
✅ Success!
15 tables created
24 policies created
6 functions created
```

### الخطوة 6: إعداد Storage Buckets

في Supabase Dashboard:
1. اذهب إلى **Storage**
2. اضغط **Create New Bucket**

#### الـ Buckets المطلوبة:

**1️⃣ project-logos**
```
Name: project-logos
Privacy: Public
Row Level Security (RLS): Disable (اختياري)
```

**2️⃣ product-images**
```
Name: product-images
Privacy: Public
```

**3️⃣ category-images**
```
Name: category-images
Privacy: Public
```

### الخطوة 7: إعداد Authentication

1. اذهب إلى **Authentication** → **Providers**
2. فعّل:
   - ✅ Email
   - ✅ Google (اختياري - قريباً)
   - ✅ GitHub (اختياري - قريباً)

3. إعدادات البريد:
   - **Auto confirm users:** OFF
   - **Require email confirmation:** ON

---

## المرحلة 4️⃣: إعداد Vercel

### الخطوة 1: إنشاء حساب Vercel

1. اذهب إلى [https://vercel.com](https://vercel.com)
2. اضغط **Sign Up**
3. اختر **Continue with GitHub** ⭐
4. وافق على الإذن

### الخطوة 2: ربط Repository

1. في Vercel Dashboard، اضغط **New Project**
2. اضغط **Import Git Repository**
3. ابحث عن **AIA**
4. اختر Repository
5. اضغط **Import**

### الخطوة 3: إعداد Build Settings

يجب أن يظهر:
```
Framework: Next.js ✅
Root Directory: ./ ✅
Build Command: npm run build ✅
Output Directory: .next ✅
```

### الخطوة 4: إضافة متغيرات البيئة

في صفحة الإعدادات، اضغط **Environment Variables**

أضف:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your-anon-key-here
```

معاينات:
- ✅ Production
- ✅ Preview
- ✅ Development

### الخطوة 5: Deploy

اضغط **Deploy**

انتظر 2-3 دقائق...

### ✅ تم النشر!

سترى رابط جديد مثل:
```
https://aia.vercel.app
```

---

## المرحلة 5️⃣: الاختبار والتحقق

### اختبر التطبيق:

1. **افتح الرابط:**
   ```
   https://aia.vercel.app
   ```

2. **اختبر الميزات:**
   - [ ] الصفحة الرئيسية تحمل
   - [ ] النموذج يعمل
   - [ ] الألوان تتغير
   - [ ] ينجح الملأ الكامل

3. **اختبر Supabase:**
   ```bash
   # افتح الـ Console في المتصفح (F12)
   # جرّب:
   import { createClient } from '@supabase/supabase-js';
   const sb = createClient(url, key);
   ```

### اختبر الاتصال:

```javascript
// في browser console:
const { data } = await supabase.auth.getSession();
console.log(data);
```

---

## المرحلة 6️⃣: التحديثات المستقبلية

### عملية التطوير المستقبلية:

```bash
# جعل تغييرات محلية
git add .
git commit -m "feat: add new feature"

# Push
git push

# Vercel سينشر تلقائياً! 🚀
```

---

## 🔒 الأمان والعناية

### ✅ أفضل الممارسات:

1. **حماية الفروع:**
   - في GitHub: Settings → Branch Protection
   - اطلب PR Reviews قبل الـ Merge

2. **متغيرات آمنة:**
   - لا تشارك Service Role Key
   - استخدم Environment Variables فقط

3. **RLS القوي:**
   - تم تفعيل RLS على جميع الجداول
   - التحقق من الإذن تلقائي

4. **النسخ الاحتياطية:**
   - Supabase تنسخ احتياطياً تلقائياً
   - Vercel تحتفظ بـ Git History

---

## 📊 المراقبة والإدارة

### Vercel Dashboard:

- **Deployments:** شاهد سجل جميع النشرات
- **Analytics:** أداء التطبيق
- **Logs:** أخطاء وتحذيرات

### Supabase Dashboard:

- **Database:** إدارة الجداول
- **Auth:** إدارة المستخدمين
- **Storage:** إدارة الملفات
- **Logs:** أخطاء النظام

---

## 🆘 استكشاف الأخطاء

### لا يحمل التطبيق؟

```
1. تحقق من متغيرات البيئة
2. تحقق من Supabase Connection
3. شاهد Vercel Logs
```

### خطأ في RLS؟

```
1. تأكد من تشغيل schema.sql كاملاً
2. تحقق من Supabase Policies
3. سجل دخول بـ auth صحيح
```

### بطء النطاق؟

```
1. استخدم Vercel CDN
2. حسّن صور الدعم
3. أضف Caching
```

---

## ✅ قائمة التحقق النهائية

- [ ] ✅ Repository على GitHub
- [ ] ✅ مشروع على Supabase
- [ ] ✅ Schema SQL محدثة
- [ ] ✅ Storage Buckets جاهزة
- [ ] ✅ مشروع على Vercel
- [ ] ✅ متغيرات البيئة صحيحة
- [ ] ✅ التطبيق يحمل
- [ ] ✅ الاتصال مع Supabase يعمل
- [ ] ✅ Form يعمل بشكل صحيح
- [ ] ✅ RLS محمي

---

## 🎉 تم بنجاح!

تطبيقك الآن:
- 📍 مستضاف على Vercel
- 📊 متصل بـ Supabase
- 🔐 محمي بـ RLS
- 🌍 متاح على الإنترنت
- ⚡ يتحدّث تلقائياً عند Commits

---

**الرابط النهائي:**
```
🌐 https://aia.vercel.app
```

**روابط مهمة:**
```
GitHub: https://github.com/USERNAME/AIA
Supabase: https://app.supabase.com
Vercel: https://vercel.com/dashboard
```

---

**ملاحظات:**
- احفظ كل بيانات الاتصال
- تابع Commit logs
- راقب الأداء
- استمتع بـ Deployment! 🚀
