# Quotation & Payment System - User Guide

## 📁 Files Created

```
quotation/
├── admin.html          - Admin panel to create quotations
├── index.html          - Customer quotation view
├── style.css           - Styles for both pages
├── admin-script.js     - Admin panel functionality
├── script.js           - Customer view functionality
└── README.md           - This file
```

## 🚀 How to Use

### For You (Admin):

1. **Access Admin Panel**
   - Open: `http://localhost/quotation/admin.html` (or your domain)
   - This page is NOT linked in your main navigation (hidden)

2. **Create a Quotation**
   - Fill in customer information
   - Add trip details
   - Add pricing items (click "+ Add Item" for multiple items)
   - Add service fee if applicable
   - Add any special notes
   - Click "Generate Quotation"

3. **Share with Customer**
   - Copy the generated link (e.g., `natours-travel.com/quotation/?id=QT-ABC123`)
   - Send it to customer via email or WhatsApp

### For Customer:

1. **View Quotation**
   - Customer clicks the link you sent
   - They see all trip details and pricing

2. **Make Payment**
   - Customer chooses payment method (GCash/Maya/Bank)
   - Makes payment using provided details
   - Uploads payment proof screenshot

3. **Confirmation**
   - System saves payment proof
   - Customer sees success message
   - You can review payment proofs in browser storage

## 💳 Payment Details (Update These)

Edit in `quotation/index.html` (lines 115-130):

```html
<div class="payment-method">
    <h3>GCash</h3>
    <p><strong>Number:</strong> 09369418559</p>
    <p><strong>Name:</strong> Natours Travel</p>
</div>
```

**Update:**
- GCash number and name
- Maya number and name
- Bank details (Bank name, Account name, Account number)

## 📊 Data Storage

Currently uses **localStorage** (browser storage):
- Quotations are saved locally
- Payment proofs are saved as Base64
- Data persists until browser cache is cleared

### To View Saved Data:

1. Open browser console (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. View:
   - `quotations` - All created quotations
   - `paymentProofs` - All uploaded payment proofs

## 🔄 Future Enhancements (Optional)

1. **Backend Integration**
   - Save quotations to a database
   - Upload payment proofs to cloud storage (Cloudinary, AWS S3)
   - Send email notifications when payment proof is uploaded

2. **Email Notifications**
   - Integrate EmailJS to notify you when customer uploads payment
   - Auto-send quotation PDF via email

3. **PDF Generation**
   - Generate downloadable PDF quotations
   - Professional invoice format

4. **Admin Dashboard**
   - View all quotations
   - Track payment status
   - Manage customers

## 🎨 Customization

### Colors
Edit in `quotation/style.css`:
```css
:root {
    --primary-color: #09713D;
    --primary-dark: #0a8547;
}
```

### Payment Methods
Edit in `quotation/index.html` (Payment Instructions section)

### Quotation Validity
Default: 7 days
Change in `quotation/admin-script.js` (line 157):
```javascript
defaultDate.setDate(defaultDate.getDate() + 7); // Change 7 to desired days
```

## 🔒 Security Notes

1. **Admin Panel Access**
   - Currently no password protection
   - Keep the URL private
   - Consider adding password protection later

2. **Data Privacy**
   - Payment proofs stored in browser
   - For production, use server-side storage
   - Comply with data protection regulations

## 📱 Mobile Responsive

- Fully responsive design
- Works on all devices
- Print-friendly quotation view

## 🆘 Support

If you need help:
1. Check browser console for errors (F12)
2. Verify localStorage has data
3. Ensure quotation ID in URL is correct
4. Check quotation validity date

---

**Created for Natours Travel**
Last Updated: November 26, 2025
