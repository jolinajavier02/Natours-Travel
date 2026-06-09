# Natours Travel & Tour Services

A Vite-powered static multi-page travel agency website for Natours Travel, deployed at `https://natours-travel.com`.

## Features

- Responsive landing page with travel service previews.
- Services, guidelines, booking, contact, about, legal, quotation, and admin pages.
- Static travel checklist data in `public/src/data/country_data.js`.
- Booking and contact flows powered by client-side JavaScript and EmailJS.
- SEO files for the live domain: `CNAME`, `robots.txt`, and `sitemap.xml`.

## Tech Stack

- Vite
- HTML5
- CSS3
- Vanilla JavaScript
- EmailJS
- Google Fonts and Font Awesome

## Run Locally

Install dependencies once, then run the Vite dev server:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Project Structure

```text
.
├── index.html              # Root redirect to /home/
├── package.json            # Vite scripts
├── vite.config.js          # Vite config
├── CNAME                   # Live custom domain source copy
├── robots.txt              # Search crawler rules source copy
├── sitemap.xml             # Live sitemap source copy
├── public/                 # Files served directly by Vite
│   ├── pages/              # Real page files
│   ├── home/               # Compatibility redirect to /pages/home/
│   ├── services/           # Compatibility redirect to /pages/services/
│   ├── guidelines/         # Compatibility redirect to /pages/guidelines/
│   ├── book-your-trip/     # Compatibility redirect to /pages/book-your-trip/
│   ├── contact/            # Compatibility redirect to /pages/contact/
│   ├── about-us/           # Compatibility redirect to /pages/about-us/
│   ├── legal/              # Compatibility redirect to /pages/legal/
│   ├── quotation/          # Compatibility redirect to /pages/quotation/
│   ├── admin/              # Compatibility redirect to /pages/admin/
│   ├── destinations/       # Compatibility redirect to /pages/destinations/
│   ├── src/                # Browser-served shared assets
│   │   ├── assets/images/
│   │   ├── data/
│   │   ├── scripts/
│   │   └── styles/
│   ├── CNAME
│   ├── robots.txt
│   └── sitemap.xml
└── src/                    # Vite entry source
    └── main.js
```

## Deployment Notes

Keep `CNAME`, `robots.txt`, `sitemap.xml`, and `.nojekyll` in `public/` so they are copied into `dist/` during build. Public route folders use redirect `index.html` files so clean URLs like `/home`, `/services`, and `/book-your-trip` continue to work.

## License

© 2025 Natours-Travel-And-Tour-Services. All rights reserved.
