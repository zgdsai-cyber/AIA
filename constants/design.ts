// Color Palettes - لوحات ألوان احترافية
export const colorPalettes = {
  luxury: {
    name: 'فاخرة',
    primary: '#1a1a1a',
    secondary: '#d4af37',
    accent: '#f5f5f5',
    success: '#27ae60',
    danger: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db',
    light: '#ecf0f1',
  },
  modern: {
    name: 'عصرية',
    primary: '#2c3e50',
    secondary: '#3498db',
    accent: '#ecf0f1',
    success: '#1abc9c',
    danger: '#e74c3c',
    warning: '#f39c12',
    info: '#9b59b6',
    light: '#f8f9fa',
  },
  tech: {
    name: 'تقنية',
    primary: '#0f1419',
    secondary: '#00d4ff',
    accent: '#f0f0f0',
    success: '#00cc96',
    danger: '#ff6b6b',
    warning: '#ffd93d',
    info: '#6366f1',
    light: '#f9fafb',
  },
  elegant: {
    name: 'أنيقة',
    primary: '#2d2d2d',
    secondary: '#8b7355',
    accent: '#faf9f7',
    success: '#5eb44e',
    danger: '#d63031',
    warning: '#fdcb6e',
    info: '#74b9ff',
    light: '#ffeaa7',
  },
  simple: {
    name: 'بسيطة',
    primary: '#1a1a1a',
    secondary: '#6c63ff',
    accent: '#ffffff',
    success: '#2ed573',
    danger: '#ff6348',
    warning: '#ffa502',
    info: '#54a0ff',
    light: '#f0f2f5',
  },
  youthful: {
    name: 'شبابية',
    primary: '#ff6b9d',
    secondary: '#feca57',
    accent: '#ffffff',
    success: '#48dbfb',
    danger: '#ff9ff3',
    warning: '#ffa502',
    info: '#1dd1a1',
    light: '#f8f9fa',
  },
};

// Typography - الخطوط
export const typography = {
  fonts: {
    heading: '"Almonde", "Poppins", sans-serif',
    body: '"Poppins", "Arial", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Store Types
export const storeTypes = [
  { value: 'fashion', label: 'ملابس' },
  { value: 'perfume', label: 'عطور' },
  { value: 'electronics', label: 'إلكترونيات' },
  { value: 'digital', label: 'منتجات رقمية' },
  { value: 'furniture', label: 'أثاث' },
  { value: 'multistore', label: 'متجر متعدد الأقسام' },
  { value: 'beauty', label: 'الجمال والعناية' },
  { value: 'food', label: 'الغذائية' },
];

// Target Audience
export const targetAudience = [
  { value: 'men', label: 'رجال' },
  { value: 'women', label: 'نساء' },
  { value: 'families', label: 'عائلات' },
  { value: 'youth', label: 'شباب' },
  { value: 'businesses', label: 'شركات' },
  { value: 'general', label: 'جمهور عام' },
];

// Target Regions
export const targetRegions = [
  { value: 'saudi', label: 'السعودية', currency: 'SAR', flag: '🇸🇦' },
  { value: 'gulf', label: 'دول الخليج', currency: 'AED', flag: '🏴' },
  { value: 'arabic', label: 'الوطن العربي', currency: 'USD', flag: '🏴' },
  { value: 'global', label: 'عالمي', currency: 'USD', flag: '🌍' },
];

// Design Styles
export const designStyles = [
  { value: 'luxury', label: 'فاخر جداً' },
  { value: 'clean', label: 'نظيف وواضح' },
  { value: 'modern', label: 'حديث احترافي' },
  { value: 'minimalist', label: 'بسيط وأنيق' },
  { value: 'bold', label: 'جريء وحيوي' },
];

// Payment Methods
export const paymentMethods = [
  { value: 'creditcard', label: 'بطاقة ائتمان', icon: '💳' },
  { value: 'applepay', label: 'Apple Pay', icon: '🍎' },
  { value: 'googleplay', label: 'Google Pay', icon: '🔵' },
  { value: 'paypal', label: 'PayPal', icon: '🅿️' },
  { value: 'bank', label: 'تحويل بنكي', icon: '🏦' },
  { value: 'cod', label: 'الدفع عند الاستقبال', icon: '📦' },
];

// Shipping Methods
export const shippingMethods = [
  { value: 'standard', label: 'شحن قياسي (3-7 أيام)', icon: '📦' },
  { value: 'express', label: 'شحن سريع (1-2 يوم)', icon: '⚡' },
  { value: 'same', label: 'توصيل يوم واحد', icon: '🚀' },
  { value: 'pickup', label: 'الاستلام من الفرع', icon: '🏪' },
];

// Main Categories
export const mainCategories = [
  { id: 1, name: 'الأكثر مبيعاً' },
  { id: 2, name: 'المنتجات الجديدة' },
  { id: 3, name: 'العروض والخصومات' },
  { id: 4, name: 'المنتجات الموصى بها' },
];
