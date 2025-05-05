import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting...</div>;
}