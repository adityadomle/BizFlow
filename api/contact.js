// Vercel serverless function for handling contact form submissions
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      message: 'All fields are required',
      success: false 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Please provide a valid email address',
      success: false 
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email to business owner
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Note:</strong> Please respond to this inquiry as soon as possible. 
              The user's email is: <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This email was sent from the BizFlow contact form on ${new Date().toLocaleDateString()}.
          </p>
        </div>
      `,
    };

    // Confirmation email to user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting BizFlow - We've received your message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>

          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to us! We've successfully received your message and our team will review it promptly.
            </p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h3 style="color: #047857; margin-top: 0;">What happens next?</h3>
              <ul style="color: #065f46; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll respond directly to this email address: ${email}</li>
                <li>For urgent matters, feel free to call us at +1 (555) 123-4567</li>
              </ul>
            </div>

            <p style="color: #6b7280; line-height: 1.6; margin-top: 20px;">
              If you have any additional questions in the meantime, don't hesitate to reach out!
            </p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #374151;">The BizFlow Team</strong>
            </p>
            <div style="margin-top: 15px;">
              <a href="https://bizflow.com" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
              <span style="color: #d1d5db;">|</span>
              <a href="mailto:hello@bizflow.com" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Email</a>
              <span style="color: #d1d5db;">|</span>
              <a href="tel:+15551234567" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Phone</a>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToUser)
    ]);

    res.status(200).json({ 
      message: 'Message sent successfully! We\'ll get back to you soon.',
      success: true 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      success: false 
    });
  }
}
