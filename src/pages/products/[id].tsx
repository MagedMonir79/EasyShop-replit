import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

// This is a placeholder component that redirects to home page
export default function ProductPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return <div>Redirecting to homepage...</div>;
}

// Use getStaticPaths to define all possible paths
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: 'blocking'
  };
};

// Use getStaticProps instead of getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // Ensure the page is regenerated at most once every 10 seconds
    revalidate: 10
  };
};
