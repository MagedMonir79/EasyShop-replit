import { db } from '../src/server/db';
import * as dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config();

/**
 * إصلاح قيود قاعدة البيانات للجداول الموجودة
 */
async function main() {
  try {
    console.log('بدء إصلاح قيود قاعدة البيانات...');
    
    // التحقق من وجود جدول categories
    const categoriesExists = await db.execute(/*sql*/`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'categories'
      );
    `);
    
    if (categoriesExists.rows[0].exists) {
      console.log('جدول categories موجود، التحقق من قيد الفرادة...');
      
      // التحقق من وجود قيد الفرادة على عمود slug
      const constraintExists = await db.execute(/*sql*/`
        SELECT EXISTS (
          SELECT 1 FROM pg_constraint 
          WHERE conname = 'categories_slug_unique' AND conrelid = 'public.categories'::regclass
        );
      `);
      
      if (!constraintExists.rows[0].exists) {
        console.log('إضافة قيد الفرادة على عمود slug...');
        
        // التحقق من وجود قيم مكررة قبل إضافة القيد
        const duplicates = await db.execute(/*sql*/`
          SELECT slug, COUNT(*) FROM categories GROUP BY slug HAVING COUNT(*) > 1;
        `);
        
        if (duplicates.rows.length > 0) {
          console.log('تم العثور على قيم مكررة في عمود slug، يجب إصلاحها أولاً:');
          console.log(duplicates.rows);
          
          // إصلاح القيم المكررة بإضافة رقم تسلسلي
          for (const row of duplicates.rows) {
            const slug = row.slug;
            console.log(`معالجة القيم المكررة لـ slug: ${slug}`);
            
            const duplicateRows = await db.execute(/*sql*/`
              SELECT id FROM categories WHERE slug = '${slug}' ORDER BY id;
            `);
            
            // الاحتفاظ بالصف الأول كما هو، وتحديث الباقي
            for (let i = 1; i < duplicateRows.rows.length; i++) {
              const id = duplicateRows.rows[i].id;
              const newSlug = `${slug}-${i}`;
              
              await db.execute(/*sql*/`
                UPDATE categories SET slug = '${newSlug}' WHERE id = ${id};
              `);
              
              console.log(`تم تحديث الصف ذي المعرف ${id} إلى ${newSlug}`);
            }
          }
        }
        
        // إضافة قيد الفرادة
        try {
          await db.execute(/*sql*/`
            ALTER TABLE categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
          `);
          console.log('تم إضافة قيد الفرادة بنجاح على عمود slug');
        } catch (error) {
          console.error('خطأ في إضافة قيد الفرادة:', error);
        }
      } else {
        console.log('قيد الفرادة categories_slug_unique موجود بالفعل.');
      }
    } else {
      console.log('جدول categories غير موجود، سيتم إنشاؤه لاحقًا.');
    }
    
    console.log('تم الانتهاء من إصلاح قيود قاعدة البيانات.');
  } catch (error) {
    console.error('خطأ في عملية إصلاح قيود قاعدة البيانات:', error);
  } finally {
    console.log('إغلاق الاتصال بقاعدة البيانات...');
    process.exit(0);
  }
}

main();