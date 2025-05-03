import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '../src/shared/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function main() {
  console.log('Database URL:', DATABASE_URL);
  
  try {
    // Create postgres client
    const client = postgres(DATABASE_URL);
    const db = drizzle(client, { schema });
    
    console.log('Connected to database, pushing schema...');
    
    // Push the schema
    await migrate(db, { migrationsFolder: 'drizzle' });
    
    console.log('Schema pushed successfully!');
    
    // Close the connection
    await client.end();
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
}

main();