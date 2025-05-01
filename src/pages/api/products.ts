import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { category, search, limit } = req.query;
      
      // ضبط خيارات البحث
      const options: {
        category?: string;
        search?: string;
        limit?: number;
      } = {};
      
      if (category && typeof category === 'string') {
        options.category = category;
      }
      
      if (search && typeof search === 'string') {
        options.search = search;
      }
      
      if (limit && typeof limit === 'string') {
        const parsedLimit = parseInt(limit, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          options.limit = parsedLimit;
        }
      }
      
      // استخدام وظيفة getProducts للحصول على المنتجات من Supabase
      const products = await getProducts(options);
      
      return res.status(200).json({ products });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}