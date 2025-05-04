import { useEffect } from 'react';
import { useRouter } from 'next/router';

// صفحة خطأ مبسطة مع إعادة توجيه تلقائي
export default function ServerErrorPage() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">500 - خطأ في الخادم</h1>
      <p className="mb-8">حدث خطأ في الخادم. نحن نعمل على إصلاحه.</p>
      <p>جارٍ إعادة التوجيه إلى الصفحة الرئيسية خلال 3 ثوانٍ...</p>
    </div>
  );
}