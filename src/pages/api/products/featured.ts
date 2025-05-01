import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { products } from '@/shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      // الحصول على المنتجات المميزة مع معلومات الفئة
      const featuredProducts = await db.query.products.findMany({
        where: eq(products.is_featured, true),
        with: {
          category: true
        },
        limit: 6
      });
        
      return res.status(200).json({ products: featuredProducts });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in featured products API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}