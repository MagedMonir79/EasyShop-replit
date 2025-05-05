import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CartBasicPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting...</div>;
}