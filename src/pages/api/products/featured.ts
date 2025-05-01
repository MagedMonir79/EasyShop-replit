import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/utils/supabaseClient';

// بيانات تجريبية للمنتجات المميزة
const MOCK_FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "هاتف ذكي متطور",
    description: "هاتف ذكي بأحدث المواصفات التقنية وكاميرا متطورة",
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 15,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "حاسوب محمول للمحترفين",
    description: "حاسوب محمول بمعالج قوي ومساحة تخزين كبيرة مناسب للأعمال والألعاب",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 8,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "سماعات رأس لاسلكية",
    description: "سماعات رأس لاسلكية مع خاصية إلغاء الضوضاء وجودة صوت عالية",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 20,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    description: "كاميرا رقمية احترافية لالتقاط أفضل الصور واللحظات",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 5,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "ساعة ذكية متطورة",
    description: "ساعة ذكية متعددة الاستخدامات لتتبع اللياقة البدنية والإشعارات",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 18,
    is_featured: true,
    created_at: new Date().toISOString()
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      try {
        // محاولة الحصول على المنتجات المميزة باستخدام الوظيفة getProducts
        const featuredProducts = await getProducts({
          featured: true,
          limit: 6
        });
        return res.status(200).json({ products: featuredProducts });
      } catch (error) {
        console.log("استخدام البيانات المحلية للمنتجات المميزة:", error);
        // في حالة فشل الاتصال، استخدم البيانات المحلية
        return res.status(200).json({ products: MOCK_FEATURED_PRODUCTS });
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in featured products API:', error);
    // في حالة حدوث أي خطأ، نعيد البيانات المحلية
    return res.status(200).json({ products: MOCK_FEATURED_PRODUCTS });
  }
}