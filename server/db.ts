import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// تحميل متغيرات البيئة من ملف .env.local
dotenv.config({ path: './.env.local' });

// إعداد Neon Database للاتصال عبر WebSockets
neonConfig.webSocketConstructor = ws;

// التحقق من وجود متغير DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// إنشاء اتصال بقاعدة البيانات
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// إنشاء كائن Drizzle مع معلومات الاتصال والمخطط
export const db = drizzle({ client: pool, schema });
