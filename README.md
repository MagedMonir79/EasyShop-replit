# EasyShop E-commerce Platform

A cutting-edge multilingual e-commerce platform that delivers intelligent, personalized shopping experiences with advanced performance and localization capabilities.

## Key Technologies

- Next.js for server-side rendering
- Tailwind CSS for responsive design
- Supabase for backend services
- TypeScript for type-safe development
- Drizzle ORM for efficient database management
- Comprehensive multilingual support with RTL design
- Advanced product discovery and recommendation systems
- Enhanced animations and UI interactions
- Standalone HTML pages with direct Supabase integration

## Standalone HTML Authentication Pages

The project includes standalone HTML pages with direct Supabase integration for authentication:

- `/public/html/login.html` - Login page with email/password and Google authentication
- `/public/html/signup.html` - Registration page with email/password and Google authentication
- `/public/html/index.html` - Home page with user session management
- `/public/html/cart.html` - Cart page (protected, requires authentication)

These pages use the Supabase JavaScript client directly without requiring a Next.js server.

## Supabase Integration

The project uses Supabase for:

1. **Authentication** - Email/password and OAuth (Google) authentication
2. **User Profiles** - Storing user profile information
3. **Session Management** - Managing user sessions across the application

## Deploying to GitHub

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com) and sign in
   - Click on the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "easyshop-ecommerce")
   - Choose visibility (public or private)
   - Click "Create repository"

2. **Push your code to GitHub**:
   ```bash
   # Initialize git repository if not already initialized
   git init

   # Add all files to git
   git add .

   # Commit your changes
   git commit -m "Initial commit"

   # Add your GitHub repository as remote
   git remote add origin https://github.com/yourusername/easyshop-ecommerce.git

   # Push to GitHub
   git push -u origin master # or 'main' depending on your default branch
   ```

## Hosting on Supabase

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com) and sign in
   - Click "New Project"
   - Enter your project details and select a region
   - Wait for your project to be created

2. **Set up Supabase Authentication**:
   - Go to Authentication → Settings
   - Configure Email Auth
   - Set up OAuth providers if needed (Google, etc.)
   - Set up redirect URLs for authentication

3. **Create Supabase Storage Buckets**:
   - Go to Storage and create buckets for product images and user avatars
   - Configure the appropriate access policies

4. **Create Database Tables**:
   - Use the SQL Editor or Table Editor to create the necessary tables
   - Alternatively, use the Drizzle migrations to push the schema to Supabase

5. **Update Environment Variables**:
   - Update your `.env.local` and `.env` files with your Supabase project URL and anon key

## Deployment Instructions for Vercel

1. **Fork or Push to a Git Repository**
   - Make sure your code is in a Git repository (GitHub, GitLab, etc.)

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Import Project" and select your repository

3. **Configure your Build**
   - Framework Preset: Next.js
   - Build Command: next build
   - Output Directory: .next

4. **Environment Variables**
   Add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL database connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Deploy**
   - Click "Deploy" and wait for the deployment to finish

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database Management

```bash
# Generate migration files
npm run db:generate

# Push schema changes to database
npm run db:push
```