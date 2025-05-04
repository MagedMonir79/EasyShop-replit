import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// This is a placeholder component that redirects to home page
export default function ProductPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting to homepage...</div>;
}

// Simplified getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  };
};
