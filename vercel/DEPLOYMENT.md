# دليل نشر على Vercel

## 1. متطلبات مسبقة

- ✅ حساب GitHub
- ✅ حساب Vercel
- ✅ المشروع مدفوع إلى GitHub

## 2. إعداد مستودع GitHub

### أ. إنشاء Repo جديد

```bash
# في صفحة GitHub الرئيسية، انقر على "New"
# أو اذهب إلى: https://github.com/new

الإعدادات:
- Repository name: AIA
- Description: E-commerce Store Design Platform
- Visibility: Public
- Add .gitignore: No (لدينا بالفعل واحد)
```

### ب. دفع المشروع

```bash
cd /workspaces/AIA

# إضافة Remote (استبدل USERNAME برقم حسابك)
git remote add origin https://github.com/USERNAME/AIA.git

# أول commit
git add .
git commit -m "Initial commit: AIA e-commerce designer v0.1.0"

# Rename branch to main (إذا لم تكن بالفعل main)
git branch -M main

# Push إلى GitHub
git push -u origin main
```

## 3. ربط Vercel

### الطريقة 1: عبر Vercel Dashboard (الموصى به)

```
1. اذهب إلى https://vercel.com
2. انقر "New Project"
3. اختر "Import Git Repository"
4. ابحث عن "AIA"
5. اختر الـ Repository
6. انقر "Import"
```

### الطريقة 2: عبر CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# Deploy المشروع
vercel

# اتبع الخطوات:
# - Project name: AIA
# - Framework: Next.js ✓
# - Root directory: ./ ✓
```

## 4. إعداد متغيرات البيئة على Vercel

### في Dashboard Vercel:
1. اذهب إلى Project Settings
2. اختر "Environment Variables"
3. أضف المتغيرات:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### عبر CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 5. الـ Build والنشر

### أول نشر تلقائي:
```bash
# عودة إلى GitHub (Push)
git add .
git commit -m "Add deployment config"
git push

# Vercel سيستشعر التغيير بتلقاء نفسه
# وسيبدأ Build و Deploy تلقائياً
```

### عرض التقدم:
1. اذهب إلى Vercel Dashboard
2. اختر Project "AIA"
3. شاهد عمليات Build والـ Deployments

## 6. Domain المخصص (اختياري)

### ربط Domain:
```
1. في Vercel → Project Settings → Domains
2. أضف اسم النطاق
3. تحديث DNS settings عند مسجل النطاق
4. انتظر التحقق (عادة 24-48 ساعة)
```

## 7. المراقبة والتنبيهات

### تفعيل:
```
Vercel → Project Settings → Monitoring

خيارات:
- Core Web Vitals ✓
- Error Tracking ✓
- Performance alerts ✓
```

## 8. الإعدادات الموصى بها

### vercel.json:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_key"
  },
  "regions": ["iad1"],
  "functions": {
    "api/**": {
      "maxDuration": 60
    }
  }
}
```

## 9. إعادة النشر التلقائية

### عند كل Commit:
1. يتم فحص الكود
2. إذا لم توجد أخطاء، يبدأ Build
3. بعد النجاح، يتم النشر تلقائياً
4. يتم إرسال URL للمشروع الجديد

## 10. استكشاف الأخطاء

### Build يفشل:
```
1. تحقق من السجلات (Logs) في Dashboard
2. تأكد من متغيرات البيئة
3. تحقق من package.json
```

### خطأ في وقت التشغيل:
```
1. كتشف الأخطاء (Error Tracking)
2. عدّل الكود
3. Push إلى GitHub
4. Vercel سينشر نسخة جديدة
```

### البطء:
```
1. فعّل Image Optimization
2. استخدم CDN
3. حسّن الأداء
```

## 11. أوامر مفيدة

```bash
# عرض حالة Deploy الحالية
vercel ls

# عرض معلومات المشروع
vercel projects list

# فتح Dashboard
vercel dashboard

# عرض السجلات
vercel logs

# إعادة نشر آخر نسخة
vercel redeploy
```

## 12. الخطوات التالية

- ⏳ اختبر التطبيق على Production
- ⏳ اسأل المستخدمين عن آرائهم
- ⏳ راقب الأخطاء والأداء
- ⏳ أضف مزايا جديدة
- ⏳ حسّن الأداء

---

**URL المشروع النهائي:**
```
https://aia.vercel.app
(أو domain مخصص)
```

**ملاحظة:** احفظ بيانات Vercel والـ Supabase في مكان آمن!
