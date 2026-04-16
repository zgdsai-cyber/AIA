# GitHub Secrets Setup

الخطوات المطلوبة لإعداد GitHub Actions:

## 1. الذهاب إلى Settings

```
https://github.com/YOUR_USERNAME/AIA/settings/secrets/actions
```

## 2. إضافة Secrets الآتية:

### VERCEL_TOKEN
```
الحصول على:
1. اذهب إلى: https://vercel.com/account/tokens
2. اضغط: Create
3. انسخ الـ Token
```

### VERCEL_ORG_ID
```
الحصول على:
1. اذهب إلى: https://vercel.com/dashboard/settings/team
2. ابحث عن: Team ID
```

### VERCEL_PROJECT_ID
```
الحصول على:
1. اذهب إلى: https://vercel.com/dashboard/AIA
2. Settings → General
3. ابحث عن: Project ID
```

## 3. الاستخدام

بعد إضافة الـ Secrets:
- أي push إلى `main` سيبدأ الـ workflow
- سيتم البناء والاختبار تلقائياً
- النشر إلى Vercel يحدث تلقائياً

## 4. مراقبة

- شاهد الـ Actions: https://github.com/YOUR_USERNAME/AIA/actions
- شاهد النتائج في الـ Pull Request
