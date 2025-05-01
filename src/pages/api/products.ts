import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { products, categories } from '@/shared/schema';
import { eq, like, and } from 'drizzle-orm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { category, search } = req.query;
      
      // أولاً، نحصل على معرف الفئة إذا تم تحديد فئة
      let categoryId: number | undefined;
      
      if (category && typeof category === 'string') {
        const [categoryData] = await db
          .select()
          .from(categories)
          .where(eq(categories.slug, category));
          
        if (categoryData) {
          categoryId = categoryData.id;
        }
      }
      
      // بناء شروط البحث
      const whereConditions = [];
      
      if (categoryId) {
        whereConditions.push(eq(products.category_id, categoryId));
      }
      
      if (search && typeof search === 'string') {
        whereConditions.push(like(products.name, `%${search}%`));
      }
      
      // استخدام db.query.products.findMany للحصول على المنتجات مع معلومات الفئة
      const productsData = await db.query.products.findMany({
        where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
        with: {
          category: true
        },
        orderBy: products.created_at
      });
      return res.status(200).json({ products: productsData });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}