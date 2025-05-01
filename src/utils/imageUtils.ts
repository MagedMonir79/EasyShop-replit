/**
 * ملف أدوات مساعدة للصور والوسائط
 */

// مصفوفة من الصور البديلة المتنوعة لاستخدامها في حالة عدم توفر صور المنتجات الأصلية
export const FALLBACK_IMAGES = [
  '/images/product-placeholder-1.png',
  '/images/product-placeholder-2.png',
  '/images/product-placeholder-3.png',
  '/images/product-placeholder-4.png',
];

/**
 * الحصول على صورة افتراضية عشوائية من مجموعة الصور المتوفرة
 */
export const getRandomPlaceholderImage = (): string => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
  return FALLBACK_IMAGES[randomIndex];
};

/**
 * التحقق مما إذا كان رابط صورة المنتج صالحًا، وإرجاع صورة بديلة في حالة فشل الرابط
 */
export const getSafeProductImageUrl = (originalUrl: string | null | undefined): string => {
  if (!originalUrl) {
    return getRandomPlaceholderImage();
  }
  
  // تحقق من ما إذا كان الرابط يحتوي على بادئة URL صالحة
  if (originalUrl.startsWith('http') || originalUrl.startsWith('/')) {
    return originalUrl;
  }
  
  return getRandomPlaceholderImage();
};

/**
 * إرجاع رابط الصورة مع معالجة حالات الخطأ
 * @param imageUrl الرابط الأصلي للصورة
 * @param productId معرف المنتج (اختياري، يستخدم لتوليد رابط ثابت للمنتج نفسه)
 */
export const getProductImageUrl = (imageUrl: string | null | undefined, productId?: number): string => {
  if (!imageUrl) {
    // توليد صورة قائمة على معرف المنتج إذا كان متوفرًا، أو صورة عشوائية
    if (productId) {
      const imageIndex = productId % FALLBACK_IMAGES.length;
      return FALLBACK_IMAGES[imageIndex];
    }
    return getRandomPlaceholderImage();
  }
  
  // تعديل روابط unsplash المعروفة بأنها لا تعمل
  if (imageUrl.includes('unsplash.com')) {
    // استخدام صورة من Picsum كبديل لصور Unsplash
    const seed = productId || Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed}/800/800`;
  }

  return imageUrl;
};