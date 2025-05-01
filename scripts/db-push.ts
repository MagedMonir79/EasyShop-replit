import { exec } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

// Log environment variables for debugging (without exposing values)
console.log('Environment variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Defined' : 'Not defined');
console.log('PGDATABASE:', process.env.PGDATABASE ? 'Defined' : 'Not defined');
console.log('PGHOST:', process.env.PGHOST ? 'Defined' : 'Not defined');
console.log('PGPORT:', process.env.PGPORT ? 'Defined' : 'Not defined');

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not defined');
  process.exit(1);
}

// Set environment variables for the command
const env = { ...process.env };
const command = 'DATABASE_URL="' + process.env.DATABASE_URL + '" npx drizzle-kit push';

console.log('Starting database schema push...');
console.log(`Running command: ${command}`);

// Execute the command
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