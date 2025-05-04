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