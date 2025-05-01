import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { products } from '@/shared/schema';
import { eq } from 'drizzle-orm';

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
      // الحصول على منتج واحد بناءً على المعرف
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));
        
      if (!product) {
        return res.status(404).json({ error: 'المنتج غير موجود' });
      }
      
      return res.status(200).json({ product });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in product detail API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}