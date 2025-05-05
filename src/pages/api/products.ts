import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../utils/supabaseClient';
import { db } from '../../server/db';
import { products as productsTable } from '../../shared/schema';
import { ilike, eq, and, or } from 'drizzle-orm';

// Sample product data for API as fallback in case of connection errors
const MOCK_PRODUCTS = [
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
    id: 5,
    name: "طاولة قهوة خشبية",
    description: "طاولة قهوة أنيقة مصنوعة من الخشب الطبيعي بتصميم عصري",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500",
    category_id: 2,
    category: "أثاث",
    stock: 12,
    is_featured: false,
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

      try {
        console.log("Fetching products...");

        // Try to get products from the database first
        try {
          let query = db.select().from(productsTable);

          // Add where clauses based on options
          const whereConditions = [];

          if (options.category) {
            // This assumes you're joining with categories or have a category field
            // Adjust as needed based on your schema
            whereConditions.push(eq(productsTable.category_id, parseInt(options.category, 10)));
          }

          if (options.search) {
            whereConditions.push(
              or(
                ilike(productsTable.name, `%${options.search}%`),
                ilike(productsTable.description, `%${options.search}%`)
              )
            );
          }

          if (whereConditions.length > 0) {
            query = query.where(and(...whereConditions));
          }

          // Apply limit if specified
          if (options.limit) {
            query = query.limit(options.limit);
          }

          const dbProducts = await query;

          if (dbProducts && dbProducts.length > 0) {
            return res.status(200).json({ products: dbProducts });
          }
        } catch (dbError) {
          console.error("Database error:", dbError);
        }

        // If database query fails or returns empty results, try Supabase
        try {
          const supabaseProducts = await getProducts(options);
          if (supabaseProducts && supabaseProducts.length > 0) {
            return res.status(200).json({ products: supabaseProducts });
          }
        } catch (supabaseError) {
          console.error("Supabase error:", supabaseError);
        }

        // Fallback to mock data if both database and Supabase fail
        // Apply filtering manually
        let filteredProducts = [...MOCK_PRODUCTS];

        if (options.category) {
          filteredProducts = filteredProducts.filter(p => p.category === options.category);
        }

        if (options.search) {
          const searchTerm = options.search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            (p.description && p.description.toLowerCase().includes(searchTerm))
          );
        }

        // Apply limit
        if (options.limit && options.limit > 0) {
          filteredProducts = filteredProducts.slice(0, options.limit);
        }

        return res.status(200).json({ products: filteredProducts });
      } catch (error) {
        console.log("Error in products API:", error);
        return res.status(200).json({ products: MOCK_PRODUCTS });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products API:', error);
    // في حالة حدوث أي خطأ، نعيد البيانات المحلية
    return res.status(200).json({ products: MOCK_PRODUCTS });
  }
}