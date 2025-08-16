# Contact Page Setup Guide

## 📧 Email Configuration

The contact page includes a fully functional contact form with email notifications. Here's how to set it up:

### 1. Environment Variables

Create or update `.env.local` file in the root directory with your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=owner@bizflow.com
```

### 2. Gmail Setup (Recommended)

To use Gmail for sending emails:

1. **Enable 2-Step Verification:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification
   - Follow the setup process

2. **Generate App Password:**
   - In Security settings, find "App passwords"
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this as your `EMAIL_PASS` (not your regular Gmail password)

3. **Update Environment Variables:**
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=abcd-efgh-ijkl-mnop
   OWNER_EMAIL=business@yourcompany.com
   ```

### 3. Alternative Email Services

You can also use other email services by modifying the `api/contact.js` file:

#### SendGrid
```javascript
const transporter = nodemailer.createTransporter({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

#### Mailgun
```javascript
const transporter = nodemailer.createTransporter({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD,
  },
});
```

## 🚀 Features

### Contact Form
- **Real-time validation** - Form validates email format and required fields
- **Loading states** - Shows spinner while submitting
- **Success/Error messages** - User feedback for form submission
- **Form reset** - Automatically clears form after successful submission

### Email Notifications
- **Business notification** - Detailed email sent to business owner with contact details
- **User confirmation** - Professional confirmation email sent to the user
- **HTML formatted** - Beautiful, responsive email templates
- **Error handling** - Proper error messages if email fails

### Contact Information
- **Multiple contact methods** - Email, phone, address
- **Business hours** - Clear operating hours display
- **Social media links** - LinkedIn, Twitter, GitHub integration
- **FAQ section** - Common questions and answers

## 🎨 Design Features

- **Responsive design** - Works on all devices
- **Smooth animations** - Framer Motion animations throughout
- **Consistent styling** - Matches the rest of the BizFlow theme
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Loading states** - Visual feedback during form submission

## 📱 Mobile Optimization

The contact page is fully optimized for mobile devices:
- Responsive grid layouts
- Touch-friendly form elements
- Optimized typography
- Proper spacing and padding

## 🔒 Security Features

- **CORS protection** - Proper cross-origin request handling
- **Input validation** - Server-side validation for all form fields
- **Email format validation** - Prevents invalid email submissions
- **Rate limiting ready** - Can be easily extended with rate limiting

## 🛠 Customization

### Contact Information
Update contact details in the `contactInfo` array in `Contact.jsx`:

```javascript
const contactInfo = [
  {
    icon: FiMail,
    title: 'Email',
    details: 'your-email@company.com',
    link: 'mailto:your-email@company.com',
    description: 'Send us an email anytime!'
  },
  // ... more contact methods
];
```

### Business Hours
Modify the business hours section:

```javascript
<div className="space-y-2 text-sm">
  <div className="flex justify-between">
    <span className="text-gray-600">Monday - Friday</span>
    <span className="font-medium">9:00 AM - 6:00 PM</span>
  </div>
  // ... more hours
</div>
```

### Social Media Links
Update social media links in the `socialLinks` array:

```javascript
const socialLinks = [
  { icon: FiLinkedin, link: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn' },
  { icon: FiTwitter, link: 'https://twitter.com/yourcompany', label: 'Twitter' },
  { icon: FiGithub, link: 'https://github.com/yourcompany', label: 'GitHub' }
];
```

## 🚨 Troubleshooting

### Common Issues

1. **Email not sending:**
   - Check your environment variables
   - Verify Gmail app password is correct
   - Ensure 2-step verification is enabled

2. **CORS errors:**
   - Make sure the API endpoint is properly configured
   - Check that the fetch URL matches your deployment

3. **Form not submitting:**
   - Check browser console for JavaScript errors
   - Verify all required fields are filled
   - Ensure network connection is stable

### Testing

1. **Local testing:**
   - Fill out the contact form
   - Check browser console for any errors
   - Verify success/error messages appear

2. **Email testing:**
   - Submit a test form
   - Check both sender and recipient emails
   - Verify email formatting looks correct

## 📞 Support

If you need help setting up the contact functionality:
1. Check the troubleshooting section above
2. Review the environment variables setup
3. Test with a simple Gmail account first
4. Check the browser console for detailed error messages

The contact page is now fully functional and ready for production use!
