import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
};

/**
 * API route to send a welcome email to newly registered users via SendGrid
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { email, firstName } = req.body;
    
    // Validate the required fields
    if (!email || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Email and firstName are required',
      });
    }

    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key is not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured',
      });
    }

    // Send email via SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@easyshop.com';
    
    const msg = {
      to: email,
      from: fromEmail,
      subject: 'Welcome to EasyShop!',
      text: `Hello ${firstName}, welcome to EasyShop! We're excited to have you on board.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">EasyShop</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #eaeaea; border-top: none;">
            <h2>Welcome, ${firstName}!</h2>
            <p>Thank you for creating an account with EasyShop. We're excited to have you join our community!</p>
            <p>With your new account, you can:</p>
            <ul>
              <li>Browse our extensive product catalog</li>
              <li>Save favorite items</li>
              <li>Track your orders</li>
              <li>Receive personalized recommendations</li>
            </ul>
            <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://easyshop.com'}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Start Shopping</a>
            </div>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <p>Happy shopping!</p>
            <p>The EasyShop Team</p>
          </div>
          <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>&copy; ${new Date().getFullYear()} EasyShop. All rights reserved.</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
        </div>
      `,
    };
    
    await sgMail.send(msg);
    
    return res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully',
    });
  } catch (error: any) {
    console.error('Error sending welcome email:', error);
    
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while sending welcome email',
    });
  }
}