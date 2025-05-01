import { exec } from 'child_process';
import dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config({ path: './.env.local' });

// التأكد من وجود متغير DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

// تسجيل متغير البيئة للأمر
const env = { ...process.env };
const command = 'npx drizzle-kit push';

console.log('Starting database schema push...');
console.log(`Running command: ${command}`);

// تنفيذ الأمر
const child = exec(command, { env });

child.stdout?.on('data', (data) => {
  console.log(data.toString());
});

child.stderr?.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('Database schema push completed successfully.');
  } else {
    console.error(`Database schema push failed with code ${code}.`);
    process.exit(1);
  }
});