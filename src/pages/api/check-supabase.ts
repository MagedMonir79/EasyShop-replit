// src/pages/api/check-supabase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseBrowser';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    // Check if Supabase credentials are present
    const urlExists = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const keyExists = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!urlExists || !keyExists) {
      return res.status(500).json({
        success: false,
        message: 'Missing Supabase environment variables.',
        data: {
          url: urlExists,
          anonKey: keyExists,
        },
      });
    }

    // Check if Supabase is responsive
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
          url: urlExists,
          anonKey: keyExists,
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
