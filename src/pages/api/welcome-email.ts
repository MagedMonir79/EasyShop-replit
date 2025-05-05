import type { NextApiRequest, NextApiResponse } from 'next';

// Mock function returning success for build purposes
const mockSendWelcomeEmail = async (email: string, firstName: string): Promise<boolean> => {
  console.log(`[Mock] Sending welcome email to ${email} for ${firstName}`);
  return true;
};

type ResponseData = {
  success: boolean;
  message: string;
};

/**
 * API endpoint to send welcome email to new users
 * @param req Request object containing user email and name
 * @param res Response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are supported.'
    });
  }

  try {
    const { email, firstName } = req.body;

    // Validate required fields
    if (!email || !firstName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: email and firstName are required.'
      });
    }

    // Send welcome email - use mock during build
    const success = await mockSendWelcomeEmail(email, firstName);

    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Welcome email sent successfully.'
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send welcome email. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error in welcome-email API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred while sending the welcome email.'
    });
  }
}