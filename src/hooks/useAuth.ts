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
    // Check login status on startup using Supabase session
    const checkUserSession = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Get the current session from Supabase
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error getting session:', error.message);
            setUser(null);
            return;
          }
          
          if (session?.user) {
            // We have a logged-in user
            console.log('Found authenticated session for user:', session.user.id);
            
            // Create user object from Supabase user data
            const userData: User = {
              id: session.user.id,
              email: session.user.email || '',
              first_name: session.user.user_metadata?.first_name || session.user.email?.split('@')[0] || '',
              last_name: session.user.user_metadata?.last_name || '',
              avatar_url: session.user.user_metadata?.avatar_url || '',
            };
            
            // Update user state
            setUser(userData);
          } else {
            // No active session
            console.log('No active session found');
            setUser(null);
          }
        }
      } catch (error) {
        // In case of an error, assume the user is not logged in
        console.error('Error retrieving user session:', error);
        setUser(null);
      } finally {
        // Finally, set loading state to false
        setLoading(false);
      }
    };

    // Set up auth state listener for real-time updates
    const setupAuthListener = () => {
      if (typeof window !== 'undefined') {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session?.user) {
              // Update user state when auth state changes
              const userData: User = {
                id: session.user.id,
                email: session.user.email || '',
                first_name: session.user.user_metadata?.first_name || session.user.email?.split('@')[0] || '',
                last_name: session.user.user_metadata?.last_name || '',
                avatar_url: session.user.user_metadata?.avatar_url || '',
              };
              
              setUser(userData);
            } else {
              setUser(null);
            }
            
            setLoading(false);
          }
        );
        
        // Cleanup function to remove the listener
        return () => {
          subscription.unsubscribe();
        };
      }
      
      return undefined;
    };

    const authCleanup = setupAuthListener();
    
    // Call the function immediately to check session
    checkUserSession();
    
    return authCleanup;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Use Supabase for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // Get localized error message based on error code
        let errorMessage: string;
        
        switch (error.message) {
          case 'Invalid login credentials':
            errorMessage = getLocalizedMessage(
              'Invalid credentials',
              'بيانات الاعتماد غير صحيحة'
            );
            break;
          case 'Email not confirmed':
            errorMessage = getLocalizedMessage(
              'Please confirm your email before logging in',
              'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول'
            );
            break;
          default:
            errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }
      
      // Handle successful login
      if (data?.user) {
        console.log('User logged in via Supabase:', data.user);
        
        // Format user data from Supabase user object
        const loggedInUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          first_name: data.user.user_metadata?.first_name || data.user.email?.split('@')[0] || '',
          last_name: data.user.user_metadata?.last_name || '',
          avatar_url: data.user.user_metadata?.avatar_url || '',
        };
        
        // Update state with the logged-in user
        setUser(loggedInUser);
        
        // Redirect to home page
        router.push('/');
        return { success: true };
      } else {
        // This shouldn't happen if there's no error, but handle it just in case
        throw new Error(getLocalizedMessage(
          'Login successful but user data is missing',
          'تم تسجيل الدخول بنجاح ولكن بيانات المستخدم مفقودة'
        ));
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Use Supabase for user signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Store the user's first and last name as metadata
          data: {
            first_name: firstName,
            last_name: lastName
          },
          // Use the callback route for email confirmation
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Check if the sign-up was successful
      if (data?.user) {
        console.log('User created in Supabase:', data.user);
        
        // Create a User object from the Supabase data
        const newUser: User = {
          id: data.user.id,
          email: data.user.email || email,
          first_name: firstName,
          last_name: lastName,
          avatar_url: data.user.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/lego/1.jpg',
        };
        
        // Update local state with the new user
        setUser(newUser);
        
        // Send welcome email
        try {
          // Only run on client-side
          if (typeof window !== 'undefined') {
            const response = await fetch('/api/welcome-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: newUser.email,
                firstName: newUser.first_name
              }),
            });
            
            const emailResult = await response.json();
            if (!emailResult.success) {
              console.warn('Welcome email could not be sent:', emailResult.message);
            } else {
              console.log('Welcome email sent successfully');
            }
          }
        } catch (emailError) {
          // Don't fail registration if email sending fails
          console.error('Error sending welcome email:', emailError);
        }
        
        // Don't redirect here - let the auth callback handle it
        // This fixes the issue where user appears in the UI but wasn't created in Supabase
        
        return { success: true };
      } else {
        // Get localized error message
        const errorMessage = getLocalizedMessage(
          'User creation failed',
          'فشل إنشاء المستخدم'
        );
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.message || 'An error occurred during signup' 
      };
    }
  };

  const signOut = async () => {
    try {
      // Sign out using Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear user state
      setUser(null);
      
      // Redirect to home page
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

      // Update user metadata in Supabase
      const { data, error } = await supabase.auth.updateUser({
        data: {
          first_name: updates.first_name || user.first_name,
          last_name: updates.last_name || user.last_name,
          avatar_url: updates.avatar_url || user.avatar_url
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Create updated user object
        const updatedUser = {
          ...user,
          ...updates,
        };
        
        // Update local state
        setUser(updatedUser);
        
        return { success: true };
      } else {
        throw new Error(getLocalizedMessage(
          'Profile update successful but data is missing',
          'تم تحديث الملف الشخصي بنجاح ولكن البيانات مفقودة'
        ));
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
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
      // Get localized error message
      let customError = getLocalizedMessage(
        'Error during Google sign-in',
        'حدث خطأ أثناء تسجيل الدخول باستخدام Google'
      );
      
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
