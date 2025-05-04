import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../src/server/db';
import * as dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config();

/**
 * تنفيذ عملية تحديث قاعدة البيانات مع معالجة الأخطاء المتوقعة
 */
async function main() {
  try {
    console.log('بدء تحديث قاعدة البيانات...');
    
    // محاولة إضافة القيود والأعمدة دون حذف البيانات
    try {
      // إنشاء المخطط إذا لم يكن موجودًا
      await db.execute(/*sql*/`
        CREATE SCHEMA IF NOT EXISTS drizzle;
      `);
      
      // محاولة إضافة القيود على الجداول الموجودة
      console.log('محاولة تحديث هيكل الجداول...');
      
      // التحقق من وجود جدول categories
      const tableExists = await db.execute(/*sql*/`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'categories'
        );
      `);
      
      if (tableExists.rows[0].exists) {
        console.log('جدول categories موجود بالفعل، التحقق من وجود قيد الفرادة...');
        
        // التحقق من وجود قيد الفرادة
        const constraintExists = await db.execute(/*sql*/`
          SELECT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'categories_slug_unique' AND conrelid = 'public.categories'::regclass
          );
        `);
        
        if (!constraintExists.rows[0].exists) {
          console.log('إضافة قيد الفرادة إلى عمود slug...');
          // التحقق من عدم وجود قيم مكررة قبل إضافة القيد
          const duplicates = await db.execute(/*sql*/`
            SELECT slug, COUNT(*) FROM categories GROUP BY slug HAVING COUNT(*) > 1;
          `);
          
          if (duplicates.rows.length > 0) {
            console.log('تم العثور على قيم مكررة! يجب معالجتها قبل إضافة القيد:');
            console.log(duplicates.rows);
          } else {
            try {
              // إضافة قيد الفرادة
              await db.execute(/*sql*/`
                ALTER TABLE categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
              `);
              console.log('تم إضافة قيد الفرادة بنجاح');
            } catch (error) {
              console.error('خطأ في إضافة قيد الفرادة:', error);
            }
          }
        } else {
          console.log('قيد الفرادة موجود بالفعل');
        }
      } else {
        console.log('جدول categories غير موجود، سيتم إنشاؤه عن طريق Drizzle');
      }
      
      console.log('تم الانتهاء من التحديثات اليدوية');
    } catch (error) {
      console.error('خطأ أثناء محاولة تحديث هيكل قاعدة البيانات:', error);
    }
    
    console.log('تم الانتهاء من عملية التحديث');
  } catch (error) {
    console.error('خطأ أثناء تحديث قاعدة البيانات:', error);
    process.exit(1);
  } finally {
    console.log('إغلاق اتصال قاعدة البيانات...');
    process.exit(0);
  }
}

main();