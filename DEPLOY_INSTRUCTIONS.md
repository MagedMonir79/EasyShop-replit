# دليل نشر مشروع EasyShop

## رفع المشروع إلى GitHub

1. قم بإنشاء مستودع GitHub جديد
2. قم بتنفيذ الأوامر التالية على جهازك المحلي:

```bash
# تهيئة Git إذا لم يكن موجودًا
git init

# إضافة الملفات للمستودع
git add .

# عمل commit للتغييرات
git commit -m "Initial commit"

# إضافة المستودع البعيد
git remote add origin https://github.com/username/easyshop-ecommerce.git

# رفع المشروع
git push -u origin main
```

## التحضير للنشر

### 1. تأكد من صحة ملفات الإعداد

- **ملف `vercel.json`**:
  تأكد من وجود ملف `vercel.json` بالمحتوى الصحيح الذي يضبط إعدادات النشر.

- **ملف `next.config.js`**:
  تأكد من ضبط الإعدادات لتجاهل أخطاء ESLint و TypeScript أثناء البناء.

- **ملف `drizzle.config.ts`**:
  تأكد من استخدام معيار `url` بدلاً من `connectionString` للاتصال بقاعدة البيانات.

### 2. إعدادات قاعدة البيانات

تم استخدام [Neon](https://neon.tech) كمزود لقاعدة بيانات PostgreSQL. لإعداد قاعدة البيانات:

1. قم بإنشاء حساب وقاعدة بيانات جديدة على Neon
2. احصل على عنوان اتصال قاعدة البيانات من لوحة التحكم
3. أضف هذا العنوان كمتغير بيئة باسم `DATABASE_URL`

للتحقق من صحة الاتصال بقاعدة البيانات، يمكنك استخدام الأمر:
```bash
npx tsx scripts/handle-db-push.ts
```

## النشر على Vercel

1. قم بالتسجيل في [Vercel](https://vercel.com)
2. اضغط على "Import Project" واختر مستودع GitHub الخاص بك
3. قم بإعداد متغيرات البيئة التالية:

   | المتغير | الوصف |
   |---------|-------|
   | `DATABASE_URL` | رابط اتصال قاعدة بيانات PostgreSQL (Neon) |
   | `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروع Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام لمشروع Supabase |
   | `NODE_ENV` | اضبطه على `production` |

4. تحت إعدادات البناء، اضبط:
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `.next`

5. اضغط على "Deploy" وانتظر حتى اكتمال عملية النشر

## إصلاح مشاكل النشر الشائعة

### مشكلة في قاعدة البيانات
إذا واجهت مشكلة في الاتصال بقاعدة البيانات، تحقق من:

1. صحة عنوان الاتصال في متغير البيئة `DATABASE_URL`
2. إذا كنت تستخدم Neon، تأكد من تفعيل خيار "Pooled connection" 
3. تأكد من أن IP الخاص بخادم Vercel مسموح به في إعدادات الأمان لقاعدة البيانات
4. قم بتشغيل `scripts/fix-db-constraints.ts` لإصلاح مشاكل القيود في قاعدة البيانات

### خطأ في تحميل الصفحات
إذا ظهرت صفحة 404 أو 500 بعد النشر:

1. تأكد من تعيين متغير `NODE_ENV` إلى `production`
2. تأكد من صحة إعداد `output` في `next.config.js` (يجب أن يكون `standalone`)
3. افحص سجلات الخطأ في لوحة تحكم Vercel
4. تحقق من وجود جميع ملفات الصفحات في مجلد `src/pages`

### خطأ في تجميع الصفحات
إذا فشلت عملية البناء بسبب "Cannot find module for page":

1. راجع هذه الإعدادات في ملف `next.config.js`:
   ```javascript
   eslint: {
     ignoreDuringBuilds: true,
   },
   typescript: {
     ignoreBuildErrors: true,
   },
   onDemandEntries: {
     maxInactiveAge: 25 * 1000,
     pagesBufferLength: 2,
   },
   output: 'standalone',
   ```

2. قم بتشغيل الأمر التالي قبل البناء:
   ```bash
   tsx scripts/pre-build.ts
   ```

## إعداد Supabase

1. قم بإنشاء مشروع جديد على [Supabase](https://supabase.com)
2. انتقل إلى "Authentication" > "Settings" وقم بتكوين إعدادات المصادقة:
   - قم بتمكين "Email Authentication"
   - أضف Google كمزود خارجي للمصادقة (اختياري)
   - أضف روابط إعادة التوجيه لمسارات الصفحات الخاصة بك:
     - `https://yourdomain.com/auth/callback`
     - `https://yourdomain.com/api/auth/callback`

3. إعداد CORS في Supabase:
   - أضف نطاق موقعك (`https://yourdomain.com`) إلى قائمة الأصول المسموح بها
   - تأكد من تفعيل خيار "Include credentials (cookies)" 

## التحقق من عمل التطبيق

بعد النشر، قم بالتحقق من:

1. تسجيل الدخول والتسجيل عبر Supabase
2. عرض المنتجات وإضافتها إلى سلة التسوق
3. عمل ميزة تبديل اللغة بين العربية والإنجليزية
4. إرسال البريد الإلكتروني الترحيبي للمستخدمين الجدد