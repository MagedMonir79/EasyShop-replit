import { NextApiRequest, NextApiResponse } from 'next';

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
      return res.status(200).json({ categories: categoriesData });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in categories API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}