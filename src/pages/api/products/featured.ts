import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/utils/supabaseClient';
import { db } from '../../../../server/db';
import { products, categories } from '@/shared/schema';
import { eq, and } from 'drizzle-orm';

// Sample data for featured products
const MOCK_FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "هاتف ذكي متطور",
    description: "هاتف ذكي بأحدث المواصفات التقنية وكاميرا متطورة",
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 15,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "حاسوب محمول للمحترفين",
    description: "حاسوب محمول بمعالج قوي ومساحة تخزين كبيرة مناسب للأعمال والألعاب",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 8,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "سماعات رأس لاسلكية",
    description: "سماعات رأس لاسلكية مع خاصية إلغاء الضوضاء وجودة صوت عالية",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 20,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    description: "كاميرا رقمية احترافية لالتقاط أفضل الصور واللحظات",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 5,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "ساعة ذكية متطورة",
    description: "ساعة ذكية متعددة الاستخدامات لتتبع اللياقة البدنية والإشعارات",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 18,
    is_featured: true,
    created_at: new Date().toISOString()
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      try {
        console.log("Fetching featured products from database...");
        
        // First try to get products from our Drizzle DB connection
        try {
          // Get featured products directly using SQL
          const dbProducts = await db.select()
            .from(products)
            .where(eq(products.is_featured, true))
            .limit(6);
          
          // Get category information for the products
          const productIds = dbProducts.map(product => product.id);
          const categoryIds = dbProducts.map(product => product.category_id).filter(Boolean);
          
          // Get categories for these products
          const categoryData = categoryIds.length > 0 
            ? await db.select().from(categories).where(eq(categories.id, categoryIds[0]))
            : [];
            
          // Create a map of category id to name
          const categoryMap = new Map();
          categoryData.forEach(cat => {
            categoryMap.set(cat.id, cat.name);
          });
            
          // Format products to match expected structure
          const formattedProducts = dbProducts.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price.toString()),
            image_url: product.image_url,
            category_id: product.category_id,
            category: product.category_id && categoryMap.get(product.category_id) 
              ? categoryMap.get(product.category_id) 
              : "Uncategorized",
            stock: product.stock,
            is_featured: product.is_featured,
            created_at: product.created_at
          }));
          
          console.log(`Found ${formattedProducts.length} featured products in database`);
          
          if (formattedProducts.length > 0) {
            return res.status(200).json({ products: formattedProducts });
          }
          
          // If no products were found, fallback to Supabase
          throw new Error("No featured products found in database");
        } catch (dbError) {
          console.log("Database error, trying Supabase:", dbError);
          
          // Fallback to Supabase client
          const featuredProducts = await getProducts({
            featured: true,
            limit: 6
          });
          
          if (featuredProducts && featuredProducts.length > 0) {
            return res.status(200).json({ products: featuredProducts });
          }
          
          throw new Error("No products found via Supabase either");
        }
      } catch (error) {
        console.log("Using mock products as fallback:", error);
        // Use mock data as a last resort
        return res.status(200).json({ products: MOCK_FEATURED_PRODUCTS });
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in featured products API:', error);
    // في حالة حدوث أي خطأ، نعيد البيانات المحلية
    return res.status(200).json({ products: MOCK_FEATURED_PRODUCTS });
  }
}