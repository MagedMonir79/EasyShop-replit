import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/shared/schema";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./.env.local" });
dotenv.config({ path: "./.env" });

// Check database connection string
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not defined");
  process.exit(1);
}

console.log("DATABASE_URL found, connecting to database...");

async function main() {
  console.log("Creating database client...");
  
  try {
    // Create connection
    const connectionString = process.env.DATABASE_URL!;
    console.log("Connection string available:", connectionString ? "Yes" : "No");
    
    const client = postgres(connectionString, { ssl: { rejectUnauthorized: false } });
    const db = drizzle(client, { schema });
    
    console.log("Database client created successfully.");
    
    // Create simple test query to verify connection
    console.log("Testing database connection...");
    const result = await client`SELECT current_database(), current_user`;
    console.log("Connected to database:", result[0].current_database);
    console.log("Connected as user:", result[0].current_user);
    
    // Try to access tables and create them if they don't exist
    try {
      console.log("Checking for users table...");
      const usersCheckResult = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'users'
        ) as exists
      `;
      
      if (usersCheckResult[0].exists) {
        console.log("Users table exists.");
      } else {
        console.log("Users table does not exist. Creating tables...");
        
        // Create users table
        await client`
          CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            avatar_url TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          )
        `;
        console.log("Users table created.");
        
        // Create categories table
        await client`
          CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          )
        `;
        console.log("Categories table created.");
        
        // Create products table
        await client`
          CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image_url TEXT,
            category_id INTEGER REFERENCES categories(id),
            stock INTEGER DEFAULT 0,
            is_featured BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          )
        `;
        console.log("Products table created.");
        
        // Create orders table
        await client`
          CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id TEXT REFERENCES users(id),
            status VARCHAR(50) NOT NULL,
            total DECIMAL(10, 2) NOT NULL,
            address TEXT,
            phone VARCHAR(50),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          )
        `;
        console.log("Orders table created.");
        
        // Create order_items table
        await client`
          CREATE TABLE IF NOT EXISTS order_items (
            id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES orders(id),
            product_id INTEGER REFERENCES products(id),
            quantity INTEGER NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          )
        `;
        console.log("Order_items table created.");
      }
    } catch (error) {
      console.error("Error creating tables:", error);
      throw error;
    }
    
    console.log("Database schema setup complete.");
    
    // Close connection
    await client.end();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});