import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting from login page...</div>;
}