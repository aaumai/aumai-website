# EmailJS Setup Guide for AUM AI Healthcare Solutions

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission - AUM AI Healthcare Solutions

From: {{from_name}} <{{from_email}}>
Company: {{company}}
Service Interest: {{service_interest}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. **Copy the Template ID** (you'll need this)

### 4. Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

### 5. Create Environment File
1. Create a file named `.env` in your project root
2. Add these variables:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Test the Form
1. Start your development server: `npm start`
2. Fill out the contact form
3. Check your email for the message

## 📧 Email Template Variables

The form sends these variables to your email template:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{company}}` - Company name (if provided)
- `{{service_interest}}` - Selected service
- `{{message}}` - Message content
- `{{reply_to}}` - Reply-to email address

## 🔧 Troubleshooting

### Common Issues:
1. **"EmailJS configuration missing"** - Check your `.env` file
2. **Emails not sending** - Verify your email service setup
3. **Template not found** - Check your Template ID

### Free Tier Limits:
- 200 emails per month
- Perfect for small business websites

## 🚀 Production Deployment

When deploying to production:
1. Add the same environment variables to your hosting platform
2. For Netlify: Go to Site Settings → Environment Variables
3. For Vercel: Go to Project Settings → Environment Variables

## 📞 Support

If you need help with EmailJS setup, check their documentation:
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
