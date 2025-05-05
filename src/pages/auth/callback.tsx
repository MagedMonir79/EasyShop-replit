import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';
import { useUserStore } from '../../store/userStore';
import { User } from '../../utils/types';

export default function AuthCallback() {
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    // Handle the OAuth callback by checking for the code in the URL
    const handleAuthCallback = async () => {
      try {
        // Get the session data from the current auth state
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting auth session:', error.message);
          router.push('/auth/login?error=callback-failed');
          return;
        }

        if (session?.user) {
          // We have a user, create the user object
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            first_name: session.user.user_metadata?.first_name || session.user.email?.split('@')[0] || '',
            last_name: session.user.user_metadata?.last_name || '',
            avatar_url: session.user.user_metadata?.avatar_url || '',
          };
          
          // Update the user state
          setUser(userData);
          
          // Redirect to home page or a specified redirect URL
          const redirectTo = localStorage.getItem('authRedirectTo') || '/';
          localStorage.removeItem('authRedirectTo'); // Clear the stored redirect
          router.push(redirectTo);
        } else {
          // No session found, redirect back to login
          router.push('/auth/login?error=no-session');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        router.push('/auth/login?error=unknown');
      }
    };

    // Run the auth callback handler
    handleAuthCallback();
  }, [router, setUser]);

  // Show a loading state while handling the callback
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Finalizing authentication...</p>
    </div>
  );
}