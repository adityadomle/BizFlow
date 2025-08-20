import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

// Create transporter for nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate unsubscribe token
export const generateUnsubscribeToken = (email) => {
  const secret = process.env.NEWSLETTER_SUBSCRIBE_SECRET;
  return crypto.createHmac("sha256", secret).update(email).digest("hex");
};

// Send subscription confirmation email
export const sendConfirmationEmail = async (email, unsubscribeLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BizFlow Team" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Welcome to BizFlow! 🚀 Empowering Your Business",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to BizFlow</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to BizFlow</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">
        Empowering businesses with elegant, modern design and seamless user experiences. <br />Where creativity meets technology.
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 30px 20px; text-align: center;">
      <h2 style="color: #1f2937; margin-bottom: 15px;">We’re excited to have you!</h2>
      <p style="color: #6b7280; line-height: 1.6; margin: 0;">
        Thank you for subscribing to BizFlow’s newsletter. You’ll now receive updates, insights, and resources to help your business grow and thrive.
      </p>
      <div style="margin: 30px 0;">
        <a href="https://yourbizflowapp.com/dashboard" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
          Explore BizFlow
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #6b7280; margin: 0 0 15px; font-size: 14px;">
        You’re receiving this email because you signed up for updates from BizFlow.
      </p>
      <div style="margin-bottom: 15px;">
        <a href="${unsubscribeLink}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
          Unsubscribe from our newsletter
        </a>
      </div>
      <div style="margin-bottom: 15px;">
        <a href="https://linkedin.com/company/bizflow" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">💼</span></a>
        <a href="https://twitter.com/bizflow" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">🐦</span></a>
        <a href="https://github.com/bizflow" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">💻</span></a>
      </div>
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
        &copy; ${new Date().getFullYear()} BizFlow. All rights reserved.<br />
        123 Innovation Hub, Suite 456, San Francisco, CA 94107
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

// Send newsletter to all subscribers
export const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  unsubscribeLinkGenerator
) => {
  const transporter = createTransporter();

  for (const subscriber of subscribers) {
    const unsubscribeLink = unsubscribeLinkGenerator(subscriber.email);

    const mailOptions = {
      from: `"BizFlow Team" <${process.env.EMAIL_USERNAME}>`,
      to: subscriber.email,
      subject: subject,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BizFlow Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); padding: 25px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">BizFlow Update</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0; font-size: 14px;">
        Empowering businesses with elegant, modern design and seamless user experiences.
      </p>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px 20px;">
      ${content}
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #6b7280; margin: 0 0 15px; font-size: 14px;">
        You’re receiving this email because you subscribed to BizFlow newsletter.
      </p>
      <a href="${unsubscribeLink}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
        Unsubscribe
      </a>
      <p style="color: #9ca3af; margin: 15px 0 0; font-size: 12px;">
        &copy; ${new Date().getFullYear()} BizFlow. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Failed to send to ${subscriber.email}:`, error);
    }
  }
};
