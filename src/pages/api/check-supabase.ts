import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

/**
 * API endpoint to check Supabase connection and auth settings
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Check if Supabase is configured properly
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return res.status(500).json({
        success: false,
        message: `Supabase auth error: ${error.message}`,
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Supabase connection successful',
      data: {
        sessionExists: !!data.session,
        configPresent: {
          url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
      },
    });
  } catch (error: any) {
    console.error('Error checking Supabase connection:', error);
    return res.status(500).json({
      success: false,
      message: `Unexpected error: ${error.message || 'Unknown error'}`,
    });
  }
}