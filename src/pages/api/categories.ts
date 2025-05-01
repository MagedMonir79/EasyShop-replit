import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { categories } from '@/shared/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const categoriesData = await db.select().from(categories);
      return res.status(200).json({ categories: categoriesData });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in categories API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}