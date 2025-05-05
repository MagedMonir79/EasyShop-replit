import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Simple placeholder profile page that redirects to home
export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading profile...</p>
      </div>
    </div>
  );
}