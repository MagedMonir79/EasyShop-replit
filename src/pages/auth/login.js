import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Simple placeholder to avoid build errors - will redirect to home page
export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage
    router.push('/');
  }, [router]);
  
  return null;
}