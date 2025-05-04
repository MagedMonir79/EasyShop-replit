import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// سيتم إعادة توجيه المستخدم إلى الصفحة الرئيسية
const CartBasicPage: React.FC = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/');
  }, [router]);
  
  return <div>Redirecting...</div>;
};

export default CartBasicPage;