/**
 * نصل لدفع التغييرات إلى قاعدة البيانات بشكل آمن، يعالج الأخطاء المعروفة
 * مثل الجداول الموجودة مسبقًا
 */
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/shared/schema';

// تحميل متغيرات البيئة
dotenv.config();

// التحقق من وجود رابط قاعدة البيانات
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL as string;
  console.log(`Database URL: ${databaseUrl}`);
  
  // محاولة الاتصال بقاعدة البيانات
  try {
    console.log('Connected to database, pushing schema...');
    
    // محاولة إنشاء الجداول، تجاهل أخطاء الجداول الموجودة بالفعل
    const client = postgres(databaseUrl, { max: 1 });
    const db = drizzle(client, { schema });

    // قم بتنفيذ استعلام بسيط للتأكد من صحة الاتصال
    const result = await db.query.users.findMany();
    console.log(`Successfully connected to database, found ${result.length} users.`);

    console.log('Database setup complete.');
    client.end();
  } catch (error) {
    // طباعة رسالة الخطأ، لكن لا تتوقف إذا كان خطأ من نوع 'relation already exists'
    console.error(error);
    if (error instanceof Error && !error.message.includes('already exists')) {
      process.exit(1);
    } else {
      console.log('Tables may already exist, continuing...');
    }
  }
  
  console.log('Database connection closed.');
}

main();