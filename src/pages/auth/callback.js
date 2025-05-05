import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CallbackPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting from auth callback...</div>;
}