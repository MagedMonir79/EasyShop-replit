/**
 * إعداد ما قبل البناء - هذا السكريبت يساعد في إعداد البيئة قبل عملية البناء
 */
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

console.log('بدء عملية إعداد ما قبل البناء...');

// تنفيذ سكريبت إصلاح مشكلات Vercel
console.log('تنفيذ سكريبت إصلاح مشكلات Vercel...');
try {
  exec('node scripts/fix-for-vercel.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`خطأ في تنفيذ سكريبت الإصلاح: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`نتائج سكريبت الإصلاح: ${stdout}`);
  });
} catch (error) {
  console.error('فشل في تنفيذ سكريبت إصلاح مشكلات Vercel:', error);
}

// التأكد من وجود مجلد .next
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('إنشاء مجلد .next...');
  fs.mkdirSync(nextDir, { recursive: true });
}

// التأكد من وجود مجلد .next/server
const serverDir = path.join(nextDir, 'server');
if (!fs.existsSync(serverDir)) {
  console.log('إنشاء مجلد .next/server...');
  fs.mkdirSync(serverDir, { recursive: true });
}

// إنشاء ملف pages-manifest.json فارغ إذا لم يكن موجودًا
const pagesManifestPath = path.join(serverDir, 'pages-manifest.json');
if (!fs.existsSync(pagesManifestPath)) {
  console.log('إنشاء ملف pages-manifest.json فارغ...');
  fs.writeFileSync(pagesManifestPath, '{}', 'utf8');
}

// إنشاء ملف middleware-manifest.json إذا لم يكن موجودًا
const middlewareManifestPath = path.join(serverDir, 'middleware-manifest.json');
if (!fs.existsSync(middlewareManifestPath)) {
  console.log('إنشاء ملف middleware-manifest.json...');
  fs.writeFileSync(middlewareManifestPath, '{"middleware":{},"functions":{}}', 'utf8');
}

// التأكد من وجود الملفات الضرورية الأخرى
console.log('إنشاء هيكل البيانات المطلوب لعملية البناء...');

// إنشاء مجلد بناء وهمي للمساعدة في عملية البناء
const buildDir = path.join(process.cwd(), '.next', 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

console.log('تم الانتهاء من إعداد ما قبل البناء بنجاح!');