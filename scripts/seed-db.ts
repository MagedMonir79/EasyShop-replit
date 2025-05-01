import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/shared/schema";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env.local" });
dotenv.config({ path: "./.env" });

// Sample data
const sampleCategories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets",
    image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070"
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Fashion items and apparel",
    image_url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070"
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Items for your home",
    image_url: "https://images.unsplash.com/photo-1556911220-bda9f7f7597b?q=80&w=2070"
  }
];

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with long battery life.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
    stock: 50,
    is_featured: true,
    category_slug: "electronics"
  },
  {
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this advanced smart watch.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999",
    stock: 30,
    is_featured: true,
    category_slug: "electronics"
  },
  {
    name: "Men's Cotton T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 24.99,
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080",
    stock: 100,
    is_featured: false,
    category_slug: "clothing"
  },
  {
    name: "Women's Denim Jacket",
    description: "Classic denim jacket for a stylish look.",
    price: 59.99,
    image_url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974",
    stock: 45,
    is_featured: true,
    category_slug: "clothing"
  },
  {
    name: "Blender",
    description: "Powerful blender for smoothies and food preparation.",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2070",
    stock: 25,
    is_featured: false,
    category_slug: "home-kitchen"
  },
  {
    name: "Coffee Maker",
    description: "Brew delicious coffee with this programmable coffee maker.",
    price: 89.99,
    image_url: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=2070",
    stock: 35,
    is_featured: true,
    category_slug: "home-kitchen"
  }
];

async function main() {
  console.log("Connecting to database...");
  
  try {
    // Create connection
    const connectionString = process.env.DATABASE_URL!;
    const client = postgres(connectionString, { ssl: { rejectUnauthorized: false } });
    const db = drizzle(client, { schema });
    
    console.log("Database client created successfully");
    
    // Insert categories
    console.log("Adding categories...");
    for (const category of sampleCategories) {
      // Check if category exists
      const existingCategories = await client`
        SELECT * FROM categories WHERE slug = ${category.slug}
      `;
      
      if (existingCategories.length === 0) {
        await client`
          INSERT INTO categories (name, slug, description, image_url)
          VALUES (${category.name}, ${category.slug}, ${category.description}, ${category.image_url})
        `;
        console.log(`Added category: ${category.name}`);
      } else {
        console.log(`Category ${category.name} already exists, skipping`);
      }
    }
    
    // Insert products
    console.log("Adding products...");
    for (const product of sampleProducts) {
      // Get category ID
      const categories = await client`
        SELECT id FROM categories WHERE slug = ${product.category_slug}
      `;
      
      if (categories.length === 0) {
        console.log(`Category ${product.category_slug} not found, skipping product ${product.name}`);
        continue;
      }
      
      const categoryId = categories[0].id;
      
      // Check if product exists
      const existingProducts = await client`
        SELECT * FROM products WHERE name = ${product.name}
      `;
      
      if (existingProducts.length === 0) {
        await client`
          INSERT INTO products (name, description, price, image_url, category_id, stock, is_featured)
          VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image_url}, 
                  ${categoryId}, ${product.stock}, ${product.is_featured})
        `;
        console.log(`Added product: ${product.name}`);
      } else {
        console.log(`Product ${product.name} already exists, skipping`);
      }
    }
    
    console.log("Database seeding complete");
    
    // Close connection
    await client.end();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});