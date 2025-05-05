import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Simple profile page that redirects to home
export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.push('/');
  }, [router]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '4rem', 
          height: '4rem', 
          borderRadius: '9999px', 
          border: '4px solid #2563eb', 
          borderTopColor: 'transparent', 
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem auto'
        }}></div>
        <p>Loading profile...</p>
        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}