import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Simple 404 page with redirect
export default function NotFoundPage() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <p>Redirecting to homepage in 3 seconds...</p>
    </div>
  );
}