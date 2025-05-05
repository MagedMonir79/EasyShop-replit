/**
 * This script ensures that all the required files are present before the build process
 * to prevent build failures on Vercel.
 */

const fs = require('fs');
const path = require('path');

console.log('Running pre-Vercel build script...');

// List of files to ensure exist
const filesToEnsure = [
  {
    source: path.join(__dirname, '../temp/cart.js'),
    destination: path.join(__dirname, '../src/pages/cart.js')
  },
  {
    source: path.join(__dirname, '../temp/cart-basic.js'),
    destination: path.join(__dirname, '../src/pages/cart-basic.js')
  }
];

try {
  // Ensure temp directory exists
  if (!fs.existsSync(path.join(__dirname, '../temp'))) {
    fs.mkdirSync(path.join(__dirname, '../temp'), { recursive: true });
  }

  // For each file, check if source exists, if not create a placeholder
  // Then copy to destination regardless
  filesToEnsure.forEach(({ source, destination }) => {
    // Check if destination directory exists
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`Created directory: ${destDir}`);
    }
    
    // Create the source file if it doesn't exist
    if (!fs.existsSync(source)) {
      const content = `
        import { useRouter } from 'next/router';
        import { useEffect } from 'react';

        export default function PlaceholderPage() {
          const router = useRouter();
          
          useEffect(() => {
            router.replace('/');
          }, [router]);
          
          return <div>Redirecting...</div>;
        }
      `;
      fs.writeFileSync(source, content);
      console.log(`Created placeholder file: ${source}`);
    }
    
    // Copy to destination
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  });
  
  console.log('Pre-Vercel build script completed successfully!');
} catch (error) {
  console.error('Error in pre-Vercel build script:', error);
  process.exit(1);
}