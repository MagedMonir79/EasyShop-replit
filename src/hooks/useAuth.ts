import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import { useUserStore } from '../store/userStore';

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, isLoading, setLoading } = useUserStore();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email || '',
            first_name: profile?.first_name || '',
            last_name: profile?.last_name || '',
            avatar_url: profile?.avatar_url || '',
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    const initializeUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          first_name: profile?.first_name || '',
          last_name: profile?.last_name || '',
          avatar_url: profile?.avatar_url || '',
        });
      }
      setLoading(false);
    };

    initializeUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      router.push('/');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        });
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const updateProfile = async (
    updates: { first_name?: string; last_name?: string; avatar_url?: string }
  ) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setUser({
        ...user,
        ...updates,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
};
