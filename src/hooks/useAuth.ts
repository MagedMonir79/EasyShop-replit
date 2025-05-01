import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '../store/userStore';
import { User } from '../utils/types';
import { supabase } from '../utils/supabase';

// مستخدم وهمي للتطوير فقط
const mockUser: User = {
  id: 'user-123',
  email: 'user@example.com',
  first_name: 'محمد',
  last_name: 'أحمد',
  avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, isLoading, setLoading } = useUserStore();
  
  // Helper function to get language-aware messages
  const getLocalizedMessage = (enMessage: string, arMessage: string) => {
    if (typeof window === 'undefined') {
      return enMessage; // Default to English for SSR
    }
    
    try {
      const storedLanguage = localStorage.getItem('language-storage');
      if (storedLanguage) {
        const languageState = JSON.parse(storedLanguage);
        if (languageState.state?.language === 'ar') {
          return arMessage;
        }
      }
    } catch (e) {
      console.error('Error getting language preference:', e);
    }
    
    return enMessage; // Default to English
  };

  useEffect(() => {
    // Check login status on startup, with SSR safety
    const checkUserSession = async () => {
      try {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
          // Try to retrieve user info from localStorage
          const storedUser = localStorage.getItem('user');
          
          if (storedUser) {
            try {
              // If we found user info in localStorage, restore it
              const parsedUser = JSON.parse(storedUser);
              // Validate user object has required fields
              if (parsedUser?.id && parsedUser?.email) {
                setUser(parsedUser);
              } else {
                console.warn('Invalid user data found in localStorage');
                localStorage.removeItem('user');
                setUser(null);
              }
            } catch (parseError) {
              console.error('Error parsing stored user data:', parseError);
              localStorage.removeItem('user');
              setUser(null);
            }
          } else {
            // If we didn't find user info, set state to not logged in
            setUser(null);
          }
        }
      } catch (error) {
        // In case of an error, assume the user is not logged in
        console.error('Error retrieving user session:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
        }
        setUser(null);
      } finally {
        // Finally, set loading state to false
        setLoading(false);
      }
    };

    // Call the function with a short delay to ensure the page is loaded
    // Only set a timeout on the client side
    if (typeof window !== 'undefined') {
      const timer = setTimeout(checkUserSession, 300);
      return () => clearTimeout(timer);
    } else {
      // For server-side rendering, just set loading to false
      setLoading(false);
      return undefined;
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock delay to simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple check of credentials (for development only)
      if (email === 'user@example.com' && password === 'password') {
        if (typeof window !== 'undefined') {
          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(mockUser));
        }
        setUser(mockUser);
        router.push('/');
        return { success: true };
      }
      
      // Get localized error message
      const errorMessage = getLocalizedMessage(
        'Invalid credentials', 
        'بيانات الاعتماد غير صحيحة'
      );
      throw new Error(errorMessage);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Mock delay to simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple check of email (for development only)
      if (email === 'user@example.com') {
        // Get localized error message
        const errorMessage = getLocalizedMessage(
          'Email is already in use',
          'البريد الإلكتروني مستخدم بالفعل'
        );
        throw new Error(errorMessage);
      }
      
      // Create a new mock user with stable ID (using email hash)
      const userIdHash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString();
      const newUser: User = {
        id: `user-${userIdHash}`,
        email,
        first_name: firstName,
        last_name: lastName,
        avatar_url: 'https://randomuser.me/api/portraits/lego/1.jpg',
      };
      
      // Save user data to localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      setUser(newUser);
      router.push('/');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      // Mock delay to simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove user data from localStorage on client side only
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      setUser(null);
      router.push('/');
    } catch (error: any) {
      // Get localized error message
      const errorMessage = getLocalizedMessage(
        'Error during sign out',
        'خطأ في تسجيل الخروج'
      );
      console.error(`${errorMessage}:`, error.message);
    }
  };

  const updateProfile = async (
    updates: { first_name?: string; last_name?: string; avatar_url?: string }
  ) => {
    try {
      // Check if user is authenticated
      if (!user) {
        // Get localized error message
        const errorMessage = getLocalizedMessage(
          'User is not authenticated',
          'المستخدم غير مصادق'
        );
        throw new Error(errorMessage);
      }

      // Mock delay to simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = {
        ...user,
        ...updates,
      };
      
      // Update user data in localStorage on client side only
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      setUser(updatedUser);

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Sign in with Google account
  const signInWithGoogle = async () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return { success: false, error: 'Google sign-in is not available during server-side rendering' };
      }
      
      // Use Supabase for Google authentication
      // Note: This function redirects the user to the Google sign-in page
      // The user will be redirected back to the app after successful sign-in
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        throw error;
      }
      
      // This point won't normally be reached as the browser 
      // will be redirected before this code executes
      return { 
        success: true,
      };
    } catch (error: any) {
      // Get appropriate error message based on language
      let customError = 'Error during Google sign-in';
      
      if (typeof window !== 'undefined') {
        const storedLanguage = localStorage.getItem('language-storage');
        if (storedLanguage) {
          try {
            const languageState = JSON.parse(storedLanguage);
            if (languageState.state?.language === 'ar') {
              customError = 'حدث خطأ أثناء تسجيل الدخول باستخدام Google';
            }
          } catch (e) {
            // Use default English error if parsing fails
          }
        }
      }
      
      if (error.message) {
        customError = error.message;
      }
      
      return { 
        success: false, 
        error: customError 
      };
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    signInWithGoogle
  };
};
