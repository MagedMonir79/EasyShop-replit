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
      
      // بناء الاستعلام بناءً على المعايير المقدمة
      let query = db.select().from(products);
      
      // تطبيق مرشح الفئة إذا تم تحديده
      if (category && typeof category === 'string') {
        // أولاً، نحتاج إلى الحصول على معرف الفئة استنادًا إلى المعرف اللغوي (slug)
        const [categoryData] = await db
          .select()
          .from(categories)
          .where(eq(categories.slug, category));
          
        if (categoryData) {
          // ثم نقوم بتصفية المنتجات بناءً على معرف الفئة
          query = query.where(eq(products.category_id, categoryData.id));
        }
      }
      
      // تطبيق مرشح البحث إذا تم تحديده
      if (search && typeof search === 'string') {
        query = query.where(like(products.name, `%${search}%`));
      }
      
      // تنفيذ الاستعلام النهائي
      const productsData = await query.orderBy(products.created_at);
      return res.status(200).json({ products: productsData });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}