import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { products } from '@/shared/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const productsData = await db.select().from(products);
      return res.status(200).json({ products: productsData });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}