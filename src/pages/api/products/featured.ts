import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      // الحصول على المنتجات المميزة باستخدام الوظيفة getProducts
      const featuredProducts = await getProducts({
        featured: true,
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