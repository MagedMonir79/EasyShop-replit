import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/basic');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading EasyShop...</h1>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default IndexPage;