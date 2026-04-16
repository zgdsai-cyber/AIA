# دليل التكامل مع Google AI Edge - AIA

## 🤖 تكامل الذكاء الاصطناعي

### المزايا المتاحة:

#### 1. توصيات المنتجات الذكية
```typescript
// استخدام Gemini لتحليل تفضيلات المستخدم
const recommendProducts = async (userHistory: Product[]) => {
  const prompt = `
    بناءً على تاريخ المستخدم: ${userHistory.map(p => p.name).join(', ')}
    اقترح 5 منتجات مشابهة مع شرح موجز
  `;
  
  const result = await generateContent(prompt);
  return result;
};
```

#### 2. وصف المنتجات التلقائي
```typescript
// توليد أوصاف احترافية
const generateProductDescription = async (productName: string) => {
  const prompt = `
    اكتب وصفاً احترافياً وفعالاً للمنتج: ${productName}
    (3-4 جمل فقط، عربي)
  `;
  
  return await generateContent(prompt);
};
```

#### 3. دردشة دعم العملاء
```typescript
// روبوت محادثة ذكي
const chatWithAI = async (userMessage: string) => {
  const prompt = `
    أنت مساعد دعم عملاء ودود
    المستخدم: ${userMessage}
    الرد:
  `;
  
  return await generateContent(prompt);
};
```

---

## ⚙️ الإعداد الخطوة بخطوة

### 1. الحصول على Google AI Key

```bash
# 1. اذهب إلى:
https://ai.google.dev

# 2. اضغط على "Get API Key"

# 3. اختر أو أنشئ مشروع Google Cloud

# 4. انسخ الـ API Key
```

### 2. تحديث ملف البيئة

```env
# .env.local أضف:
NEXT_PUBLIC_GOOGLE_AI_KEY=your_api_key_here
```

### 3. تثبيت حزمة Google AI

```bash
npm install @google/generative-ai
```

### 4. إنشاء خدمة AI

```typescript
// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_AI_KEY
);

export const generateContent = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash" 
  });
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const analyzeImage = async (imageBase64: string) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash" 
  });
  
  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    },
    "وصف هذا المنتج بشكل احترافي",
  ]);
  
  return result.response.text();
};
```

---

## 🎯 حالات الاستخدام الموصى بها

### 1. في الصفحة الرئيسية
```typescript
// عرض توصيات شخصية للمستخدم
const recommendations = await generateContent(`
  المستخدم يهتم بـ: ${userInterests.join(', ')}
  اقترح أفضل 3 منتجات من متجرنا
`);
```

### 2. في صفحة المنتج
```typescript
// توليد وصف احترافي
const description = await generateContent(`
  المنتج: ${product.name}
  الفئة: ${product.category}
  السعر: ${product.price}
  اكتب وصفاً جذاباً وفعالاً
`);
```

### 3. في صفحة البحث
```typescript
// تحسين نتائج البحث
const enhancedResults = await generateContent(`
  المستخدم يبحث عن: ${searchQuery}
  إليك النتائج: ${results.map(r => r.name).join(', ')}
  هل هذه النتائج مناسبة؟
`);
```

---

## 💰 التسعير والحدود

### المجاني:
- 60 طلب/دقيقة
- 1,500 طلب/يوم
- مناسب للتطوير والاختبار

### المدفوع:
- حدود أعلى
- ضمان أداء
- دعم أولويته

---

## ⚠️ أفضل الممارسات

### 1. تخزين النتائج مؤقتاً (Caching)
```typescript
// استخدم Supabase لتخزين النتائج
const getCachedOrGenerate = async (key: string, generator: () => Promise<string>) => {
  // ابحث في الـ cache أولاً
  const cached = await supabase
    .from('ai_cache')
    .select('content')
    .eq('key', key)
    .single();
  
  if (cached.data) return cached.data.content;
  
  // إذا لم توجد، وّلد جديد
  const content = await generator();
  
  // احفظ في الـ cache
  await supabase.from('ai_cache').insert([
    { key, content, created_at: new Date() }
  ]);
  
  return content;
};
```

### 2. معالجة الأخطاء
```typescript
try {
  const response = await generateContent(prompt);
  return response;
} catch (error) {
  console.error('AI Generation Error:', error);
  // استخدم نص افتراضي
  return defaultText;
}
```

### 3. الحد من طلبات API
```typescript
// استخدم debounce و throttle
import { debounce } from 'lodash';

const debouncedGenerate = debounce(async (text: string) => {
  return await generateContent(text);
}, 1000);
```

---

## 📊 مراقبة الأداء

### تتبع الاستخدام:
```typescript
// log كل طلب AI
const trackAIUsage = async (prompt: string, response: string) => {
  await supabase.from('ai_usage_logs').insert([{
    prompt: prompt.substring(0, 200),
    response_length: response.length,
    timestamp: new Date(),
    user_id: currentUser.id,
  }]);
};
```

---

## 🔒 الأمان والخصوصية

### حماية الـ API Key:
```typescript
// استخدم الـ server-side فقط للعمليات الحساسة
// في routes/api/

export default async function handler(req, res) {
  // API Key في البيئة الخادمة
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_AI_KEY // غير مرئي للعميل
  );
  
  const result = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  }).generateContent(req.body.prompt);
  
  res.json({ content: result.response.text() });
}
```

---

## 📈 المزايا المستقبلية

- [ ] تحليل الصور لوصف المنتجات
- [ ] توصيات متقدمة حسب السلوك
- [ ] دردشة عملاء كاملة
- [ ] تحليل التقييمات التلقائي
- [ ] توليد محتوى تسويقي

---

## 🆘 استكشاف الأخطاء

### المشكلة: "API Key غير صحيح"
```
الحل: تحقق من:
1. المفتاح مُنسوخ بشكل صحيح
2. المفتاح مفعّل في Google Cloud Console
3. المتغير مُحدّث في .env.local
```

### المشكلة: "تجاوز الحد الأقصى"
```
الحل:
1. استخدم التخزين المؤقت
2. قلل عدد الطلبات
3. استخدم النسخة المدفوعة
```

### المشكلة: "استجابة بطيئة"
```
الحل:
1. استخدم النموذج الأسرع (gemini-1.5-flash)
2. قصّر الـ prompts
3. استخدم التخزين المؤقت
```

---

## 📚 الموارد الإضافية

- [Google AI Documentation](https://ai.google.dev/docs)
- [Gemini API Reference](https://ai.google.dev/docs/gemini-api)
- [Best Practices](https://ai.google.dev/docs/safety_guidelines)

---

**بدء التكامل الآن!** 🚀
