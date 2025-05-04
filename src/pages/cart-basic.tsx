import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This is a placeholder component that redirects to home page
export default function CartBasicPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting to homepage...</div>;
}