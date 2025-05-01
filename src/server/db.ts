import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@/shared/schema";

// Configuration for Neon Serverless - required for WebSocket connections
neonConfig.webSocketConstructor = ws;

// Check for DATABASE_URL environment variable
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Did you forget to provision a database?",
  );
}

// Create a connection pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create drizzle instance with our schema
export const db = drizzle(pool, { schema });