import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category, search, limit } = req.query;
    
    const categorySlug = typeof category === 'string' ? category : undefined;
    const searchTerm = typeof search === 'string' ? search : undefined;
    const limitNumber = typeof limit === 'string' ? parseInt(limit) : undefined;
    
    const products = await storage.getProducts(categorySlug, searchTerm, limitNumber);
    
    res.status(200).json(products);
  } catch (error) {
    console.error('API Error in products endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}