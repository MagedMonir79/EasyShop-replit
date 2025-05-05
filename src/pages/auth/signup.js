import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting from signup page...</div>;
}