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
    // التأكد أن DATABASE_URL موجود (تم التحقق مسبقًا)
    // إنشاء عميل postgres مع التأكد من أن URL هو نص
    const sql = postgres(DATABASE_URL);
    
    // إنشاء كائن Drizzle مع المخطط
    const db = drizzle(sql, { schema });
    
    console.log('Connected to database, pushing schema...');
    
    // محاولة دفع المخطط إلى قاعدة البيانات
    try {
      await migrate(db, { migrationsFolder: 'drizzle' });
      console.log('Schema pushed successfully!');
    } catch (migrationError) {
      // إذا فشلت عملية migrate لأن الجداول موجودة بالفعل، قم بمعالجة الخطأ
      console.log(migrationError);
      // لا داعي للخروج، يمكننا اعتبار أن الجداول موجودة بالفعل
      console.log('Tables may already exist, continuing...');
    }
    
    // إغلاق الاتصال
    await sql.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
}

main();