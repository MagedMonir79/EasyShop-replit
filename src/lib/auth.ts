import { createClient } from '@supabase/supabase-js';
import { type Session, type User } from '@supabase/supabase-js';
import { Database } from '../utils/types';

// Ensure we're using environment variables correctly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

// Create a single instance of the Supabase client to use throughout the app
export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      storageKey: 'easyshop-auth-storage',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Define a user profile type that includes metadata
export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
};

// Helper function to map Supabase User to UserProfile
export function mapUserToProfile(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email || '',
    firstName: user.user_metadata?.first_name || user.email?.split('@')[0] || '',
    lastName: user.user_metadata?.last_name || '',
    avatarUrl: user.user_metadata?.avatar_url || null,
  };
}

// Login with email and password
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Login error:', error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Login with Google
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      }
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Google login error:', error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Register a new user
export async function signUp(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: window.location.origin + '/auth/callback',
      }
    });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Registration error:', error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Sign out the current user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Get the current session
export async function getSession(): Promise<{ session: Session | null, user: UserProfile | null }> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    const user = session?.user ? mapUserToProfile(session.user) : null;
    
    return { session, user };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, user: null };
  }
}