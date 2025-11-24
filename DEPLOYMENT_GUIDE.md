# Namecheap Deployment Guide for natours-travel.com

## 🎉 Congratulations on Your Domain Purchase!

Your domain: **natours-travel.com**

---

## 📋 Deployment Options

You have several options to host your website with Namecheap:

### Option 1: GitHub Pages (FREE - Recommended for Start)

**Pros**: Free, easy to set up, automatic HTTPS, good performance
**Cons**: Static sites only (which is perfect for your site!)

#### Steps:

1. **Enable GitHub Pages on your repository**:
   - Go to your GitHub repository: https://github.com/jolinajavier02/Natours-Travel.Ph
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be available at: `https://jolinajavier02.github.io/Natours-Travel.Ph/`

2. **Connect Custom Domain (natours-travel.com)**:
   
   **In GitHub:**
   - Go to Settings → Pages
   - Under "Custom domain", enter: `natours-travel.com`
   - Click **Save**
   - Check "Enforce HTTPS" (wait a few minutes for it to be available)

   **In Namecheap:**
   - Log in to Namecheap
   - Go to **Domain List** → Click **Manage** next to natours-travel.com
   - Go to **Advanced DNS** tab
   - Add these DNS records:

   ```
   Type: A Record
   Host: @
   Value: 185.199.108.153
   TTL: Automatic
   
   Type: A Record
   Host: @
   Value: 185.199.109.153
   TTL: Automatic
   
   Type: A Record
   Host: @
   Value: 185.199.110.153
   TTL: Automatic
   
   Type: A Record
   Host: @
   Value: 185.199.111.153
   TTL: Automatic
   
   Type: CNAME Record
   Host: www
   Value: jolinajavier02.github.io
   TTL: Automatic
   ```

3. **Wait for DNS propagation** (can take 24-48 hours, usually faster)

4. **Create CNAME file in your repository**:
   - Create a file named `CNAME` (no extension) in your root directory
   - Content: `natours-travel.com`

---

### Option 2: Namecheap Hosting (Paid)

**Pros**: Full control, email hosting included, 24/7 support
**Cons**: Monthly/yearly cost

#### Steps:

1. **Purchase Hosting Plan**:
   - Go to Namecheap → Hosting → Shared Hosting
   - Choose a plan (Stellar is good for starting)
   - Link it to your domain natours-travel.com

2. **Upload Your Files**:
   - Access cPanel from Namecheap
   - Go to File Manager
   - Navigate to `public_html`
   - Upload all your website files
   - Make sure `index.html` is in the correct directory

3. **Configure .htaccess for Clean URLs**:
   - Create `.htaccess` file in `public_html`
   - Add the rewrite rules (see below)

---

### Option 3: Netlify (FREE - Best for Performance)

**Pros**: Free, automatic HTTPS, CDN, continuous deployment, best performance
**Cons**: None for your use case!

#### Steps:

1. **Sign up at Netlify**: https://www.netlify.com/

2. **Connect GitHub Repository**:
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository: Natours-Travel.Ph
   - Build settings: Leave empty (static site)
   - Click "Deploy site"

3. **Add Custom Domain**:
   - In Netlify, go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter: `natours-travel.com`
   - Netlify will provide DNS records

4. **Update Namecheap DNS**:
   - Go to Namecheap → Domain List → Manage
   - Advanced DNS
   - Add Netlify's DNS records (they'll provide these)

5. **Enable HTTPS**:
   - Netlify automatically provides free SSL certificate
   - Just click "Verify DNS configuration" and "Provision certificate"

---

## 🔧 .htaccess Configuration (For Apache/Namecheap Hosting)

Create `.htaccess` file with this content:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Redirect .html URLs to clean URLs
RewriteCond %{THE_REQUEST} ^GET\ /(.*)\.html\ HTTP
RewriteRule (.*)\.html$ /$1 [R=301,L]

# Handle directory index
DirectoryIndex index.html

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 📧 Setting Up Email (Optional)

### Using Namecheap Email:

1. Go to Namecheap Dashboard
2. Products → Email → Add Email
3. Choose a plan (Private Email is good)
4. Create email addresses like:
   - info@natours-travel.com
   - bookings@natours-travel.com
   - support@natours-travel.com

### Free Alternative - Gmail:

1. Use Google Workspace (paid but professional)
2. Or use email forwarding in Namecheap (free):
   - Advanced DNS → Email Forwarding
   - Forward info@natours-travel.com to natourstravel.ph@gmail.com

---

## ✅ Post-Deployment Checklist

After your site is live:

- [ ] Test all navigation links
- [ ] Verify clean URLs work (no .html)
- [ ] Check mobile responsiveness
- [ ] Test contact forms
- [ ] Verify HTTPS is working (green padlock)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Test page load speed
- [ ] Check all images load correctly
- [ ] Verify social media links work

---

## 🚀 Recommended: Use Netlify

**Why Netlify is the best choice for you:**

1. ✅ **FREE** - No hosting costs
2. ✅ **Automatic HTTPS** - Free SSL certificate
3. ✅ **CDN** - Fast loading worldwide
4. ✅ **Continuous Deployment** - Push to GitHub, auto-updates
5. ✅ **Clean URLs** - Works automatically
6. ✅ **Form Handling** - Built-in form submissions
7. ✅ **Easy Setup** - 5 minutes to deploy

---

## 📞 Need Help?

If you need assistance with:
- Setting up DNS records
- Deploying to any platform
- Configuring email
- SSL certificate issues

Just let me know! I'm here to help you get natours-travel.com live! 🎉

---

## 🎯 Quick Start (Recommended Path)

1. **Deploy to Netlify** (5 minutes)
2. **Configure Namecheap DNS** to point to Netlify
3. **Wait for DNS propagation** (few hours)
4. **Submit to Google Search Console**
5. **Add Google Analytics**
6. **You're live!** 🚀
