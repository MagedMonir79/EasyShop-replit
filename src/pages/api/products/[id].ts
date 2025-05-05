import { NextApiRequest, NextApiResponse } from 'next';
import { getProductById } from '../../../utils/supabaseClient';
import { db } from '../../../server/db';
import { products as productsTable } from '../../../shared/schema';
import { eq } from 'drizzle-orm';

// Sample product data as fallback
const MOCK_PRODUCTS = [
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
    id: 5,
    name: "طاولة قهوة خشبية",
    description: "طاولة قهوة أنيقة مصنوعة من الخشب الطبيعي بتصميم عصري",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500",
    category_id: 2,
    category: "أثاث",
    stock: 12,
    is_featured: false,
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
    // الحصول على معرف المنتج من المسار
    const { id } = req.query;
    const productId = parseInt(id as string, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ error: 'معرف المنتج غير صالح' });
    }

    if (req.method === 'GET') {
      try {
        console.log(`Fetching product details for ID: ${productId}`);

        // Try to get the product from the database first
        try {
          const [product] = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, productId))
            .limit(1);

          if (product) {
            return res.status(200).json({ product });
          }
        } catch (dbError) {
          console.error("Database error:", dbError);
        }

        // If database query fails, try Supabase
        try {
          const supabaseProduct = await getProductById(productId);
          if (supabaseProduct) {
            return res.status(200).json({ product: supabaseProduct });
          }
        } catch (supabaseError) {
          console.error("Supabase error:", supabaseError);
        }

        // Fallback to mock data if both database and Supabase fail
        const mockProduct = MOCK_PRODUCTS.find(p => p.id === productId);

        if (mockProduct) {
          return res.status(200).json({ product: mockProduct });
        } else {
          return res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.log("General error in product endpoint:", error);
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in product detail API:', error);

    // في حالة حدوث أي خطأ، نحاول الوصول إلى المنتج من البيانات المحلية
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(req.query.id as string, 10));

    if (mockProduct) {
      return res.status(200).json({ product: mockProduct });
    } else {
      return res.status(500).json({ error: 'خطأ في الخادم وتعذر الوصول إلى المنتج' });
    }
  }
}