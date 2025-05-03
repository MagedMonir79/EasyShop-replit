import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

const FROM_EMAIL = 'noreply@easyshop.com';
const FROM_NAME = 'EasyShop';

/**
 * Send a welcome email to a newly registered user
 * @param to User's email address
 * @param firstName User's first name
 */
export const sendWelcomeEmail = async (to: string, firstName: string): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('Welcome email not sent - SENDGRID_API_KEY missing');
    return false;
  }

  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: `Welcome to EasyShop, ${firstName}!`,
      text: `
Hello ${firstName},

Welcome to EasyShop! We're excited to have you join our community.

With your new account, you can:
- Browse our extensive catalog of products
- Save your favorite items
- Track your orders
- Get personalized recommendations

If you have any questions or feedback, please don't hesitate to contact our support team.

Happy shopping!

The EasyShop Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif;
      color: #333;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #eaeaea;
      border-radius: 5px;
    }
    .header {
      background-color: #3B82F6;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eaeaea;
      color: #777;
      font-size: 0.8em;
    }
    .button {
      display: inline-block;
      background-color: #3B82F6;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 20px 0;
    }
    ul {
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to EasyShop!</h1>
    </div>
    <div class="content">
      <p>Hello ${firstName},</p>
      
      <p>Welcome to EasyShop! We're excited to have you join our community.</p>
      
      <p>With your new account, you can:</p>
      <ul>
        <li>Browse our extensive catalog of products</li>
        <li>Save your favorite items</li>
        <li>Track your orders</li>
        <li>Get personalized recommendations</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://easyshop.com'}" class="button">Start Shopping Now</a>
      </div>
      
      <p>If you have any questions or feedback, please don't hesitate to contact our support team.</p>
      
      <p>Happy shopping!</p>
      
      <p>The EasyShop Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EasyShop. All rights reserved.</p>
      <p>This email was sent to ${to}</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await sgMail.send(msg);
    console.log(`Welcome email sent to ${to}`);
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
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('Password reset email not sent - SENDGRID_API_KEY missing');
    return false;
  }

  try {
    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: 'Reset Your EasyShop Password',
      text: `
Hello,

We received a request to reset your EasyShop password. If you didn't make this request, you can safely ignore this email.

To reset your password, click the link below:
${resetLink}

This link will expire in 1 hour.

If you have any issues, please contact our support team.

The EasyShop Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif;
      color: #333;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #eaeaea;
      border-radius: 5px;
    }
    .header {
      background-color: #3B82F6;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eaeaea;
      color: #777;
      font-size: 0.8em;
    }
    .button {
      display: inline-block;
      background-color: #3B82F6;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      
      <p>We received a request to reset your EasyShop password. If you didn't make this request, you can safely ignore this email.</p>
      
      <div style="text-align: center;">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      
      <p>Or copy and paste this link into your browser:</p>
      <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">${resetLink}</p>
      
      <p>This link will expire in 1 hour.</p>
      
      <p>If you have any issues, please contact our support team.</p>
      
      <p>The EasyShop Team</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EasyShop. All rights reserved.</p>
      <p>This email was sent to ${to}</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await sgMail.send(msg);
    console.log(`Password reset email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};