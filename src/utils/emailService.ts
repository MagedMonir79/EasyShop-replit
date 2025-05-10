import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY is not set - email service will not function correctly');
}

/**
 * Send a welcome email to a newly registered user
 * @param to User's email address
 * @param firstName User's first name
 */
export const sendWelcomeEmail = async (to: string, firstName: string): Promise<boolean> => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not set - skipping welcome email to:', to);
      return false;
    }

    const senderEmail = process.env.SENDGRID_FROM_EMAIL || 'no-reply@easyshop.com';
    
    await sgMail.send({
      to,
      from: senderEmail,
      subject: 'Welcome to EasyShop!',
      text: `Hello ${firstName},\n\nWelcome to EasyShop! We're excited to have you on board.\n\nStart exploring our products and enjoy your shopping experience!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #4a6cf7;">EasyShop</h1>
          </div>
          <div style="padding: 20px;">
            <h2>Welcome to EasyShop, ${firstName}!</h2>
            <p>Thanks for joining our online shopping platform.</p>
            <p>With your new account, you can:</p>
            <ul>
              <li>Browse thousands of products</li>
              <li>Save items to your wishlist</li>
              <li>Track your orders easily</li>
              <li>Get exclusive deals and promotions</li>
            </ul>
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://easyshop.replit.app" style="background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Start Shopping Now</a>
            </div>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6c757d;">
            <p>This is an automated message from EasyShop. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });
    
    console.log('Welcome email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

/**
 * Send a password reset email
 * @param to User's email address
 * @param resetLink Password reset link
 */
export const sendPasswordResetEmail = async (to: string, resetLink: string): Promise<boolean> => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key not set - skipping password reset email to:', to);
      return false;
    }

    const senderEmail = process.env.SENDGRID_FROM_EMAIL || 'no-reply@easyshop.com';
    
    await sgMail.send({
      to,
      from: senderEmail,
      subject: 'Reset Your EasyShop Password',
      text: `You requested a password reset for your EasyShop account. Please click the following link to reset your password: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #4a6cf7;">EasyShop</h1>
          </div>
          <div style="padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password for your EasyShop account.</p>
            <p>Click the button below to reset your password. This link will expire in 30 minutes.</p>
            <div style="margin-top: 30px; text-align: center;">
              <a href="${resetLink}" style="background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
            </div>
            <p style="margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6c757d;">
            <p>This is an automated message from EasyShop. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });
    
    console.log('Password reset email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};