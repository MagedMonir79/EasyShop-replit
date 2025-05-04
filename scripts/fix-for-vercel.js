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

// إنشاء أو تحديث ملف .vercelignore
function updateVercelIgnore() {
  const vercelIgnorePath = path.join(__dirname, '..', '.vercelignore');
  
  try {
    let content = '';
    
    // تحقق مما إذا كان الملف موجودًا
    if (fs.existsSync(vercelIgnorePath)) {
      content = fs.readFileSync(vercelIgnorePath, 'utf8');
    }
    
    // تحقق مما إذا كانت صفحات cart مستبعدة بالفعل
    if (!content.includes('src/pages/cart-basic.tsx') && !content.includes('src/pages/cart.tsx')) {
      console.log('Updating .vercelignore - Adding cart pages...');
      
      // إضافة صفحات cart للاستبعاد
      content += `
# Ignore pages with build issues
src/pages/cart-basic.tsx
src/pages/cart.tsx
`;
      
      fs.writeFileSync(vercelIgnorePath, content, 'utf8');
      console.log('Updated .vercelignore successfully.');
    } else {
      console.log('.vercelignore already excludes cart pages. No changes needed.');
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
        
        fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelJson, null, 2), 'utf8');
        console.log('Updated vercel.json successfully.');
      } else {
        console.log('vercel.json already doesn\'t have functions configuration. No changes needed.');
      }
    } else {
      console.log('vercel.json not found. No changes needed.');
    }
  } catch (error) {
    console.error('Error updating vercel.json:', error.message);
  }
}

// تنفيذ الإصلاحات
console.log('Starting Vercel deployment fixes...');
fixDrizzleConfig();
updateVercelIgnore();
addEslintToPackageJson();
fixVercelJson();
console.log('All fixes completed!');