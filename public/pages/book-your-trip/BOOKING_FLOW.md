# New Booking Flow - Integration Guide

## 🔄 Updated Booking Process

The booking system has been redesigned to include payment confirmation before submission.

### New Customer Journey:

1. **Fill Booking Form** (`book-your-trip/index.html`)
   - Customer fills in all details
   - Clicks "Proceed to Payment →"

2. **Review & Confirm** (`book-your-trip/confirm.html`)
   - Customer sees all their information
   - Reviews pricing (₱5,000 service fee + ₱500 processing = ₱5,500 total)
   - Can click "← Back to Form" to edit
   - **Must upload payment proof** (required)
   - Clicks "Submit Booking & Payment Proof"

3. **Confirmation**
   - Customer receives auto-reply email
   - You receive admin notification with all details
   - Customer redirected to homepage

## 📧 Email Templates Needed

You need **2 EmailJS templates**:

### 1. Customer Auto-Reply (`template_v84hwer`)
**Already exists** - Your current template with:
```
Hello {{customer_name}},

Thank you for your booking! We will review and confirm within 24 hours.
```

### 2. Admin Notification (`template_3fo9q8j`)
**Already exists** - Sends you the full booking details

## 💰 Pricing Configuration

Currently set to:
- **Service Fee:** ₱5,000
- **Processing Fee:** ₱500
- **Total:** ₱5,500

To change pricing, edit `book-your-trip/confirm.html` (lines 265-275):

```html
<div class="pricing-row">
    <span>Service Fee</span>
    <span id="serviceFee">₱5,000.00</span> <!-- Change here -->
</div>
<div class="pricing-row">
    <span>Processing Fee</span>
    <span>₱500.00</span> <!-- Change here -->
</div>
```

## 🔧 Payment Methods

Update payment details in `book-your-trip/confirm.html` (lines 285-305):

```html
<div class="payment-method">
    <h3>GCash</h3>
    <p><strong>Number:</strong> 09369418559</p>
    <p><strong>Name:</strong> Natours Travel</p>
</div>
```

## 📝 How It Works Technically

1. **Form Submission:**
   - `script.js` collects all form data
   - Saves to `sessionStorage` as JSON
   - Redirects to `confirm.html`

2. **Confirmation Page:**
   - `confirm-script.js` reads from `sessionStorage`
   - Displays all information
   - Handles file upload
   - Sends emails via EmailJS
   - Clears `sessionStorage`
   - Redirects to home

## ✅ Testing Checklist

- [ ] Fill out booking form
- [ ] Click "Proceed to Payment"
- [ ] Verify all details display correctly
- [ ] Click "Back to Form" - should return with data
- [ ] Upload payment proof image
- [ ] Submit button should be disabled until file uploaded
- [ ] After submit, check:
  - [ ] Customer receives confirmation email
  - [ ] You receive admin notification email
  - [ ] Redirects to homepage

## 🚨 Important Notes

1. **Payment Proof Storage:**
   - Currently stored as Base64 in email
   - For production, consider cloud storage (Cloudinary, AWS S3)

2. **Pricing:**
   - Current pricing is a deposit/processing fee
   - Final quotation sent after verification

3. **Back Button:**
   - Uses browser history
   - Form data preserved in sessionStorage

4. **Mobile Responsive:**
   - Fully responsive design
   - Works on all devices

## 🔐 Security Considerations

- Payment proof sent via email (not ideal for production)
- Consider implementing:
  - File upload to cloud storage
  - Secure payment gateway integration
  - Database for booking records

---

**Created:** November 26, 2025
**Last Updated:** November 26, 2025
