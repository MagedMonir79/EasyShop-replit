import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import ws from 'ws';
import dotenv from 'dotenv';
import * as schema from '../src/shared/schema';

// تهيئة متغيرات البيئة
dotenv.config({ path: './.env.local' });

// إعداد Neon Database للاتصال عبر WebSockets
neonConfig.webSocketConstructor = ws;

// التأكد من وجود متغير DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

async function main() {
  console.log('Starting database migration...');

  // إنشاء اتصال بقاعدة البيانات
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  // تنفيذ الترحيل
  console.log('Migrating database schema...');
  await migrate(db, { migrationsFolder: './drizzle' });

  console.log('Database migration completed successfully.');
  await pool.end();
}

main().catch((e) => {
  console.error('Migration failed:');
  console.error(e);
  process.exit(1);
});