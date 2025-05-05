import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { categories } from '../../shared/schema';

// وهمية مؤقتة لمنع أخطاء البناء
const categoriesData = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Clothing', slug: 'clothing' },
  { id: 3, name: 'Home', slug: 'home' }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      try {
        const dbCategories = await db.select().from(categories);
        return res.status(200).json({ categories: dbCategories.length > 0 ? dbCategories : categoriesData });
      } catch (dbError) {
        console.error('Database error:', dbError);
        return res.status(200).json({ categories: categoriesData });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in categories API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}