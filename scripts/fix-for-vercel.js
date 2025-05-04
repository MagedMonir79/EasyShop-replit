/**
 * سكريبت لإصلاح المشكلات الشائعة في عملية النشر على Vercel
 */

const fs = require('fs');
const path = require('path');

// إصلاح ملف drizzle.config.ts
function fixDrizzleConfig() {
  const drizzleConfigPath = path.join(__dirname, '..', 'drizzle.config.ts');
  
  try {
    let content = fs.readFileSync(drizzleConfigPath, 'utf8');
    
    // تحقق مما إذا كان الملف يستخدم connectionString
    if (content.includes('connectionString:')) {
      console.log('Fixing drizzle.config.ts - Replacing connectionString with url...');
      
      // استبدال connectionString بـ url
      content = content.replace(
        /connectionString:/g,
        'url:'
      );
      
      fs.writeFileSync(drizzleConfigPath, content, 'utf8');
      console.log('Updated drizzle.config.ts successfully.');
    } else {
      console.log('drizzle.config.ts already uses url parameter. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating drizzle.config.ts:', error.message);
  }
}

// تحديث ملف .vercelignore
function updateVercelIgnore() {
  const vercelIgnorePath = path.join(__dirname, '..', '.vercelignore');
  
  try {
    let content = '';
    
    // تحقق مما إذا كان الملف موجودًا
    if (fs.existsSync(vercelIgnorePath)) {
      content = fs.readFileSync(vercelIgnorePath, 'utf8');
    }
    
    // تحقق مما إذا كانت الصفحات المشكلة معلقة (بدلاً من حذفها)
    if (!content.includes('# These are now placeholders')) {
      console.log('Updating .vercelignore - Commenting out problematic pages...');
      
      // تحديث المحتوى لتعليق استبعاد الصفحات
      content = content.replace(/# Ignore pages with build issues/g, '# These are now placeholders, no need to ignore');
      content = content.replace(/src\/pages\/cart-basic\.tsx/g, '# src/pages/cart-basic.tsx');
      content = content.replace(/src\/pages\/cart\.tsx/g, '# src/pages/cart.tsx');
      content = content.replace(/src\/pages\/auth\/signup\.tsx/g, '# src/pages/auth/signup.tsx');
      content = content.replace(/src\/pages\/auth\/login\.tsx/g, '# src/pages/auth/login.tsx');
      content = content.replace(/src\/components\/SignupForm\.tsx/g, '# src/components/SignupForm.tsx');
      
      fs.writeFileSync(vercelIgnorePath, content, 'utf8');
      console.log('Updated .vercelignore successfully.');
    } else {
      console.log('.vercelignore already has commented placeholders. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating .vercelignore:', error.message);
  }
}

// إضافة ESLint إلى package.json
function addEslintToPackageJson() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // التحقق مما إذا كان ESLint موجودًا بالفعل
    if (!packageJson.devDependencies || !packageJson.devDependencies.eslint) {
      console.log('Updating package.json - Adding ESLint...');
      
      // إضافة eslint كتبعية تطوير
      packageJson.devDependencies = packageJson.devDependencies || {};
      packageJson.devDependencies.eslint = "^8.0.0";
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      console.log('Updated package.json successfully.');
    } else {
      console.log('ESLint already in package.json. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating package.json:', error.message);
  }
}

// إصلاح ملف vercel.json
function fixVercelJson() {
  const vercelJsonPath = path.join(__dirname, '..', 'vercel.json');
  
  try {
    if (fs.existsSync(vercelJsonPath)) {
      let vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
      
      // التحقق مما إذا كان يحتوي على تكوين functions
      if (vercelJson.functions) {
        console.log('Fixing vercel.json - Removing functions configuration...');
        
        // إزالة تكوين functions
        delete vercelJson.functions;
      }
      
      // إضافة أو تحديث قواعد التحويل للصفحات المسببة للمشاكل
      console.log('Updating vercel.json - Adding redirects for problematic pages...');
      
      vercelJson.routes = vercelJson.routes || [];
      
      // التحقق من وجود تحويلات للصفحات المشكلة
      const hasCartBasicRedirect = vercelJson.routes.some(route => route.src === '/cart-basic');
      const hasCartRedirect = vercelJson.routes.some(route => route.src === '/cart');
      const hasAuthSignupRedirect = vercelJson.routes.some(route => route.src === '/auth/signup');
      const hasAuthLoginRedirect = vercelJson.routes.some(route => route.src === '/auth/login');
      
      // إضافة التحويلات المفقودة
      if (!hasCartBasicRedirect) {
        vercelJson.routes.push({
          src: "/cart-basic",
          status: 302,
          headers: { Location: "/" }
        });
      }
      
      if (!hasCartRedirect) {
        vercelJson.routes.push({
          src: "/cart",
          status: 302,
          headers: { Location: "/" }
        });
      }
      
      if (!hasAuthSignupRedirect) {
        vercelJson.routes.push({
          src: "/auth/signup",
          status: 302,
          headers: { Location: "/" }
        });
      }
      
      if (!hasAuthLoginRedirect) {
        vercelJson.routes.push({
          src: "/auth/login",
          status: 302,
          headers: { Location: "/" }
        });
      }
      
      // إضافة القاعدة العامة في النهاية إذا لم تكن موجودة
      const hasDefaultRoute = vercelJson.routes.some(route => route.src === '/(.*)' && route.continue === true);
      
      if (!hasDefaultRoute) {
        vercelJson.routes.push({
          src: "/(.*)",
          dest: "/$1",
          continue: true
        });
      }
      
      fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelJson, null, 2), 'utf8');
      console.log('Updated vercel.json successfully.');
    } else {
      console.log('vercel.json not found. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating vercel.json:', error.message);
  }
}

// إصلاح ملف next.config.js
function fixNextConfig() {
  const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
  
  try {
    if (fs.existsSync(nextConfigPath)) {
      let configContent = fs.readFileSync(nextConfigPath, 'utf8');
      
      // تحقق مما إذا كان الملف يحتوي بالفعل على webpack إلى plugin لاستبعاد الصفحات
      if (!configContent.includes('pageExtensions:') || !configContent.includes('webpack:')) {
        console.log('Updating next.config.js - Adding webpack config for ignoring problematic pages...');
        
        // استخراج التكوين الحالي
        let currentConfig = configContent;
        
        // حذف النقطة-فاصلة الأخيرة إن وجدت
        if (currentConfig.trim().endsWith(';')) {
          currentConfig = currentConfig.trim().slice(0, -1);
        }
        
        // استخراج الكائن الداخلي من التكوين الحالي
        const moduleMatch = currentConfig.match(/module\.exports\s*=\s*({[\s\S]*})/);
        if (moduleMatch) {
          let configObj = moduleMatch[1];
          
          // إزالة القوس الأخير
          configObj = configObj.trim().slice(0, -1);
          
          // إضافة تكوين webpack
          const newConfig = `module.exports = ${configObj},
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude problematic pages from the build
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude specific pages from the build
    if (isServer) {
      if (!config.plugins) config.plugins = [];
      config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /\\/(cart-basic|cart|auth\\/signup|auth\\/login)\\.tsx?$/,
      }));
    }
    return config;
  },
};`;
          
          fs.writeFileSync(nextConfigPath, newConfig, 'utf8');
          console.log('Updated next.config.js successfully.');
        } else {
          console.log('Could not parse next.config.js format. No changes made.');
        }
      } else {
        console.log('next.config.js already has webpack config for ignoring pages. No changes needed.');
      }
    } else {
      console.log('next.config.js not found. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating next.config.js:', error.message);
  }
}

// تنفيذ الإصلاحات
console.log('Starting Vercel deployment fixes...');
fixDrizzleConfig();
updateVercelIgnore();
addEslintToPackageJson();
fixVercelJson();
fixNextConfig();
console.log('All fixes completed!');