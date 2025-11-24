# Email Form Setup Guide

## Current Setup
The booking form is currently configured to send inquiries via **WhatsApp** to 09369418559.

When users click "Submit Inquiry", the form data is automatically formatted and sent to your WhatsApp number.

## To Enable Email Submissions (Optional)

If you want to receive form submissions via email at natourstravel.ph@gmail.com instead of (or in addition to) WhatsApp, follow these steps:

### Option 1: Formspree (Recommended - Free & Easy)

1. Go to https://formspree.io/
2. Sign up for a free account using natourstravel.ph@gmail.com
3. Create a new form
4. Copy your form endpoint (it will look like: `https://formspree.io/f/xyzabc123`)
5. Open `book-your-trip/index.html`
6. Find line 200 and replace `YOUR_FORM_ID` with your actual Formspree ID:
   ```html
   <form class="booking-form" id="bookingForm" action="https://formspree.io/f/YOUR_ACTUAL_ID" method="POST">
   ```

**Benefits:**
- Free for up to 50 submissions/month
- No coding required
- Spam protection included
- Email notifications to natourstravel.ph@gmail.com

### Option 2: EmailJS (Alternative)

1. Go to https://www.emailjs.com/
2. Sign up and connect your Gmail account
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add EmailJS script to your HTML and update the form handler

### Option 3: Backend Server (Most Reliable)

For production use, consider setting up a backend server (Node.js, PHP, etc.) to handle form submissions securely.

## Current WhatsApp Integration

The form currently works as follows:
- User fills out the booking form
- Clicks "Submit Inquiry"
- Form data is formatted into a WhatsApp message
- WhatsApp opens with the pre-filled message
- User clicks "Send" in WhatsApp to complete the inquiry

This ensures you receive all booking requests directly on WhatsApp: 09369418559

## Testing

1. Fill out the booking form
2. Click "Submit Inquiry"
3. WhatsApp should open with the formatted message
4. Click "Send" in WhatsApp to test

## Notes

- The WhatsApp integration works on both mobile and desktop
- Users must have WhatsApp installed or use WhatsApp Web
- All form data is included in the WhatsApp message
- No data is stored on the website (privacy-friendly)
