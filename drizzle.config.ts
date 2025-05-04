import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

// التحقق من وجود DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required in environment variables');
}

export default {
  schema: './src/shared/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
