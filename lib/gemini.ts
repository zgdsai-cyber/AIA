// lib/gemini.ts - خدمة Google Generative AI

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;

if (!API_KEY) {
  console.warn('Google AI API Key not found. AI features will be disabled.');
}

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

interface AIConfig {
  model?: 'gemini-1.5-flash' | 'gemini-1.5-pro';
  temperature?: number;
  maxTokens?: number;
}

/**
 * توليد محتوى نصي باستخدام Gemini
 */
export const generateContent = async (
  prompt: string,
  config: AIConfig = {}
): Promise<string | null> => {
  if (!genAI) {
    console.warn('Google AI not configured');
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: config.model || 'gemini-1.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: config.temperature || 0.7,
        maxOutputTokens: config.maxTokens || 1000,
      },
    });

    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    return null;
  }
};

/**
 * تحليل الصور (متطلب: base64 image)
 */
export const analyzeImage = async (
  imageBase64: string,
  prompt: string,
  config: AIConfig = {}
): Promise<string | null> => {
  if (!genAI) {
    console.warn('Google AI not configured');
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: config.model || 'gemini-1.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: 'image/jpeg',
              },
            },
            { text: prompt },
          ],
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    return null;
  }
};

/**
 * توليد وصف منتج احترافي
 */
export const generateProductDescription = async (
  productName: string,
  productDetails?: {
    category?: string;
    price?: number;
    features?: string[];
  }
): Promise<string | null> => {
  let prompt = `
اكتب وصفاً احترافياً وجذاباً للمنتج:
المنتج: ${productName}
  `;

  if (productDetails?.category) {
    prompt += `\nالفئة: ${productDetails.category}`;
  }

  if (productDetails?.price) {
    prompt += `\nالسعر: ${productDetails.price}`;
  }

  if (productDetails?.features && productDetails.features.length > 0) {
    prompt += `\nالمزايا: ${productDetails.features.join(', ')}`;
  }

  prompt += `\n\nاكتب 3-4 جمل فقط بطريقة تسويقية جذابة.`;

  return await generateContent(prompt, { maxTokens: 200 });
};

/**
 * توليد توصيات منتجات
 */
export const generateProductRecommendations = async (
  userInterests: string[],
  availableProducts: Array<{ id: string; name: string; category: string }>
): Promise<string | null> => {
  const productNames = availableProducts
    .slice(0, 10)
    .map((p) => p.name)
    .join(', ');

  const prompt = `
المستخدم مهتم بـ: ${userInterests.join(', ')}

المنتجات المتاحة: ${productNames}

اختر أفضل 3-5 منتجات وشرح السبب باختصار.
  `;

  return await generateContent(prompt, { maxTokens: 300 });
};

/**
 * توليد محتوى تسويقي
 */
export const generateMarketingContent = async (
  productName: string,
  platform: 'social' | 'email' | 'banner' = 'social'
): Promise<string | null> => {
  let prompt = `
قم بكتابة محتوى تسويقي جذاب للمنتج: ${productName}
المنصة: ${
    platform === 'social'
      ? 'وسائل التواصل (Twitter/Instagram)'
      : platform === 'email'
        ? 'email تسويقي'
        : 'banner إعلاني'
  }

المتطلبات:
- قصير وجذاب
- يحفز الشراء
- باللغة العربية
  `;

  if (platform === 'social') {
    prompt += '\n- أقل من 280 حرف';
    prompt += '\n- أضف emoji مناسب';
  } else if (platform === 'email') {
    prompt += '\n- subject line جذاب';
    prompt += '\n- 1-2 جملة فقط';
  }

  return await generateContent(prompt, { maxTokens: 150 });
};

/**
 * تحليل المشاعر والتقييمات
 */
export const analyzeReview = async (
  reviewText: string
): Promise<{ sentiment: string; summary: string } | null> => {
  const prompt = `
حلّل هذا التقييم:
"${reviewText}"

أجب بصيغة JSON:
{
  "sentiment": "positive|neutral|negative",
  "summary": "ملخص عربي مختصر (جملة واحدة فقط)"
}
  `;

  const response = await generateContent(prompt);

  if (!response) return null;

  try {
    // حاول استخراج JSON من الاستجابة
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error parsing AI response:', error);
  }

  return null;
};

/**
 * دعم العملاء الذكي
 */
export const generateCustomerSupport = async (
  question: string,
  context?: {
    orderId?: string;
    productName?: string;
    previousIssues?: string[];
  }
): Promise<string | null> => {
  let prompt = `
أنت مساعد دعم عملاء ودود واحترافي لمتجر إلكتروني.

سؤال العميل: ${question}
  `;

  if (context?.orderId) {
    prompt += `\nرقم الطلب: ${context.orderId}`;
  }

  if (context?.productName) {
    prompt += `\nاسم المنتج: ${context.productName}`;
  }

  if (context?.previousIssues && context.previousIssues.length > 0) {
    prompt += `\nالمشاكل السابقة: ${context.previousIssues.join(', ')}`;
  }

  prompt += `\n\nقدم ردّاً مفيداً وودياً بالعربية (2-3 جمل).`;

  return await generateContent(prompt, { maxTokens: 200 });
};

/**
 * التحقق من توفر API
 */
export const isAIAvailable = (): boolean => {
  return API_KEY !== undefined && API_KEY !== '';
};

export default {
  generateContent,
  analyzeImage,
  generateProductDescription,
  generateProductRecommendations,
  generateMarketingContent,
  analyzeReview,
  generateCustomerSupport,
  isAIAvailable,
};
